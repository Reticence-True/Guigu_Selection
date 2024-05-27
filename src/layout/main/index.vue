<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- 路由组件出口位置 -->
      <transition name="fade">
        <!-- 渲染一级路由的子路由 -->
        <component :is="Component" v-if="destoryFlag" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'

let layoutSettingStore = useLayoutSettingStore()
// 控制组件销毁
let destoryFlag = ref(true)
// 监听仓库数据变化
watch(
  () => layoutSettingStore.refresh,
  () => {
    destoryFlag.value = false
    nextTick(() => {
      destoryFlag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
