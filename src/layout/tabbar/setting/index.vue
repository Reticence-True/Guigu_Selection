<template>
  <div class="setting">
    <el-button
      size="small"
      icon="Refresh"
      circle
      @click="updateRefresh"
    ></el-button>
    <el-button
      size="small"
      icon="FullScreen"
      circle
      @click="fullScreen"
    ></el-button>
    <el-popover
      placement="bottom"
      title="主题设置"
      :width="300"
      trigger="hover"
    >
      <template #default>
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker
              v-model="color"
              show-alpha
              size="default"
              @change="setThemeColor(color)"
              :teleported="false"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch
              v-model="dark"
              size="default"
              active-icon="Moon"
              inactive-icon="Sunny"
              inline-prompt
              @change="changeDark"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #reference>
        <el-button size="small" icon="Setting" circle></el-button>
      </template>
    </el-popover>
    <img
      :src="userStore.avatar"
      alt=""
      style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'

const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()

// 收集开关数据
let dark = ref<boolean>(false)

// 颜色
let color = ref()

// 刷新按钮
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 全屏
const fullScreen = () => {
  // fullscreenElement 属性，检测窗口是否全屏 - 全屏：html元素 (true)，非全屏：null (false)
  let full = document.fullscreenElement
  // console.log(full)
  // 切换全屏
  if (!full) {
    // 文档根节点的 requestFullscreen 实现全屏
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}

// 退出登录
const logout = async () => {
  // 向服务器发送退出登录接口
  // 没有，暂不实现
  // 清空仓库中的用户数据
  await userStore.userLogout()
  // 跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

// 切换暗黑模式
const changeDark = (val: boolean) => {
  let html = document.documentElement
  html.className = val ? 'dark' : ''
}

// 设置主题颜色
const setThemeColor = (curColor: string) => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', curColor)
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style></style>
