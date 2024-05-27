<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ collapse: layoutSettingStore.isCollapse }">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu background-color="#001529" text-color="white" :default-active="$route.path"
                    :collapse="layoutSettingStore.isCollapse">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ collapse: layoutSettingStore.isCollapse }">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示 -->
        <div class="layout_main" :class="{ collapse: layoutSettingStore.isCollapse }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useUserStore } from "@/store/modules/user";
import useLayoutSettingStore from "@/store/modules/setting";
import Logo from "./logo/index.vue"
import Menu from "./menu/index.vue"
import Main from "./main/index.vue"
import Tabbar from "./tabbar/index.vue"

const userStore = useUserStore();
const layoutSettingStore = useLayoutSettingStore();

</script>
<script lang="ts">
export default {
    name: "Layout"
}
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        color: #fff;
        background: $base-menu-bgColor;
        transition: all .3s;
        white-space: nowrap;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
        }

        &.collapse {
            width: $base-menu-min-width;
        }
    }

    .layout_tabbar {
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        color: #000;
        position: fixed;
        top: 0;
        left: $base-menu-width;
        transition: all .3s;

        &.collapse {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        top: $base-tabbar-height;
        left: $base-menu-width;
        padding: 20px;
        overflow: auto;
        transition: all .3s;

        &.collapse {
            width: calc(100% - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>