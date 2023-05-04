<template>
    <div class="signup-container">
        <el-row class="signup-row" v-if=!showMessageError>
            <el-col>
                <el-row>
                    <el-col :span="12" >
                        <el-card class="signup-card-left" shadow="hover">
                            <el-row>
                                <el-col :span="22" class="welcome-text">
                                    <h2 class="signup-title-01">Welcome Customer</h2>
                                    <h3 class="signup-subtitle-01">
                                        To keep connected with us please login in with your credentials
                                    </h3>
                                    <el-form ref="form" :model="form" label-position="top" label-width="0">
                                        <el-form-item class="signup-form-actions">
                                            <el-button size="small" class="login-button" @click="redirectToLogin">SIGN IN</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="signup-card-right" shadow="hover">
                            <h2 class="signup-title-02">Create an account</h2>
                            <el-form ref="form" :model="form" label-position="top" label-width="0">
                                <el-form-item prop="firstName" style="margin-bottom: 12px" :rules="firstNameRules">
                                    <el-input size="small" v-model="form.firstName" placeholder="Firstname">
                                        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="lastName" style="margin-bottom: 12px" :rules="lastNameRules">
                                    <el-input size="small" v-model="form.lastName" placeholder="Lastname">
                                        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="phone" style="margin-bottom: 12px">
                                    <el-input size="small" v-model="form.phone" type="number" placeholder="Phone">
                                        <i slot="prefix" class="el-input__icon el-icon-phone"></i>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="email" style="margin-bottom: 12px" :rules="emailRules">
                                    <el-input size="small" v-model="form.email" placeholder="Email">
                                        <i slot="prefix" class="el-input__icon el-icon-message"></i>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="password" style="margin-bottom: 12px" :rules="passwordRules">
                                    <el-input size="small" v-model="form.password" type="password" placeholder="Password">
                                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="confirmPassword" style="margin-bottom: 12px" :rules="confirmPasswordRules">
                                    <el-input size="small" v-model="form.confirmPassword" type="password" placeholder="Confirm password">
                                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                                    </el-input>
                                </el-form-item>
                                <el-form-item class="signup-form-actions">
                                    <el-button size="small" class="signup-button" :loading="loading" @click="handleSignup">SIGN UP</el-button>
                                </el-form-item>
                            </el-form>
                            <!-- <div class="signup-card-footer">
                                <span style="font-size: 15px; margin: 5px;">Already have an account?</span>
                                <router-link to="/login" class="login-link">Log in here.</router-link>
                            </div> -->
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row v-else>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card class="error-card" shadow="hover">
                    {{ errorMessage }}
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.main-card {
    background-color: transparent;
}

.signup-container {
    height: 100vh;
    background-image: url('wave02.svg');
    background-repeat: repeat-x; /* or repeat-y or no-repeat, depending on the wave pattern */
    background-position: center center;
    background-size: cover; /* or contain or auto, depending on the wave pattern */
    display: flex;
    justify-content: center;
    align-items: center;

}

.signup-row {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch; /* Added this line */
    width: 100%;
    max-width: 1000px; /* adjust as needed */
}

.error-card {
    margin: 0;
    background-image: url('wave03.svg');
    background-repeat: repeat-x; /* or repeat-y or no-repeat, depending on the wave pattern */
    background-position: center center;
    background-size: cover; /* or contain or auto, depending on the wave pattern */
    border-color: #409EFF;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 100%;
    background-color: #FFF;
    color: #FFF;
    text-align: center;
}

