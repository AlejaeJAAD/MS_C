import api from '@/api.js';
import VueCookies from 'vue-cookies'

const state = {
    user: [],
    isUserLoggedIn: false,
    isCustomer: false,
    isEmployee: false
}

const getters = {
    getUser(state) {
        return state.user
    },
    isUserLoggedIn(state) {
        return state.isUserLoggedIn
    },
    isCustomerOrEmployee(state) {
        return {
            isCustomer: state.isCustomer,
            isEmployee: state.isEmployee
        }
    }
}

const mutations = {
    setUserData(state, data) {
        state.user = data;
    },
    setIsLoggedIn(state, isUserLoggedIn) {
        state.isUserLoggedIn = isUserLoggedIn;
    },
    setIsCustomer(state, isCustomer) {
        state.isCustomer = isCustomer;
    },
    setIsEmployee(state, isEmployee) {
        state.isEmployee = isEmployee
    }
}

const actions = {
    async signup({ commit }, { firstName, lastName, phone, email, password, option }) {
        let flag, message
        const form = {
            firstName, lastName, phone, email, password
        }
        try {
            const { data } = await api.post('/auth/register', {
                form,
                option
            })
            
            if (data.flag) {
                flag = data.flag
                message = data.message
            }

            return {
                flag,
                message
            }
        } catch (error) {
            console.log(error)
        }
    },
    async login({ commit, dispatch }, { email, password }) {
        let flag, message
        try {
            const { data } = await api.post('/auth/login', { email, password })
            if (data.flag) {
                flag = data.flag
                message = data.message
                commit('setIsLoggedIn', true);
                await dispatch('setUserData');
                return {
                    flag,
                    message
                }
            } else {
                flag = data.flag
                message = data.message
                return {
                    flag,
                    message
                }
            }
        } catch (error) {
            // Check if error response contains a message
            if (error.response && error.response.data && error.response.data.message) {
                console.log(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    },
    async forgotPassword({ commit }, { email }) {
        try {
            const { data } = await api.post('/auth/forgot-password', { email })
            const { message, flag, info, test } = data
            return {
                message, flag, info, test
            }
            
        } catch (error) {
            return error
        }
    },
    async confirmForgotPassword({ commit }, { token, form }) {
        let flag = false
        try {
            const result = await api.post(`/auth/confirm-forgot-password?token=${token}`, {
                form
            })
            return result
        } catch (error) {
            return flag
        }
    },
    async refreshToken({ state, commit }) {
        const refreshToken = VueCookies.get('refreshToken')
        if (!refreshToken) {
            return
        }

        try {
            const { data } = await api.get("/auth/refreshToken")
            const { token, expiresIn } = data
            return { token, expiresIn }
        } catch (error) {
            console.log(error)
        }
    },
    async setUserData({ commit, dispatch }) {
        try {
            const { token, expiresIn } = await dispatch('refreshToken')
            const { data } = await api.get("/auth/getUserData", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            commit("setUserData", data.fullInfo);
            commit('setIsCustomer', data.isCustomer)
            commit('setIsEmployee', data.isEmployee)
        } catch (error) {
            console.log(error)
        }
    },
    async changePassword({ commit, dispatch }, { form }) {
        const { token, expiresIn } = await dispatch('refreshToken')
        const { data } = await api.put("/auth/change-password", { form }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return data
    },
    async logout({ commit }) {
        try {
            await api.post("/auth/logout")
            commit('setIsLoggedIn', false);
        } catch (error) {
            console.log(error)
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
