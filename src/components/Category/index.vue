<template>
  <div>
    <el-card>
      <el-form :inline="true" :disabled="scene">
        <el-form-item label="一级分类">
          <el-select v-model="categoryStore.c1Id" @change="handler">
            <el-option
              v-for="c1 in categoryStore.c1Arr"
              :key="c1.id"
              :value="c1.id"
              :label="c1.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="categoryStore.c2Id" @change="handler1">
            <el-option
              v-for="c2 in categoryStore.c2Arr"
              :key="c2.id"
              :value="c2.id"
              :label="c2.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="categoryStore.c3Id">
            <el-option
              v-for="c3 in categoryStore.c3Arr"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { onMounted } from 'vue'

let categoryStore = useCategoryStore()
// 父组件传递数据
defineProps(['scene'])

onMounted(() => {
  // 一级分类请求
  getC1()
})

// 获取一级分类
const getC1 = () => {
  categoryStore.getC1()
}

// 一级下拉菜单的 change事件
const handler = (val: any) => {
  if (val) {
    // 清空二、三级分类id
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    // 三级分类数据
    categoryStore.c3Arr.length = 0
    // 发送二级菜单请求
    getC2()
  }
}

// 获取二级分类
const getC2 = () => {
  categoryStore.getC2()
}

// 二级下拉菜单的 change事件
const handler1 = () => {
  // 清空三级分类id
  categoryStore.c3Id = ''
  // 获取三级分类数据
  getC3()
}

// 获取三级分类
const getC3 = () => {
  categoryStore.getC3()
}
</script>

<script lang="ts">
export default {
  name: 'Category',
}
</script>

<style>
.el-select {
  --el-select-width: 220px;
}
</style>
