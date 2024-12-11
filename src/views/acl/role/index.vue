<!-- eslint-disable vue/valid-attribute-name -->
<template>
  <div>
    <el-card>
      <el-form
        inline
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <el-form-item label="角色搜索">
          <el-input placeholder="请输入角色关键字" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="!keyword"
            @click="search"
          >
            搜索
          </el-button>
          <el-button type="default" size="default" @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" icon="Plus" @click="addRole">
        添加角色
      </el-button>
      <el-table border style="margin: 10px 0" :data="allRolesList">
        <el-table-column
          type="index"
          align="center"
          label="#"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="id"
          prop="id"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="角色名称"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="创建时间"
          prop="createTime"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="更新时间"
          prop="updateTime"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="300px">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setPermission(row)"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`确认删除 '${row.roleName}？'`"
              style="width: 200px"
              @confirm="deleteRole(row)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20, 25]"
        background
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="total"
        @change="rolePageChange"
      />
    </el-card>
    <el-dialog v-model="dialogVisible" width="500px">
      <template #header>
        <h4>{{ roleData.id ? '更新角色' : '添加角色' }}</h4>
      </template>
      <el-form :model="roleData" :rules="rules" ref="roleFormRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            placeholder="请输入角色名称"
            v-model="roleData.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" size="default" plain @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
    <!-- 分配权限 -->
    <el-drawer v-model="drawer" direction="rtl" title="分配权限">
      <el-tree
        style="max-width: 600px"
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="checkedKeysList"
        :props="treeProps"
        ref="treeRef"
      />
      <template #footer>
        <el-button type="default" size="default" @click="cancel" plain>
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm2">
          确定
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateRole,
  reqAllPermissionsofRole,
  reqAllRoleList,
  reqRemoveRole,
  reqSetPermission,
} from '@/api/acl/role'
import type {
  AllRolesResponseData,
  MenuPermission,
  Role,
} from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

// 设置仓库
let settingStore = useLayoutSettingStore()

// 分页器
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
// 所有角色信息
let allRolesList = ref<Role[]>([])
// 搜索关键字
let keyword = ref<string>('')
// 对话框
let dialogVisible = ref<boolean>(false)
// 角色表单实例
let roleFormRef = ref()
// 角色信息
let roleData = reactive<Role>({
  id: 0,
  roleName: '',
})
// 添加角色校验规则
const rules = {
  roleName: [
    {
      required: true,
      trigger: 'blur',
      validator: (_rule: any, val: any, callback: any) => {
        if (val.trim().length < 2) {
          callback(new Error('角色名称至少为2位'))
          return
        }
        callback()
      },
    },
  ],
}
// 抽屉
let drawer = ref<boolean>(false)
// 树数据
let treeData = ref<MenuPermission[]>([])
// 树展示数据
let treeProps = {
  label: 'name',
  children: 'children',
}
// 被选中的树节点key数组
let checkedKeysList = ref<number[]>([])
// 树形组件实例
let treeRef = ref<any>()

// 获取全部角色
const getHasRole = async (pager = 1) => {
  pageNo.value = pager

  let res: AllRolesResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    allRolesList.value = res.data.records
  }
}

// 分页器变化
const rolePageChange = (curPage: number) => {
  getHasRole(curPage)
}

// 搜索事件
const search = () => {
  getHasRole()
}

// 重置事件
const reset = () => {
  // 刷新骨架
  settingStore.refresh = !settingStore.refresh
}

// 添加角色
const addRole = () => {
  // dialog弹出
  dialogVisible.value = true
  // 清空数据
  Object.assign(roleData, {
    id: 0,
    roleName: '',
  })
  // 清理校验结果
  roleFormRef.value?.clearValidate()
}

// 更新角色
const updateRole = (row: Role) => {
  // dialog弹出
  dialogVisible.value = true
  // 赋值
  Object.assign(roleData, JSON.parse(JSON.stringify(row)))
  // 清理校验结果
  roleFormRef.value?.clearValidate()
}

// 确定按钮
const confirm = async () => {
  // 表单校验
  await roleFormRef.value.validate()

  // 发送请求
  let res: any = await reqAddOrUpdateRole(roleData)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: roleData.id ? '角色更新成功' : '角色添加成功',
    })
    // 关闭对话框
    dialogVisible.value = false
    // 获取所有数据
    getHasRole(roleData.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: roleData.id ? '角色更新失败' : '角色添加失败',
    })
  }
}

// 取消按钮
const cancel = () => {
  // dialog隐藏
  dialogVisible.value = false
  // 抽屉隐藏
  drawer.value = false
}

// 分配权限按钮
const setPermission = async (row: Role) => {
  // 抽屉显示
  drawer.value = true
  // 清空选中的树节点数组
  checkedKeysList.value.length = 0
  // 清空树节点数组
  treeData.value.length = 0
  // 设置角色信息
  Object.assign(roleData, row)
  // 根据角色id获取权限信息
  let res = await reqAllPermissionsofRole(row.id as number)
  if (res.code === 200) {
    // 存储权限数据
    treeData.value = JSON.parse(JSON.stringify(res.data))
    // 判断选中的节点
    setTreeNodeChecked(treeData.value)
  }
}

// 查找树型节点是否勾选
const setTreeNodeChecked = (treeNodeList: MenuPermission[]) => {
  if (treeNodeList.length === 0) return
  treeNodeList.forEach((node) => {
    // 如果有子节点，则继续判断
    if (node.children.length) {
      setTreeNodeChecked(node.children)
    }
    // 如果为叶节点，则添加入数组
    else {
      if (node.select) {
        // 添加id到已选数组中
        checkedKeysList.value.push(node.id)
      }
    }
  })
}

// 权限确定按钮
const confirm2 = async () => {
  // 角色id
  let id: number = roleData.id as number
  // 全选中和半选中的节点id
  let checkedArr = treeRef.value
    .getCheckedKeys()
    .concat(treeRef.value.getHalfCheckedKeys())
  // 发送请求
  let res: any = await reqSetPermission(id, checkedArr)
  if (res.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '权限分配成功',
    })
    // 刷新
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '权限分配失败',
    })
  }
}

// 删除角色
const deleteRole = async (row: Role) => {
  let res = await reqRemoveRole(row.id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '角色删除成功',
    })
    getHasRole(allRolesList.value.length ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'success',
      message: '角色删除失败',
    })
  }
}

onMounted(() => {
  getHasRole()
})
</script>

<style></style>
