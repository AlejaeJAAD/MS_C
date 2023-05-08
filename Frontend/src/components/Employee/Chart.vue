<template>
    <div class="chart-container" v-if="data !== undefined">
        <h4>Average Value: {{ data.averageValue }}</h4>
        <div @click="export2image">
            <DownloadButton :name="chartName" :link="downloadPng"/>
        </div>
        <!-- <div @click="export2image" class="btn btn-default">
            <i class="fa fa-download"></i>
            <span class="hidden-xs hidden-sm ml5">Download</span>
        </div> -->
        <Bar ref="chart" :data="chartData" :options="chartOptions"/>
    </div>
</template>

<script>
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    import DownloadButton from '@/components/Download.vue'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    components: { Bar, DownloadButton },
    data() {
        return {
            downloadPng: null,
            chartName: 'Top Customers by Total Purchase Value',
            chartData: {
                labels: this.data.customers.map((c) => `${c.FirstName} ${c.LastName}`),
                datasets: [
                    {
                        label: 'Total Purchase Value',
                        backgroundColor: this.data.customers.map(
                            (c) =>
                                c.TotalPurchaseValue > this.data.averageValue
                                    ? '#67c23a'
                                    : '#f56c6c'
                        ),
                        hoverBackgroundColor: this.data.customers.map(
                            (c) =>
                                c.TotalPurchaseValue > this.data.averageValue
                                    ? '#57a33e'
                                    : '#e15353'
                        ),
                        data: this.data.customers.map((c) =>
                            c.TotalPurchaseValue.toFixed(2)
                        ),
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Total Purchase Value by Customer',
                    fontSize: 20,
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Customer Name',
                            font: {
                                size: 16
                            }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total Purchase Value ($)',
                            font: {
                                size: 16
                            }
                        },
                        ticks: {
                            beginAtZero: true
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            },
        };
    },
    methods: {
        export2image() {
            let canvas = this.$refs.chart.$el.toDataURL('image/png')
            this.downloadPng = canvas
        }
    },
}
</script>

<style>
.chart-container {
    margin: 30px;
}
</style>
