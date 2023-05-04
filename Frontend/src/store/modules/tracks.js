import api from '@/api.js';

const state = {
    tracks: [],
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalTracks: 0
};

const actions = {
    async fetchTracks({ commit }, { page, pageSize }) {
        try {
            const response = await api.get('/tracks', {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            });

            const tracks = response.data.data;
            const totalTracks = response.data.total;

            commit('setTracks', {
                tracks,
                page,
                pageSize,
                totalTracks
            });
        } catch (error) {
            console.error('Unable to retrieve tracks:', error);
            throw error;
        }
    },
    updateCurrentPage({ commit }, page) {
        commit('setCurrentPage', page);
    }
};
const mutations = {
    setTracks(state, { tracks, page, pageSize, totalTracks }) {
        state.tracks = tracks;
        state.currentPage = page;
        state.totalPages = Math.ceil(totalTracks / pageSize);
        state.pageSize = pageSize;
        state.totalTracks = totalTracks; 
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};