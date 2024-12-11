<template>
  <div>
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column lebel="名称" prop="name"></el-table-column>
      <el-table-column lebel="权限值" prop="code"></el-table-column>
      <el-table-column lebel="修改时间" prop="updateTime"></el-table-column>
      <el-table-column lebel="操作" align="center">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 4"
            @click="addPremission(row)"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 1"
            @click="editPremission(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`确定要删除 '${row.name}？'`"
            @confirm="remove(row)"
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                :disabled="row.level === 1"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialog" :title="menuInfo.id ? '更新菜单' : '添加菜单'">
      <el-form label-width="70px">
        <el-form-item label="菜单名称">
          <el-input
            placeholder="请输入菜单名称"
            v-model="menuInfo.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input
            placeholder="请输入权限值"
            v-model="menuInfo.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" size="default" plain @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="submit">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateMenu, reqAllMenus, reqRemoveMenu } from '@/api/acl/menu'
import type {
  Menu,
  MenuParams,
  MenuPermissionResponseData,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
import { onMounted, ref, reactive } from 'vue'

// 所有菜单信息
let menuList = ref<Menu[]>([])
// dialog
let dialog = ref<boolean>(false)
// 菜单信息
let menuInfo = reactive<MenuParams>({
  id: 0,
  pid: 0,
  name: '',
  code: '',
  level: 0,
})

// 获取菜单
const getHasMenu = async () => {
  let res: MenuPermissionResponseData = await reqAllMenus()
  if (res.code === 200) {
    menuList.value = res.data
  }
}

// 添加菜单
const addPremission = (row: Menu) => {
  dialog.value = true
  // 清空数据
  Object.assign(menuInfo, {
    id: 0,
    pid: 0,
    name: '',
    code: '',
    level: 0,
  })
  // 设置level和pid
  menuInfo.pid = row.id as number
  menuInfo.level = row.level + 1
}

// 更新菜单
const editPremission = (row: Menu) => {
  dialog.value = true
  // 设置数据
  Object.assign(menuInfo, JSON.parse(JSON.stringify(row)))
}

// 确定按钮
const submit = async () => {
  // 发送请求
  let res = await reqAddOrUpdateMenu(menuInfo)
  if (res.code === 200) {
    dialog.value = false
    ElMessage({
      type: 'success',
      message: menuInfo.id ? '更新菜单成功' : '添加菜单成功',
    })
    getHasMenu()
  } else {
    ElMessage({
      type: 'error',
      message: menuInfo.id ? '更新菜单失败' : '添加菜单失败',
    })
  }
}

const cancel = () => {
  dialog.value = false
}

// 删除菜单
const remove = async (row: Menu) => {
  let res = await reqRemoveMenu(row.id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除菜单成功',
    })
    getHasMenu()
  } else {
    ElMessage({
      type: 'error',
      message: '删除菜单失败',
    })
  }
}

onMounted(() => {
  getHasMenu()
})
</script>

<style></style>
