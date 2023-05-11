<template>
    <div class="chart-container" v-if="data !== undefined">
        <h4>Average Value: {{ data.averageValue }}</h4>
        <div class="downloadImage" @click="export2image">
            <DownloadButton :name="chartName" :link="downloadPng"/>
        </div>
        <el-carousel :interval="25000" arrow="always" class="carouselBG">
            <el-carousel-item>
                <Bar ref="chart" :data="chartData" :options="chartOptions"/>
            </el-carousel-item>
            <el-carousel-item>
                <PolarArea ref="chart" :data="polarData" :options="polarOptions"/>
            </el-carousel-item>
            <el-carousel-item>
                <LineChartGenerator ref="chart" :data="lineData" :options="lineOptions"/>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { Bar, PolarArea, Line as LineChartGenerator } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, PolarAreaController, ArcElement, LineElement, PointElement } from 'chart.js'
import DownloadButton from '@/components/Download.vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, PolarAreaController, ArcElement, LineElement, PointElement )
    
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    components: { Bar, PolarArea, LineChartGenerator, DownloadButton },
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
                },
            },
            polarData: {
                labels: this.data.customers.map((c) => `${c.FirstName} ${c.LastName}`),
                datasets: [
                    {
                        label: 'Total Purchase Value',
                        backgroundColor: this.data.customers.map(
                            (c) =>
                                c.TotalPurchaseValue > this.data.averageValue
                                    ? 'rgba(179,181,198,0.2)'
                                    : 'rgba(255,99,132,0.2)'
                        ),
                        pointBackgroundColor: 'rgba(255,99,132,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255,99,132,1)',
                        hoverBackgroundColor: this.data.customers.map(
                            (c) =>
                                c.TotalPurchaseValue > this.data.averageValue
                                    ? 'rgba(179,181,198,0.9)'
                                    : 'rgba(255,99,132,0.9)'
                        ),
                        data: this.data.customers.map((c) =>
                            c.TotalPurchaseValue.toFixed(2)
                        ),
                    },
                ],
            },
            polarOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
            lineData: {
                labels: this.data.customers.map((c) => `${c.FirstName} ${c.LastName}`),
                datasets: [
                    {
                        label: 'Total Purchase Value',
                        backgroundColor: '#f87979',
                        data: this.data.customers.map((c) =>
                            c.TotalPurchaseValue.toFixed(2)
                        ),
                    },
                ],
            },
            lineOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },
    methods: {
        export2image() {
            let canvas = this.$refs.chart.$el.toDataURL('image/png')
            console.log(canvas)
            this.downloadPng = canvas
        }
    },
}
</script>

<style>
.carouselBG {
    background-color: #ffffffea;
}

.downloadImage {
    padding: 1rem;
}
</style>
