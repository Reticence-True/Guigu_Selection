<!-- eslint-disable vue/valid-attribute-name -->
<template>
  <div>
    <el-card style="margin: 10px 0">
      <el-form
        inline
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
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
    <el-card>
      <el-button type="primary" size="default" @click="addUser">
        添加用户
      </el-button>
      <el-button
        type="danger"
        size="default"
        :disabled="!batchRemoveUserId.length"
        @click="batchRemoveUser"
      >
        批量删除
      </el-button>
      <!-- table展示用户信息 -->
      <el-table
        style="margin: 10px 0"
        border
        :data="userArr"
        @selection-change="userSelectedChanged"
      >
        <el-table-column
          show-overflow-tooltip
          align="center"
          type="selection"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="#"
          type="index"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="ID"
          prop="id"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="用户名"
          prop="username"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="昵称"
          prop="name"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="职位"
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
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="操作"
          width="300px"
        >
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`确定要删除 '${row.username}'？`"
              style="width: 260px"
              @confirm="deleteUser(row)"
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
        :page-sizes="[5, 7, 9, 11]"
        background
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="total"
        @change="userPageChange"
      />
    </el-card>
    <!-- 添加/修改用户信息 -->
    <el-drawer v-model="drawer" direction="rtl">
      <template #header>
        <h4>{{ drawerTitle }}</h4>
      </template>
      <el-form :model="userInfo" :rules="rules" ref="userFormRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            placeholder="请输入用户姓名"
            v-model="userInfo.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            placeholder="请输入用户昵称"
            v-model="userInfo.name"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="用户密码"
          prop="password"
          v-if="userInfo.id ? false : true"
        >
          <el-input
            placeholder="请输入用户密码"
            type="password"
            v-model="userInfo.password"
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
    </el-drawer>
    <!-- 分配角色 -->
    <el-drawer v-model="drawer2" direction="rtl">
      <template #header><h4>分配角色</h4></template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input disabled v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="allChecked"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedRole"
              @change="handleCheckedRolesChange"
            >
              <el-checkbox v-for="role in allRole" :key="role.id" :value="role">
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="default" size="default" plain @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="submit2">
          确定
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  reqAddOrUpdateUser,
  reqAllRole,
  reqBatchRemoveUser,
  reqRemoveUser,
  reqSetRole,
  reqUserInfo,
} from '@/api/acl/user'
import type {
  AllRoleResponseData,
  RoleData,
  SetRoleData,
  User,
} from '@/api/acl/user/type'
import useLayoutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
import { onMounted, ref, reactive } from 'vue'

// 设置仓库
const settingStore = useLayoutSettingStore()
// 分页器
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
// 所有用户信息
let userArr = ref<User[]>([])
// 用户抽屉
let drawer = ref<boolean>(false)
// 用户抽屉标题
let drawerTitle = ref<string>('')
// 单个用户信息
let userInfo = reactive<User>({
  username: '',
  name: '',
  password: '',
  id: 0,
})
// 表单校验规则对象
let rules = {
  // 用户名
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: (_rule: any, value: any, callback: any) => {
        // 长度》=5
        if (value.length < 5) {
          callback(new Error('用户名至少为5个字符'))
        } else {
          // 放行
          callback()
        }
      },
    },
  ],
  // 昵称
  name: [
    {
      required: true,
      trigger: 'blur',
      validator: (_rule: any, value: any, callback: any) => {
        // 长度》=5
        if (value.length < 5) {
          callback(new Error('用户昵称至少为5个字符'))
        } else {
          // 放行
          callback()
        }
      },
    },
  ],
  // 密码
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: (_rule: any, value: any, callback: any) => {
        // 长度》=5
        if (value.length < 6) {
          callback(new Error('密码至少为6个字符'))
        } else {
          // 放行
          callback()
        }
      },
    },
  ],
}
// 用户表单实例
let userFormRef = ref<any>()
// 角色抽屉
let drawer2 = ref<boolean>(false)
// 已选中的角色
let checkedRole = ref<RoleData[]>([])
// 所有角色
let allRole = ref<RoleData[]>([])
// 复选框全选
let allChecked = ref<boolean>(false)
// 中间态复选
let isIndeterminate = ref<boolean>(false)
// 批量删除用户的id
let batchRemoveUserId = ref<number[]>([])
// 搜索关键字
let keyword = ref<string>('')

