import api from '@/api.js';
import VueCookies from 'vue-cookies'

const actions = {
    async signup({ commit }, { firstName, lastName, phone, email, password }) {
        let flag, message
        const form = {
            firstName, lastName, phone, email, password
        }
        try {
            const { data } = await api.post('/customers', {
                form
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
    async login({ commit }, { email, password }) {
        let bandera, message
        try {
            const { data } = await api.post('/auth/login', { email, password })
            if (data.bandera) {
                bandera = data.bandera
                message = data.message
                localStorage.setItem('isUserLoggedIn', true)
                return {
                    bandera,
                    message
                }
            } else {
                bandera = data.bandera
                message = data.message
                return {
                    bandera,
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
    async getUser({ commit, dispatch }) {
        try {
            const { token, expiresIn } = await dispatch('refreshToken')
            const { data } = await api.get("/dashboard", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            return data
        } catch (error) {
            console.log(error)
        }
    },
    async logout({ commit }) {
        try {
            await api.post("/auth/logout")
            localStorage.removeItem('isUserLoggedIn')
        } catch (error) {
            console.log(error)
        }
    }
}

export default {
    actions
};