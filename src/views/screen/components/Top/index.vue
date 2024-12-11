<template>
  <div class="top">
    <div class="left">
      <span class="leftBtn">
        <span class="lbtn" @click="goHome">首页</span>
      </span>
    </div>
    <div class="center">
      <div class="center-content">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rightBtn">
        <span class="rbtn">统计报告</span>
        <span class="rtime">{{ curTime }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()

// 当前时间
let curTime = ref<string>(new Date().toLocaleString())

// 监听时间更改
let timeInterval = setInterval(() => {
  curTime.value = new Date().toLocaleString()
}, 1000)

// 首页按钮
const goHome = () => {
  $router.push('/home')
}

onBeforeUnmount(() => {
  clearInterval(timeInterval)
})
</script>
<script lang="ts">
export default {
  name: 'Top',
}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    flex: 1;
    background: url(../../../../assets/screen_image/dataScreen-header-left-bg.png)
      no-repeat;
    background-size: 100% 100%;

    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url(../../../../assets/screen_image/dataScreen-header-btn-bg-l.png)
        no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
    }
  }

  .center {
    flex: 3;

    .center-content {
      width: 100%;
      height: 74px;
      background: url(../../../../assets/screen_image/dataScreen-header-center-bg.png)
        no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
      letter-spacing: 10px;
    }
  }

  .right {
    flex: 1;
    background: url(../../../../assets/screen_image/dataScreen-header-right-bg.png)
      no-repeat;
    background-size: 100% 100%;
    color: #29fcff;

    .rbtn {
      width: 150px;
      height: 40px;
      float: left;
      background: url(../../../../assets/screen_image/dataScreen-header-btn-bg-r.png)
        no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
    }

    .rtime {
      width: calc(100% - 150px);
      height: 100%;
      float: right;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>
