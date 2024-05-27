<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">

      </el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="loginRules" ref="loginElForm">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input type="text" :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" show-password v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="isLoading" class="login_btn" type="primary" size="default"
              @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue';
// 仓库
import { useUserStore } from '@/store/modules/user';
// 路由器
import { useRouter } from 'vue-router';
// elNotification
import { ElNotification } from 'element-plus';
import { GET_TIME } from '@/utils/time';

// 路由器
let $route = useRouter();
// 获取el-form元素
let loginElForm = ref();
// 收集对象密码
let loginForm = reactive({
  username: "admin",
  password: "111111"
})
// 按钮加载效果
let isLoading = ref(false);
// 校验规则
const loginRules = {
  username: [{ required: true, min: 3, message: "用户名最少为3位", trigger: "change" }],
  // 自定义校验规则
  password: [{ validator: validatePwd, trigger: "blur" }]
}

/**
* 密码校验规则函数
* @param {any} rule 校验数据规则对象
* @param {any} value  表单元素文本内容
* @param {any} callback 校验规则后的回调函数
*/
function validatePwd(rule : any, value : any, callback : any){
  if(/^\d{5,}$/.test(value)){
    callback() // 放行
  }else {
    callback(new Error("密码长度至少为5位"))
  }
}

// 登录事件
const login = async () => {
  // 验证表单全部通过后才发送请求
  try {
    await loginElForm.value.validate()
    // 1. 通知仓库发请求
    // 2. 成功：跳转首页；失败：弹出失败信息
    const userStore = useUserStore();
    try {
      isLoading.value = true // 开始加载
      await userStore.userLogin(loginForm); // 登录成功
      $route.push("/"); // 跳转首页
      ElNotification({
        type: "success",
        message: "欢迎回来",
        title: "Hi！" + GET_TIME() + "!"
      })
    } catch (e) {
      ElNotification({
        type: "error",
        message: (e as Error).message
      })
    } finally {
      isLoading.value = false; // 加载完毕
    }
  }
  catch (e) {
    ElNotification({
      type: "error",
      message: "账号或密码格式不正确"
    })
  }

}

</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;

    }
  }
}
</style>