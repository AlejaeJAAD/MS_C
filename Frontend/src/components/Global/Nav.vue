<template>
    <div class="app-container">
        <el-menu
            class="top-bar"
            mode="horizontal"
            background-color="#2c2c2c"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1" 
                                :class="{ active: $route.path === '/tracks' }"
                                @click="$router.push('/tracks')">
                Tracks
            </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">Account</template>
                        <el-menu-item index="2-1"
                                        :class="{ active: $route.path === '/account/personal-info' }"
                                        @click="$router.push('/account/personal-info')">
                                        Personal Info
                        </el-menu-item>
                        <el-menu-item index="2-2"
                                        :class="{ active: $route.path === '/account/security' }"
                                        @click="$router.push('/account/security')">
                            Security</el-menu-item>
                </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>
.app-container {
    display: flex;
    flex-direction: column;
}

.top-bar .el-menu-item.active,
.top-bar .el-submenu__title span.active {
    color: #ffd04b !important;
}

.top-bar {
    background-color: #1a1a1a;
    padding: 0 20px;
}

</style>
