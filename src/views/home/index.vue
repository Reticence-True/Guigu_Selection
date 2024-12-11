<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" class="avatar" />
        <div class="content">
          <h1 class="title">{{ GET_TIME() + ' ' + userStore.username }}</h1>
          <p class="sub">硅谷甄选运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="welcome">
      <svg-icon
        name="welcome"
        width="600px"
        height="300px"
        style="margin-top: 50px"
      ></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { GET_TIME } from '@/utils/time'

// 用户仓库
let userStore = useUserStore()

// 获取
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .content {
    margin-left: 20px;

    .title {
      font-size: 20px;
      margin-bottom: 10px;
      font-weight: bold;
    }

    .sub {
      color: gray;
    }
  }
}

.welcome {
  display: flex;
  justify-content: space-around;
}
</style>
