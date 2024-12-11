<!-- eslint-disable vue/valid-attribute-name -->
<template>
  <div>
    <!-- 属性分类 -->
    <Category :scene="scene"></Category>
    <el-card shadow="always">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrRef">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`确定删除属性 &quot;${row.attrName}&quot;?`"
                width="200px"
                @confirm="deleteAttr(row.id)"
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
      </div>
      <div v-show="scene === 1">
        <el-form :inline="true" :data="attrParam.attrName">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              size="default"
              v-model="attrParam.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          @click="addAttrValue"
          icon="Plus"
          :disabled="attrParam.attrName ? false : true"
        >
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="cancel" plain>
          取消
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrParam.attrValueList">
          <el-table-column
            type="index"
            width="80px"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <!-- row为当前的属性值对象 -->
              <el-input
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值"
                :ref="(vc: any) => (inputArr[$index] = vc)"
                @blur="toLook(row, $index)"
              ></el-input>
              <!-- 展示属性值的div -->
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ $index }">
              <el-button
                type="primary"
                size="small"
                @click="() => attrParam.attrValueList.splice($index, 1)"
                icon="Delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="attrParam.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="cancel" plain>
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, reactive, ref } from 'vue'
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr'
import type { Attr, AttrValue } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category'
import { watch } from 'vue'
import { ElMessage } from 'element-plus'

let categoryStore = useCategoryStore()
// 存储属性和属性值
let attrRef = ref<Attr[]>([])
// 卡片内容切换
let scene = ref<number>(0) // scene: 0 -- table, 1 -- 修改和添加
// 新增属性数据
let attrParam = reactive<Attr>({
  attrName: '', // 新增属性名
  attrValueList: [], // 新增属性值
  categoryId: '', // 所属分类ID
  categoryLevel: 3, // 所属分类等级（3级）
})
// el-input组件实例
let inputArr = ref<any>([])

// 监听c3Id
watch(
  () => categoryStore.c3Id,
  () => {
    // 获取所有属性
    getAllAttrs()
  },
)

// 获取所有属性信息
const getAllAttrs = async () => {
  // 获取分类ID
  const { c1Id, c2Id, c3Id } = categoryStore
  // 清空上一次选择的属性
  attrRef.value.length = 0
  if (c3Id) {
    let res: any = await reqAttr(c1Id, c2Id, c3Id)
    if (res.code === 200) {
      attrRef.value = res.data
    }
  }
}

// 添加属性按钮回调
const addAttr = () => {
  // 切换为场景1
  scene.value = 1
  // 清空数据
  Object.assign(attrParam, {
    id: '', // 属性id
    attrName: '', // 新增属性名
    attrValueList: [], // 新增属性值
    categoryId: '', // 所属分类ID
    categoryLevel: 3, // 所属分类等级（3级）
  })
}

// table修改按钮
const updateAttr = (row: Attr) => {
  // 切换为场景1
  scene.value = 1
  // 保存属性对象
  /* 
    但是这里有个浅拷贝问题
    Object.assign(attrParam, row)
    Object.assign为浅拷贝，当修改attrParam的值的时候，row的值也会相应改变
  */
  // 这里改用深拷贝
  Object.assign(attrParam, JSON.parse(JSON.stringify(row)))
}

// 取消按钮
const cancel = () => {
  // 切换为场景0
  scene.value = 0
}

// 添加属性值
const addAttrValue = () => {
  // 向属性值数组添加
  attrParam.attrValueList.push({
    valueName: '',
    flag: true,
  })
  // 最后一个elinput组件聚焦
  nextTick(() => {
    inputArr.value[attrParam.attrValueList.length - 1].focus()
  })
}

// 保存按钮回调
const save = async () => {
  // 收集参数
  attrParam.categoryId = categoryStore.c3Id

  // 发请求
  let res: any = await reqAddOrUpdateAttr(attrParam)
  scene.value = 0
  if (res.code === 200) {
    // 切换为场景0
    // 提示
    ElMessage({
      type: 'success',
      message: attrParam.id ? '修改成功' : '添加成功',
    })
    // 获取所有属性信息
    getAllAttrs()
  } else {
    // 提示
    ElMessage({
      type: 'success',
      message: attrParam.id ? '修改失败' : '添加失败',
    })
  }
}

// 相应属性值名称的查看状态
const toLook = (row: AttrValue, $index: number) => {
  // 空属性值
  if (!row.valueName.trim()) {
    // 提示
    ElMessage({ type: 'warning', message: '属性值不能为空' })
    // 从数组中删除
    attrParam.attrValueList.splice($index, 1)
    return
  }
  // 重复属性值
  let repeat = attrParam.attrValueList.find((item) => {
    if (item != row) return item.valueName === row.valueName
  })
  if (repeat) {
    ElMessage({ type: 'warning', message: '属性值不能重复' })
    attrParam.attrValueList.splice($index, 1)
    return
  }
  row.flag = false
}

// 相应属性值名称的编辑状态
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  // 文本框聚焦
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

// 删除已有属性
const deleteAttr = async (attrId: number) => {
  let res: any = await reqRemoveAttr(attrId)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除属性成功',
    })
    // 发送请求
    getAllAttrs()
  } else {
    ElMessage({
      type: 'error',
      message: '删除属性失败',
    })
  }
}

// 路由组件销毁
onBeforeUnmount(() => {
  // 清空分类仓库数据
  categoryStore.$reset()
})
</script>

<style></style>
