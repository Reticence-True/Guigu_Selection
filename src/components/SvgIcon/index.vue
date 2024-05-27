<template>
  <!-- svg为图标容器 -->
  <svg :style="{ width, height }">
    <!-- use为图标：属性值务必为 #icon-图标名 -->
    <!-- fill属性可以设置图标颜色 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  // xlink:href 属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 图标名称
  name: {
    type: String,
  },
  // 颜色
  color: {
    type: String,
    default: '',
  },
  // 宽度
  width: {
    type: String,
    default: '16px',
  },
  // 高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style></style>
