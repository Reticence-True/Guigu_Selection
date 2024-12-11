<!-- eslint-disable vue/valid-attribute-name -->
<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="View"
                title="查看SKU列表"
                @click="findSku(row)"
              ></el-button>
              <el-popconfirm
                :title="`确定删除 '${row.spuName}'？`"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          background
          layout="prev, pager, next, jumper, ->, total, sizes"
          :total="total"
          @change="getHasSpu"
        />
      </div>
      <!-- 添加/修改spu -->
      <SpuForm
        ref="spuForm"
        v-show="scene === 1"
        @changeScene="changeScene"
      ></SpuForm>
      <!-- 添加/修改sku -->
      <SkuForm
        ref="skuForm"
        v-show="scene === 2"
        @changeScene="changeScene"
      ></SkuForm>
      <!-- Dialog展示sku数据 -->
      <el-dialog title="SKU列表" v-model="show">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/api/product/spu'
import type {
  HasSpuResponseData,
  Records,
  SkuData,
  SkuInfoData,
  SpuData,
} from '@/api/product/spu/type'
// 子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { ElMessage } from 'element-plus'

// 分类仓库
let categoryStore = useCategoryStore()
// 场景
let scene = ref<number>(0) // 0--spu列表；1--添加/修改spu；2--添加/修改sku
// 分页器
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
// 所有spu数据
let records = ref<Records>([])
// 存储已有spu个数
let total = ref<number>(0)
// spuForm实例
let spuForm = ref()
// sku实例
let skuForm = ref()
// 存储sku数据
let skuArr = ref<SkuData[]>([])
let show = ref<boolean>(false)

// 监听三级分类id变化
watch(
  () => categoryStore.c3Id,
  (nVal) => {
    if (nVal) {
      getHasSpu()
    } else {
      // 清空数据
      records.value.length = 0
    }
  },
)

// 获取某个三级分类所有spu数据
const getHasSpu = async () => {
  let res: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (res.code === 200) {
    records.value = res.data.records
    total.value = res.data.total
  }
}

// 添加SPU
const addSpu = () => {
  scene.value = 1
  spuForm.value.initAddSpu(categoryStore.c3Id)
}

// 更新spu
const updateSpu = (row: SpuData) => {
  scene.value = 1
  // 调用子组件方法，传入spuid等数据，其余在子组件完成
  spuForm.value.initSpuData(row)
}

// 删除SPU
const deleteSpu = async (row: SpuData) => {
  let res: any = await reqRemoveSpu(row.id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // 获取所有spu
    getHasSpu()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 子组件的切换场景方法
const changeScene = (obj: any) => {
  if (obj.params === 'add') {
    pageNo.value = 1
  }
  // 切换场景
  scene.value = 0
  // 获取全部spu
  getHasSpu()
}

// 添加sku事件
const addSku = (row: SpuData) => {
  // 切换sku场景
  scene.value = 2
  // 初始化
  skuForm.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

// 查看sku
const findSku = async (row: SpuData) => {
  let res: SkuInfoData = await reqSkuList(row.id as number)
  if (res.code === 200) {
    skuArr.value = res.data
    // 对话框显示
    show.value = true
  }
}

// 生命周期
// 销毁
onBeforeUnmount(() => {
  // 清空仓库数据
  categoryStore.$reset()
})
</script>

<style></style>
