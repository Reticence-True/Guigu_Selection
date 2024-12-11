<!-- eslint-disable vue/valid-attribute-name -->
<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0" :data="skuArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="名称"
          show-overflow-tooltip
          width="150px"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          show-overflow-tooltip
          width="150px"
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="图片" width="150px">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          width="150px"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格"
          width="150px"
          prop="price"
        ></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              :icon="row.isSale ? 'Top' : 'Bottom'"
              @click="updateSale(row)"
            ></el-button>
            <!-- TODO 先隐藏，完成整个项目后在完善 -->
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateSku"
              v-if="false"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="InfoFilled"
              @click="viewSku(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定要删除商品 '${row.skuName}'？`"
              style="width: 200px"
              @confirm="deleteSku(row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="totalSku"
        @change="getHasSku"
      />
      <!-- 抽屉组件，展示商品详情 -->
      <el-drawer v-model="drawer" direction="rtl">
        <template #header>
          <h4>查看商品详情</h4>
        </template>
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.attrId">
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.saleAttrId"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img :src="item.imgUrl" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  reqCancelSale,
  reqOnSale,
  reqRemoveSku,
  reqSkuInfo,
  reqSkuList,
} from '@/api/product/sku'
import type { SkuInfoData, SkuResponseData } from '@/api/product/sku/type'
import type { SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
// 分页器
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
// 所有sku数据
let skuArr = ref<SkuData[]>([])
let totalSku = ref<number>(0)
// 抽屉
let drawer = ref<boolean>(false) // 显示与隐藏
let skuInfo = ref<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuDefaultImg: '',
})

// 获取所有sku商品
const getHasSku = async (pager = 1) => {
  // 默认页码
  pageNo.value = pager
  let res: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (res.code === 200) {
    totalSku.value = res.data.total
    skuArr.value = res.data.records
  }
}

// 商品上架/下架
const updateSale = async (row: SkuData) => {
  // 正在销售
  if (row.isSale == 1) {
    // 更新为下架
    await reqCancelSale(row.id as number)
    ElMessage({
      type: 'success',
      message: '下架成功',
    })
  }
  // 下架了
  else {
    // 更新为上架
    await reqOnSale(row.id as number)
    ElMessage({
      type: 'success',
      message: '上架成功',
    })
  }
  // 获取当前sku
  getHasSku(pageNo.value)
}

// 更新sku
const updateSku = () => {
  ElMessage({
    type: 'success',
    message: '敬请期待',
  })
}

// 显示商品详情
const viewSku = async (row: SkuData) => {
  // 抽屉展示
  drawer.value = true
  // 获取图片
  let res: SkuInfoData = await reqSkuInfo(row.id as number)
  if (res.code === 200) {
    skuInfo.value = res.data
  }
}

// 删除SKU
const deleteSku = async (row: SkuData) => {
  let res = await reqRemoveSku(row.id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

onMounted(() => {
  getHasSku()
})
</script>

<style>
.el-row {
  margin: 10px 0;
}

.el-tag {
  margin: 5px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
