// layout组件相关的配置仓库
import { defineStore } from "pinia";
import { ref, reactive } from "vue"

let useLayoutSettingStore = defineStore('SettingStore', () => {
    // 数据
    let isCollapse = ref(false) // 控制菜单折叠
    let refresh = ref(false) // 刷新
    // 行为
    

    // 计算属性

    return {
        isCollapse,
        refresh
    }
})
export default useLayoutSettingStore;