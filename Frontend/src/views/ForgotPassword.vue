<template>
    <div class="forgot-password-container">
        <el-row class="forgot-password-row" v-if="!showMessage">
            <el-col :span="12">
                <el-card class="forgot-password-card">
                    <el-image :src="forgotPasswordSvg" class="forgot-password-image"/>
                    <h2 class="login-title">Forgot your password?</h2>
                    <h4>
                        Enter your email and we'll send you a link to reset you password.
                    </h4>
                    <el-row class="forgot-password-row">
                        <el-col :span="16">
                            <el-form ref="forgotPasswordForm" :model="form" label-position="top" class="forgot-password-form">
                                <el-form-item prop="email" :rules="emailRules">
                                    <el-input size="small" v-model="form.email" placeholder="Enter your email">
                                        <i slot="prefix" class="el-input__icon el-icon-message"></i>
                                    </el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                    <el-row class="forgot-password-row">
                        <el-col :span="16">
                            <el-button size="small" type="primary" :loading="loading" @click="handleForgotPassword" class="submit-button">Reset Password</el-button>
                        </el-col>
                    </el-row>
                    <el-button size="small" class="forgot-password-link" @click="handleLogin">
                        <i class="el-input__icon el-icon-arrow-left"></i>Back to Login
                    </el-button>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="forgot-password-row" v-else>
            <el-col :span="16">
                <el-card class="forgot-password-sent-card">
                    {{ message }}
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.forgot-password-container {
    margin: 0;
    background-image: url('wave06.svg');
    background-repeat: repeat-x;
    background-position: center center;
    background-size: cover;
    height: 100vh;
    opacity: 0.9;
}

.forgot-password-row {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.forgot-password-card {
    border: none;
    border-radius: 10px;
    padding: 40px;
    width: auto;
    background-color: transparent;
    color: #FFF;
    box-shadow: none;
    margin: 0 auto;
    text-align: center;
}

.forgot-password-sent-card {
    width: auto;
    background-color: transparent;
    color: #FFF;
    margin: 0 auto;
    text-align: center;
}

.forgot-password-form {
    width: 100%;
}

.forgot-password-link {
    text-align: center;
    margin-top: 20px;
    background-color: transparent;
    border-color: transparent;
    color: white;
}

.forgot-password-link:hover {
    border-color: white;
}

.forgot-password-image {
    width: 50%;
}

.submit-button {
    width: 100%;
    border-radius: 20px;
    border-color: #238fc5;
    background-color: #28afee;
    color: #FFF;
}

.submit-button:hover {
    color: #FFF;
    background-color: #2394c9;
}

.el-button--primary:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
}

::v-deep .el-input__inner {
    background-color: transparent !important;
    color: #FFF;
    border: none;
    border-bottom: 1px solid rgb(255, 255, 255);
    text-align: center;
}

::v-deep .el-input__inner::placeholder {
    color: #FFF;
}

::v-deep .el-form-item__error {
    color: #FFF;
    font-size: medium;
}

::v-deep .el-form-item.is-error .el-input__inner {
    border-bottom-color: white;
}


</style>

<script>
import { mapActions } from 'vuex'

const FORGOT_PASSWORD_TIMEOUT = 2000
const REDIRECT_TIMEOUT = 500

export default {
    data() {
        return {
            forgotPasswordSvg: require('./forgot-password.png'),
            loading: false,
            form: {
                    email: '',
            },
            emailRules: [
                { required: true, message: "Please enter your email address", trigger: "blur" },
                {
                    type: "email",
                    message: "Please enter a valid email address",
                    trigger: ["blur", "change"],
                },
            ],
            showMessage: false,
            message: '',
        };
    },
    methods: {
        ...mapActions(['forgotPassword']),
        async handleForgotPassword() {
            try {
                this.startLoading()

                if (!this.form.email) {
                    this.showError('Please add your email to request the reset token.') 
                } else {
                    const { message, flag } = await this.forgotPassword({
                        email: this.form.email
                    })

                    if (flag == false) {
                        this.showError(message)
                    } else {
                        this.showSuccessMessage('Please chek your email for the restore password link.')
                    }
                }
            } catch (error) {
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
        },
        showError(message) {
            this.showMessage = true
            this.message = message
            setTimeout(() => {
                this.showMessage = false
            }, FORGOT_PASSWORD_TIMEOUT)
        },
        showSuccessMessage(message) {
            this.showMessage = true
            this.message = message
        },
        async handleLogin() {
            this.$router.push("/login")
        }
    },
};
</script>
