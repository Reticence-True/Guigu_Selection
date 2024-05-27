<template>
    <template v-for="(r, i) in menuList" :key="r.path">
        <!-- 没有子路由 -->
        <el-menu-item v-if="!r.children && r.meta.isVisiable" :index="r.path" @click="goRoute">
            <!-- 图标放在标题插槽外部，以免折叠时将图标折叠掉 -->
            <el-icon>
                <component :is="r.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ r.meta.title }}</span>
            </template>
        </el-menu-item>

        <!-- 一个子路由 -->
        <el-menu-item v-if="r.children && r.children.length === 1 && r.children[0].meta.isVisiable"
            :index="r.children[0].path" @click="goRoute">
            <!-- 图标放在标题插槽外部，以免折叠时将图标折叠掉 -->
            <el-icon>
                <component :is="r.children[0].meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ r.children[0].meta.title }}</span>
            </template>
        </el-menu-item>

        <!-- 多个子路由 -->
        <el-sub-menu v-if="r.meta.isVisiable && r.children && r.children.length > 1" :index="r.path">
            <!-- 图标放在标题插槽外部，以免折叠时将图标折叠掉 -->
            <template #title>
                <el-icon>
                    <component :is="r.meta.icon"></component>
                </el-icon>
                <span>{{ r.meta.title }}</span>
            </template>
            <Menu :menuList="r.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';

// 路由组件
const $router = useRouter();
// 父组件传递参数
defineProps(["menuList"]);
// 点击菜单实例
const goRoute = (vc: any) => {
    $router.push(vc.index)
}

</script>
<script lang='ts'>
export default {
    name: 'Menu'
}
</script>

<style>
.el-menu {
    border-right: none;
}
</style>