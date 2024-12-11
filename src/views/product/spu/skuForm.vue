<!-- eslint-disable vue/valid-attribute-name -->
<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuParam.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          type="number"
          v-model="skuParam.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input
          placeholder="重量(克)"
          type="number"
          v-model="skuParam.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          placeholder="SKU描述"
          type="textarea"
          v-model="skuParam.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item
            v-for="item in attrArr"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select v-model="item.attrIdAndVal">
              <el-option
                v-for="attrVal in item.attrValueList"
                :key="attrVal.id"
                :label="attrVal.valueName"
                :value="`${item.id}:${attrVal.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item
            v-for="item in saleArr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select v-model="item.saleIdAndVal">
              <el-option
                v-for="saleAttrVal in item.spuSaleAttrValueList"
                :key="saleAttrVal.id"
                :label="saleAttrVal.saleAttrValueName"
                :value="`${item.id}:${saleAttrVal.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imageArr" ref="skuTableRef">
          <el-table-column
            type="selection"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="图片">
            <template #="{ row }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="warning" size="default" @click="handler(row)">
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button type="primary" size="default" plain @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reqAttr } from '@/api/product/attr'
import {
  reqAddSku,
  reqSpuHasSaleAttr,
  reqSpuImageList,
} from '@/api/product/spu'
import type { SkuData, SpuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['changeScene'])
// 平台属性
let attrArr = ref<any[]>([])
// 销售属性
let saleArr = ref<any[]>([])
// 照片墙
let imageArr = ref<any[]>([])
// sku参数
let skuParam = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
})
// skuTable
let skuTableRef = ref<any>()

// 取消事件
const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}

// sku初始化
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spuData: SpuData,
) => {
  // 收集数据
  skuParam.category3Id = spuData.category3Id
  skuParam.spuId = spuData.id as string | number
  skuParam.tmId = spuData.tmId
  // 获取所有属性
  attrArr.value = (await reqAttr(c1Id, c2Id, spuData.category3Id)).data
  // 照片墙
  imageArr.value = (await reqSpuImageList(spuData.id as number)).data
  // 销售属性
  saleArr.value = (await reqSpuHasSaleAttr(spuData.id as number)).data
}

// 设置sku默认图片方法回调
const handler = (row: any) => {
  // 全部复选框清空
  skuTableRef.value.clearSelection()
  // 设置复选框选中
  skuTableRef.value.toggleRowSelection(row)
  skuParam.skuDefaultImg = row.imgUrl
}

// 保存
const save = async () => {
  // 整理参数
  // 平台属性
  skuParam.skuAttrValueList = attrArr.value.reduce((prev, acc) => {
    if (acc.attrIdAndVal) {
      let [attrId, valueId] = acc.attrIdAndVal.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])

  // 销售属性
  skuParam.skuSaleAttrValueList = saleArr.value.reduce((prev, acc) => {
    if (acc.saleIdAndVal) {
      let [saleAttrId, saleAttrValueId] = acc.saleIdAndVal.split(':')
      prev.push({ saleAttrId, saleAttrValueId })
    }
    return prev
  }, [])

  // 发送请求
  let res: any = await reqAddSku(skuParam)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: 'SKU添加成功',
    })
  } else {
    ElMessage({
      type: 'success',
      message: 'SKU添加失败',
    })
  }

  // 切换场景 0
  $emit('changeScene', { flag: 0, params: '' })
}

defineExpose({ initSkuData })
</script>
<script lang="ts">
export default {
  name: 'SkuForm',
}
</script>

<style></style>
