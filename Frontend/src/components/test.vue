<template>
    <div class="employee-list">
        <h2 class="employee-list__title">Employee List</h2>

        <el-row style="padding: 1rem" v-for="employee in employees" :key="employee.id" class="employee-list__item">
            <el-col :span="4" v-for="o in 4" :key="o" style="padding: 1rem">
                <el-card :body-style="{ padding: '1rem' }">
                    <div class="employee-list__item-details">
                        <p class="employee-list__item-name">{{ employee.firstName }} {{  employee.lastName }}</p>
                        <p class="employee-list__item-position">{{ employee.title }}</p>
                    </div>
                    <img :src="`https://via.placeholder.com/600/771796e`" alt="" class="employee-list__item-image">
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

.employee-list__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.employee-list__item {
    margin: 1.5rem;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    transition: box-shadow 0.2s ease-in-out;
}

.employee-list__item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.employee-list__item-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ddd;
    overflow: hidden;
}

.employee-list__item-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.employee-list__item-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.employee-list__item-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem 0 0.5rem;
    color: #333;
}

.employee-list__item-position {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    color: #666;
}

.employee-list__item-email {
    font-size: 1rem;
    margin: 0.5rem 0;
    color: #999;
}
</style>