.signup-card-right {
    background-color: #FFF;
    height: 505px;
    margin: 0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.signup-card-left {
    /* background: #409EFF; */
    background-image: url('wave03.svg');
    background-repeat: repeat-x; /* or repeat-y or no-repeat, depending on the wave pattern */
    background-position: center center;
    background-size: cover; /* or contain or auto, depending on the wave pattern */
    border-color: #409EFF;
    height: 445px;
    margin: 0;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.signup-title-01 {
    margin-top: 0;
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
}

.signup-subtitle-01 {
    margin-top: 0;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 300;
    color: #ffffff;
    text-align: center;
}

.signup-title-02 {
    margin-top: 0;
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: bold;
    color: #409EFF;
    text-align: center;
}

.signup-card-footer {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #999;
}

.signup-card-footer::before,
.signup-card-footer::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #999;
}

.login-link {
    color: #409EFF;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 14px;
}

.login-link:hover {
    color: #999;
}

.signup-form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
}

.signup-button {
    width: auto;
    margin: 0px;
    border: 1px solid #409EFF;
    border-radius: 20px;
    color: #409EFF;
}

.signup-button:hover {
    background-color: #409EFF;
    color: #FFF;
}

.login-button {
    background-color: #409EFF;
    width: auto;
    margin: 0px;
    border: 1px solid #FFF;
    border-radius: 20px;
    color: #FFF;
}

.login-button:hover {
    background-color: #FFF;
    color: #409EFF;
}

.welcome-text {
    margin-top: 7rem;
}
</style>

<script>
import { mapActions } from 'vuex'

const SIGNUP_TIMEOUT = 2000

export default {
    data() {
        return {
            error: null,
            form: {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: '',
                // company: '',
                // address: '',
                // country: '',
                // state: '',
                // city: '',
                // postalCode: '',
                // fax: '',
            },
            loading: false,
            showMessageError: false,
            errorMessage: '',
            firstNameRules: [
                { required: true, message: "Enter a valid first name", trigger: "blur" },
                    {
                    pattern: /^[A-Za-z ]{2,}$/,
                    message:
                        "Value must be at least 4 characters long, only letters.",
                    trigger: ["blur", "change"],
                },
            ],
            lastNameRules: [
                { required: true, message: "Enter a valid last name", trigger: "blur" },
                    {
                    pattern: /^[A-Za-z ]{2,}$/,
                    message:
                        "Value must be at least 4 characters long, only letters.",
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
            passwordRules: [
                { required: true, message: "Please enter your password", trigger: "blur" },
                {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                    "Password must be at least 6 characters long and contain at least one letter and one number",
                trigger: ["blur", "change"],
                },
            ],
            confirmPasswordRules: [
                { required: true, message: "Please confirm your password", trigger: "blur" },
                {
                validator: (rule, value, callback) => {
                    if (value !== this.form.password) {
                        callback(new Error("The two passwords do not match"));
                    } else {
                        callback();
                    }
                },
                trigger: ["blur", "change"],
                },
            ],
        }
    },
    methods: {
        ...mapActions(['signup']),
        async handleSignup() {
            try {
                this.startLoading()

                const { firstName, lastName, phone, email, password, confirmPassword } = this.form;

                if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
                    this.showError(`You didn't provide values for the inputs.`)
                } else {
                    const { flag, message } = await this.signup({
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        email: email,
                        password: password
                    })

                    if (flag) {
                        setTimeout(() => {
                            // Add some dialog showing the successfully customer register before we send the user to the login page.
                            this.redirectToLogin()
                        }, 3000);
                    } else {
                        this.showMessageError = true
                        this.errorMessage = message
                    }
                }
        
            } catch (error) {
                console.log(error)
                this.error = error.response.data.message
            } finally {
                this.stopLoading()
            }
        },
        startLoading() {
            this.loading = true
        },
        stopLoading() {
            this.loading = false
            this.form.firstName = ''
            this.form.lastName = ''
            this.form.phone = ''
            this.form.email = ''
            this.form.password = ''
            this.form.confirmPassword = ''
        },
        showError(message) {
            this.showMessageError = true
            this.errorMessage = message
            setTimeout(() => {
                this.showMessageError = false
            }, SIGNUP_TIMEOUT)
        },
        redirectToLogin() {
            this.$router.push('/login')
        },
    }
}
</script>