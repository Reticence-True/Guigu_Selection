import type { loginForm, loginResponseData } from "@/api/user/type";
import { defineStore } from "pinia"
// 接口
import { reqLogin } from "@/api/user";
// 本地存储操作
import { GET_TOKEN, SET_TOKEN } from "@/utils/token";
// 常量路由
import { constantRoute } from "@/router/routes";


// 创建用户小仓库
export const useUserStore = defineStore('User', () => {
    /* 数据 */
    // token
    let token : string | null = GET_TOKEN("TOKEN");
    // 常量路由
    const menuRoutes = constantRoute;

    /* 行为 */
    // 登录功能
    const userLogin = async (loginForm: loginForm) => {
        let result : loginResponseData = await reqLogin(loginForm)
        // 成功：存储token
        if (result.code === 200) {
            // 存储token
            token = result.data.token
            // 持久化存储
            SET_TOKEN(token as string);
            return 'ok' // 保证async返回fulfiled
        } else if (result.code === 201) {  // 失败：返回错误信息
            return Promise.reject(new Error(result.data.message));
        }
    }

    /* 计算属性 */

    return {
        // 数据
        menuRoutes,
        // 行为
        userLogin,
    }
})