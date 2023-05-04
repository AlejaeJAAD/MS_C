<template>
    <div>
        <Nav />
        <el-row>
            <el-col>
                <el-card class="songDetail-card">
                    {{ this.songId }}
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Nav from '../components/Global/Nav.vue'

export default {
    components: {
        Nav
    },
    data() {
        return {
                songId: ''
            }
    },
    mounted() {
        console.log(this.$route.params.id)
            this.songId = this.$route.params.id
        }
    }
</script>

<style scoped>
.songDetail-card {
    margin: 2rem;
}
</style>