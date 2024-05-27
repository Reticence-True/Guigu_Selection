<template>
    <div class="setting">
        <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
        <el-button size="small" icon="FullScreen" circle></el-button>
        <el-button size="small" icon="Setting" circle></el-button>
        <img src="/vite.svg" alt="" style="width: 24px; height: 24px; margin: 0 10px">
        <el-dropdown>
            <span class="el-dropdown-link">
                Admin
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang='ts'>
import useLayoutSettingStore from '@/store/modules/setting';

let layoutSettingStore = useLayoutSettingStore();
const updateRefresh = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
}

</script>
<script lang="ts">
export default {
    name: "Setting"
}
</script>

<style></style>