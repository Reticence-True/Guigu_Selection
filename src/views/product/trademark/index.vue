<template>
  <el-card class="box-card">
    <!-- 卡片添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus" @click="">
      添加品牌
    </el-button>
    <!-- 表格展示已有品牌数据 -->
    <el-table style="margin: 10px 0" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <!-- el-table-column 默认展示数据使用 div，也可以使用插槽自定义列内容 -->
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" width="100" height="100" />
          r
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            @click=""
            icon="Edit"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            @click=""
            icon="Deletes"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :small="false"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @size-change=""
      @current-change=""
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'

let pageNo = ref<number>(1) // 当前页码
let limit = ref<number>(3) // 每一条多少个数据
let total = ref<number>(0) // 存储品牌总数
let trademarkArr = ref<any>([]) // 存储已有品牌数据

// 封装获取已有商品函数
const getHasTrademark = async () => {
  let res = await reqHasTrademark(pageNo.value, limit.value)
  if (res.code === 200) {
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}

// 生命周期
onMounted(() => {
  getHasTrademark() // 默认情况
})
</script>

<style></style>
