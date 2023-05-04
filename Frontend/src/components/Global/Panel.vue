<template>
    <el-menu :color="color" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">{{  title  }}</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        props: [
            'title', 'color'
        ],
        data () {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        }
    }
</script>

<style lang="scss" scoped>

</style>