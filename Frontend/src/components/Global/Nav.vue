<template>
    <div>
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-menu-item class="expand-collapse" @click="isCollapse = !isCollapse">
                <i class="el-icon-s-fold expand-collapse" v-if="!isCollapse"></i>
                <i class="el-icon-s-unfold expand-collapse" v-else></i>
            </el-menu-item>

            <el-menu-item index="1"
                :class="{ active: $route.path === '/dashboard' }"
                @click="$router.push('/dashboard')">
                <i class="el-icon-menu" :style="{ color: $route.path === '/dashboard' ? '#ffd04b' : 'inherit' }"></i>
                <span slot="title">Dashboard</span>
            </el-menu-item>
            <el-menu-item index="2"
                :class="{ active: $route.path === '/account' }"
                @click="$router.push('/account')">
                <i class="el-icon-setting" :style="{ color: $route.path === '/account' ? '#ffd04b' : 'inherit' }"></i>
                <span slot="title">Account</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false,
        }
    },
    methods: {
        toggleSidebar() {
            this.collapse = !this.collapse;
        },
    }
}
</script>

<style scoped>
.el-menu-vertical-demo .el-menu-item:hover {
    background-color: #ffd04b;
}
.el-menu-vertical-demo .el-menu-item.active, 
.el-menu-vertical-demo .el-submenu-item.active {
    background-color: white;
    color: #ffd04b;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    margin: 5px;
    padding: 0px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
}
.dashboard-container {
    display: flex;
    flex-direction: row;
    height: 100%;
}
.sidebar {
    margin: 5px;
    padding: 0px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
.expand-collapse {
    cursor: pointer;
    color: #000;
}
</style>