<template>
    <div>
        <el-card v-if="!showProgress">
            <h2 class="widget-header">Top Customers by Total Purchase Value <el-button @click="showProgress = true">Show Bar</el-button> </h2>
            <el-table :data="customers" style="width: 100%">
                <el-table-column prop="FirstName" label="Customer First Name"></el-table-column>
                <el-table-column prop="LastName" label="Customer Last Name"></el-table-column>
                <el-table-column prop="TotalPurchaseValue" label="Total Purchase Value"></el-table-column>
                <el-table-column label="Chart">
                    <template slot-scope="scope">
                        <el-progress :percentage="getPercentage(scope.row)" :color="getColor(scope.row)" />
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card v-else>
            <h2 class="widget-header">Top Customers by Total Purchase Value <el-button @click="showProgress = false">Show Bar</el-button> </h2>
            <div class="chart-container">
                <Chart v-if="customers.length" :data="{ customers: customers, totalValue: totalValue, averageValue: averageValue }" />
            </div>
        </el-card>
    </div>
</template>

<script>
import api from '@/api.js'
import Chart from './Chart.vue'

export default {
    components: {
        Chart
    },
    data() {
        return {
            customers: [],
            showProgress: false
        }
    },
    mounted() {
        api.get('/customers/top-customers')
            .then(response => {
                this.customers = response.data.data;
            })
            .catch(error => {
                console.error(error);
            });
    },
    methods: {
        getPercentage(customer) {
            const percentage = (customer.TotalPurchaseValue / this.totalValue) * 100;
            return parseFloat(percentage.toFixed(2));
        },
        getColor(customer) {
            if (customer.TotalPurchaseValue  > this.averageValue) {
                return '#67c23a';
            } else {
                return '#f56c6c';
            }
        }
    },
    computed: {
        totalValue() {
            return this.customers.reduce((total, customer) => total + customer.TotalPurchaseValue, 0);
        },
        averageValue() {
            const avgValue = this.totalValue / this.customers.length;
            return avgValue.toFixed(2);
        },
    },
}    
</script>

<style scoped>
.widget-header {
    font-size: 24px;
    margin-bottom: 20px;
}

.chart-container {
    height: 300px;
}
</style>