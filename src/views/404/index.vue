<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" />
    <el-button type="primary" size="default" @click="$router.push('/')">
      返回首页
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

let $router = useRouter()
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;

  img {
    width: 1014px;
    height: 556px;
  }
}
</style>
