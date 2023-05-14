<template>
    <div class="account-container">
        <Nav />
        <el-card class="card">
            <div class="button-container">
                <el-button
                    class="half-width"
                    :class="{ 'active-button': option === 1 }"
                    @click="option = 1"
                >
                    Personal Information
                    <i v-if="option === 1" class="el-icon-d-arrow-right"></i>
                </el-button>
                <el-button
                    class="half-width"
                    :class="{ 'active-button': option === 2 }"
                    @click="option = 2"
                >
                    Security
                    <i v-if="option === 2" class="el-icon-d-arrow-right"></i>
                </el-button>
            </div>
            <el-card class="personal_security">
                <Personal v-if="option === 1" :user="user" />
                <Security v-if="option === 2" :user="user"/>
            </el-card>
        </el-card>
    </div>
</template>


<style scoped>
.account-container {
    display: flex;
    flex-direction: row;
}
.card {
    flex-grow: 1;
    margin: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}
.personal_security {
    flex-grow: 1;
    margin: 10px;
    margin-top: 2rem;
    border-radius: 16px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}
.option:hover {
    background-color: #ffd04b;
    cursor: pointer;
    font-weight: bolder;
    padding: 10px;
}

.button-container {
    display: flex;
}

.active-button {
    background-color: white !important;
    color: #ffd04b !important;
    cursor: pointer;
    font-weight: bolder;
    padding: 10px;
}

.half-width {
    flex: 1 1 50%;
    background-color: #ffd04b;
    border-color: #ffd04b;
    color: white;
    border-radius: 8px;
}
.half-width:hover {
    flex: 1 1 50%;
    background-color: white;
    border-color: #ffd04b;
    color: #ffd04b;
}
</style>

<script>
import Nav from '../components/Global/Nav.vue'
import Personal from '../components/Account/Personal.vue'
import Security from '../components/Account/Security.vue'
export default {
    components: {
        Nav, Personal, Security
    },
    data() {
            return {
                option: 1
            }
    },
    computed: {
        user() {
            const user = this.$store.getters.getUser;
            return user || {};
        }
    }
}
</script>