import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryObj, CategoryResponseData } from '@/api/product/attr/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 商品分类全局组件仓库
const useCategoryStore = defineStore('Category', () => {
  // state
  // 一级分类
  const c1Arr = ref<CategoryObj[]>([]) // 数组
  const c1Id = ref<number | string>('') // id
  // 二级分类
  const c2Arr = ref<CategoryObj[]>([]) // 数组
  const c2Id = ref<number | string>('') // id
  // 三级分类
  const c3Arr = ref<CategoryObj[]>([]) // 数组
  const c3Id = ref<number | string>('') // id

  // action
  // 获取一级分类
  const getC1 = async () => {
    const res: CategoryResponseData = await reqC1()
    if (res.code === 200) {
      c1Arr.value = res.data
    }
  }
  // 获取二级分类
  const getC2 = async () => {
    const res: CategoryResponseData = await reqC2(c1Id.value)
    if (res.code === 200) {
      c2Arr.value = res.data
    }
  }
  // 获取三级分类
  const getC3 = async () => {
    const res: CategoryResponseData = await reqC3(c2Id.value)
    if (res.code === 200) {
      c3Arr.value = res.data
    }
  }

  // computed/getters

  return {
    c1Arr,
    c1Id,
    getC1,
    c2Arr,
    c2Id,
    getC2,
    c3Arr,
    c3Id,
    getC3,
  }
})

export default useCategoryStore