// 获取全部已有信息
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let res = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
  if (res.code === 200) {
    userArr.value = res.data.records
    total.value = res.data.total
  }
}

// 分页器改变
const userPageChange = (currentPage: number) => {
  getHasUser(currentPage)
}

// 添加用户
const addUser = () => {
  // 修改标题
  drawerTitle.value = '添加用户'
  // 抽屉开启
  drawer.value = true
  // 清空数据
  Object.assign(userInfo, {
    username: '',
    name: '',
    password: '',
    id: 0,
  })
  // 清空上一次验证信息
  userFormRef.value?.clearValidate()
}

// 编辑用户
const editUser = (row: User) => {
  // 修改标题
  drawerTitle.value = '修改用户'
  drawer.value = true
  Object.assign(userInfo, JSON.parse(JSON.stringify(row)))
  // 清空上一次验证信息
  userFormRef.value?.clearValidate()
}

// 确定按钮
const confirm = async () => {
  // 表单校验
  await userFormRef.value.validate()
  // 关闭抽屉
  drawer.value = false
  // 发送请求
  let res = await reqAddOrUpdateUser(userInfo)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: userInfo.id ? '用户更新成功' : '用户添加成功',
    })
    // 重新获取
    getHasUser(userInfo.id ? pageNo.value : 1)
    // 浏览器自动刷新：如果修改了自身则可以被路由拦截器接收到，用于返回登陆页面
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: userInfo.id ? '用户更新失败' : '用户添加失败',
    })
  }
}

// 取消
const cancel = () => {
  drawer.value = false
  drawer2.value = false
}

// 分配角色回调
const setRole = async (row: User) => {
  // 清空
  allRole.value.length = 0
  checkedRole.value.length = 0
  // 抽屉显示
  drawer2.value = true
  // 保存用户信息
  Object.assign(userInfo, JSON.parse(JSON.stringify(row)))
  // 获取职位信息
  let res: AllRoleResponseData = await reqAllRole(row.id as number)
  if (res.code === 200) {
    allRole.value = res.data.allRolesList
    checkedRole.value = res.data.assignRoles
  }
}

// 复选框全选
const handleCheckAllChange = (val: boolean) => {
  checkedRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}

// 复选框组单个复选框发生变化
const handleCheckedRolesChange = (val: string[]) => {
  console.log('变化了')
  allChecked.value = val.length === allRole.value.length
  isIndeterminate.value = val.length > 0 && val.length < allRole.value.length
}

// 分配角色确定
const submit2 = async () => {
  // 参数
  let data: SetRoleData = {
    userId: userInfo.id as number,
    roleIdList: checkedRole.value.map((ele) => {
      return ele.id as number
    }),
  }
  let res: any = await reqSetRole(data)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '角色分配成功',
    })
    drawer2.value = false
    getHasUser(pageNo.value)
  } else {
    ElMessage({
      type: 'success',
      message: '角色分配失败',
    })
  }
}

// 删除用户
const deleteUser = async (row: User) => {
  let res = await reqRemoveUser(row.id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '用户删除成功',
    })
    // 浏览器刷新
    window.location.reload()
  } else {
    ElMessage({
      type: 'success',
      message: '用户删除失败',
    })
  }
}

// 用户表格复选框变化
const userSelectedChanged = (val: User[]) => {
  batchRemoveUserId.value = val.map((ele) => ele.id as number)
}

// 批量删除用户
const batchRemoveUser = async () => {
  let res: any = await reqBatchRemoveUser(batchRemoveUserId.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功',
    })
    // 浏览器刷新
    window.location.reload()
  } else {
    ElMessage({
      type: 'success',
      message: '批量删除失败',
    })
  }
}

// 搜索按钮
const search = () => {
  getHasUser()
}

// 重置按钮
const reset = () => {
  // 修改仓库刷新状态
  settingStore.refresh = !settingStore.refresh
}

onMounted(() => {
  getHasUser()
})
</script>

<style scoped></style>
