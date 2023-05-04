import api from '@/api.js';

const state = {
    employees: [],
};

const getters = {
    employees: (state) => state.employees,
};

const actions = {
    async fetchEmployees({ commit }) {
        try {
            const response = await api.get('/employees');
            commit('setEmployees', response.data.data);
        } catch (error) {
            console.error(error);
        }
    },
};

const mutations = {
    setEmployees(state, employees) {
        state.employees = employees;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
