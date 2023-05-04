<template>
    <div class="employee-list">
        <h2 class="employee-list__title">Employee List</h2>
        <el-row class="employee-list__row" :gutter="30">
            <el-col class="employee-list__col" :span="6" v-for="employee in employees" :key="employee.id">
                <el-card class="employee-list__card">
                    <div class="employee-list__card-image-container">
                    <img class="employee-list__card-image" :src="`https://via.placeholder.com/600/771796e`" alt="">
                    </div>
                    <div class="employee-list__card-content">
                    <p class="employee-list__card-name">{{ employee.firstName }} {{  employee.lastName }}</p>
                    <p class="employee-list__card-title">{{ employee.title }}</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Employees',
    computed: {
        ...mapGetters('employees', {
            employees: 'employees',
        }),
    },
    created() {
        this.fetchEmployees();
    },
    methods: {
        ...mapActions('employees', {
            fetchEmployees: 'fetchEmployees',
        }),
    },
};
</script>

<style scoped>
.employee-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}

.employee-list__title {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #333;
}

.employee-list__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 -15px;
    align-items: stretch;
}

.employee-list__col {
    padding: 0 15px;
    margin-bottom: 30px;
    margin-top: 20px;
}

.employee-list__card {
    width: 100%;
    height: 400px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
}

.employee-list__card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.employee-list__card-image-container {
    width: 100%;
    height: 200px;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
}

.employee-list__card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.employee-list__card-content {
    padding: 20px;
    text-align: center;
}

.employee-list__card-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem 0 0.5rem;
    color: #333;
}

.employee-list__card-title {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    color: #666;
}

.employee-list__card-email {
    font-size: 1rem;
    margin: 0.5rem 0;
    color: #999;
}
</style>