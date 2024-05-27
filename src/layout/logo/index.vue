<template>
    <div class="logo">
        <img :src="setting.logo" alt="" v-if="!setting.logoHidden">
        <p>{{setting.title}}</p>
    </div>
</template>

<script setup lang='ts'>
import setting from '@/setting';

</script>
<script lang="ts">
export default {
    name: "Logo"
}
</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding-left: 20px;
    img {
        width: 24px;
        height: 24px;
    }
    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 10px
    }
}
</style>