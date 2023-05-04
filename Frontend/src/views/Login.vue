<template>
    <div class="login-container">
        <el-row class="login-row" v-if=!showMessageError>
            <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
                <el-card class="login-card" shadow="hover">
                    <h2 class="login-title">Log in to your account</h2>
                    <el-form ref="form" :model="form" label-position="top" label-width="0" id="my-form">
                        <el-form-item prop="email" :rules="emailRules">
                            <el-input size="small" v-model="form.email" placeholder="Email address" >
                                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" :rules="passwordRules">
                            <el-input minlength="6" show-password size="small" v-model="form.password" type="password" placeholder="Password" >
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item class="login-form-actions login-button-container">
                            <el-button size="small" class="login-button" type="primary" :loading="loading" @click="handleLogin">Log In</el-button>
                            <div class="forgot-password-container">
                                <!-- <router-link to="/forgot-password" class="forgot-password-link">Forgot password?</router-link> -->
                                <el-button size="small" class="forgot-password-button" type="text" @click="handleForgotPassword">
                                    <i class="el-icon-key"></i> Forgot password?
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div class="login-card-footer">
                        <span style="font-size: 14px; margin-right: 5px; margin-left: 10px;">Don't have an account?</span>
                        <!-- <router-link to="/signup" class="signup-link">Register here.</router-link> -->
                        <el-button size="small" class="register-button" type="primary" @click="handleSignup">Register here.</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="login-row" v-else>
            <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
                <el-card class="error-card" shadow="hover">
                    {{ errorMessage }}
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.login-container {
    /* background-color: #1b1c1d; */
    margin: 0;
    background-image: url('wave05.svg');
    background-repeat: repeat-x; /* or repeat-y or no-repeat, depending on the wave pattern */
    background-position: center center;
    background-size: cover; /* or contain or auto, depending on the wave pattern */
    height: 100vh;
    opacity: 0.9;
}

.login-button-container {
    margin: 0 auto;
    padding: 2rem;
}

.login-row {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-card {
    margin: 0;
    background-image: url('wave04.svg');
    background-repeat: repeat-x; /* or repeat-y or no-repeat, depending on the wave pattern */
    background-position: center center;
    background-size: cover; /* or contain or auto, depending on the wave pattern */
    border-color: #409EFF;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    max-width: 400px;
    width: 100%;
    background-color: #FFF;
}

.error-card {
    margin: 0;
    background-image: url('wave04.svg');
    background-repeat: repeat-x; /* or repeat-y or no-repeat, depending on the wave pattern */
    background-position: center center;
    background-size: cover; /* or contain or auto, depending on the wave pattern */
    border-color: #409EFF;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    max-width: 400px;
    width: 100%;
    background-color: #FFF;
    color: #FFF;
    text-align: center;
}

.login-title {
    margin-top: 0;
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
}

.login-form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.login-button {
    width: 100%;
    margin: 0px;
    border: none;
    background-color: #008CBA;
    color: #FFF;
    border-radius: 20px;
}

.login-button:hover {
    background-color: #006A8E;
    color: #FFF;
}

.el-button--primary:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
}

.register-button {
    width: auto;
    margin: 0px;
    border: none;
    background-color: #008CBA;
    color: #FFF;
    border-radius: 20px;
}

.register-button:hover {
    background-color: #006A8E;
    color: #FFF;
}


.forgot-password-button {
    font-size: 14px;
    color: #409EFF;
}

.forgot-password-button:hover {
    color: #FFF;
}

.login-card-footer {
    margin-top: 16px;
    margin-bottom: -30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #FFF;
}

.login-card-footer::before,
.login-card-footer::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #999;
}

.signup-link {
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 14px;
}

.signup-link:hover {
    color: #409EFF;
}

#my-form .el-form-item__error {
    color: blue !important;
}
</style>

<script>
import { mapActions } from 'vuex'

const LOGIN_TIMEOUT = 2000
const REDIRECT_TIMEOUT = 500

export default {
    data() {
        return {
            error: null,
            form: {
                email: '',
                password: ''
            },
            loading: false,
            showMessageError: false,
            errorMessage: '',
            passwordRules: [
                { required: true, message: "Please enter your password", trigger: "blur" },
                {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                    "Password must be at least 6 characters long and contain at least one letter and one number",
                trigger: ["blur", "change"],
                },
            ],
            emailRules: [
                { required: true, message: "Please enter your email address", trigger: "blur" },
                {
                    type: "email",
                    message: "Please enter a valid email address",
                    trigger: ["blur", "change"],
                },
            ],
        }
    },
    methods: {
        ...mapActions(['login']),
        async handleLogin() {
            try {
                this.startLoading()

                if (!this.form.email || !this.form.password) {
                    this.showError('Please add the email or password to log in.') 
                } else {
                    const { bandera, message } = await this.login({ email: this.form.email, password: this.form.password })

                    if (bandera == false) {
                        this.showError(message)
                    } else {
                        this.redirectToDashboard()
                    }
                }
            } catch (error) {
                console.log(error)
                this.showError(error.response.data.message)
            } finally {
                this.stopLoading()
            }
        },
        startLoading() {
            this.loading = true
        },
        stopLoading() {
            this.loading = false
            this.form.email = ''
            this.form.password = ''
        },
        showError(message) {
            this.showMessageError = true
            this.errorMessage = message
            setTimeout(() => {
                this.showMessageError = false
            }, LOGIN_TIMEOUT)
        },
        redirectToDashboard() {
            this.$router.push('/dashboard')
        },
        handleSignup() {
            this.$router.push('/signup')
        },
        handleForgotPassword() {
            this.$router.push('/forgot-password')
        }
    },
}
</script>
