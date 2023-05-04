<template>
    <div>
        <Nav style="margin-bottom: -3.7rem;"></Nav>
        <div class="track-list">
            <el-row class="track-list__row" :gutter="20" style="margin-top: 4.5rem">
                <el-col class="track-list__col" :span="5" v-for="track in visibleTracks" :key="track.id">
                    <el-card class="track-list__card">
                        <p>{{ track.name }}</p>
                        <p>{{ track.composer }}</p>
                        <el-button type="info" plain size="mini" @click="goToSongDetails(track.id)">
                            Details
                        </el-button>
                    </el-card>
                </el-col>
            </el-row>
            <el-row v-if="totalPages > 0">
                <el-col style="margin-top: 15px; margin-bottom: 15px">
                    <el-pagination
                        :current-page="currentPage"
                        :page-size="pageSize"
                        :total="totalTracks"
                        :page-count="totalPages"
                        @current-change="onPageChange"
                        layout="prev, pager, next"
                        class="pagination"
                    ></el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Global/Nav.vue'
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Tracks',
    components: {
        Nav
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState('tracks', ['tracks', 'currentPage', 'totalPages', 'pageSize', 'totalTracks']),
        visibleTracks() {
            return this.tracks || []
        }
    },
    methods: {
        ...mapActions('tracks', ['fetchTracks']),
        onPageChange(page) {
            this.fetchTracks({ page, pageSize: this.        pageSize });
        },
        goToSongDetails(id) {
            console.log('goToSongDetails called with id:', id);
            this.$router.push({ name: 'song-details', params: { id } });
        }
    },
    mounted() {
        this.fetchTracks({
            page: this.currentPage,
            pageSize: this.pageSize
        });
    },
};
</script>

<style>
body {
    margin: 0;
}
.track-list {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    height: auto;
    background-color: rgba(0, 0, 0, 1); /* semi-transparent black */
}

.track-list__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 -25px;
    align-items: stretch;
}

.track-list__col {
    padding: 0 25px;
    margin-bottom: 20px;
    margin-top: 10px;
}

.track-list__card {
    border-color: #1a1a1a;
    background-color: #1a1a1a;
    color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
}

.track-list__card:hover {
    box-shadow: 0 1px 4px rgba(255, 255, 255, 0.701);
}

.track-list__card p {
    margin: 1rem;
    text-align: center;
}

/* .el-pagination .number:not(.active) { */
.el-pagination .number {
    background-color: #1a1a1a;
    color: #ffffff;
}

.el-pagination .number:hover {
    background-color: #1a1a1a;
    color: rgba(255, 255, 255, 0.416);
}

.el-pagination .btn-quicknext,
.el-pagination .btn-quickprev,
.el-pagination .btn-prev,
.el-pagination .btn-next {
    background-color: #1a1a1a;
    color: #ffffff;
}

.el-pagination .btn-quicknext:hover,
.el-pagination .btn-quickprev:hover,
.el-pagination .btn-prev:hover,
.el-pagination .btn-next:hover {
    background-color: #1a1a1a;
    color: rgba(255, 255, 255, 0.416);
}

.el-pagination .number.active {
    background-color: rgba(255, 255, 255, 0.416);
    color: #fff;
}

.el-pagination button:first-child:not(.active) {
    background-color: #1a1a1a;
    border-color: rgba(227, 0, 0, 0.5);
    color: #fff;
}

.el-pagination button:last-child:not(.active) {
    background-color: #1a1a1a;
    border-color: rgba(227, 0, 0, 0.5);
    color: #fff;
}


</style>