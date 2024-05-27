<template>
  <div class="breadcrumb">
    <el-icon style="margin-right: 10px" @click="collapseFold">
      <component
        :is="layoutSettingStore.isCollapse ? 'Fold' : 'Expand'"
      ></component>
    </el-icon>
    <el-breadcrumb separator-icon="arrowRight">
      <!-- 使用 route.matched 路由获取路由信息 -->
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.isVisiable"
        :to="item.path"
      >
        <!-- 路由图标 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 路由标题 -->
        <span style="margin: 0 3px; vertical-align: middle">
          {{ item.meta.title }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

let $route = useRoute()
// 控制折叠菜单图标
let layoutSettingStore = useLayoutSettingStore()
const collapseFold = () => {
  layoutSettingStore.isCollapse = !layoutSettingStore.isCollapse
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style></style>
