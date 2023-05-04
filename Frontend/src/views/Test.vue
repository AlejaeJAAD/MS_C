<template>
    <div class="signup-container">
        <el-row class="signup-row">
            <el-col :xs="24" :sm="12">
                <el-card class="signup-card" shadow="hover">
                    <h2 class="signup-title">Create an account</h2>
                    <el-form ref="form" :model="form" label-position="top" label-width="0">
                        <el-form-item prop="email">
                            <el-input v-model="form.email" placeholder="Email address" class="signup-card-input" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="form.password" type="password" placeholder="Password" class="signup-card-input" />
                        </el-form-item>
                        <el-form-item prop="confirmPassword">
                            <el-input v-model="form.confirmPassword" type="password" placeholder="Confirm Password" class="signup-card-input" />
                        </el-form-item>
                        <el-form-item class="signup-form-actions">
                            <el-button class="signup-button" type="primary" :loading="loading" @click="handleSignup">Sign Up</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="signup-card-footer">
                        <span style="font-size: 14px; margin-right: 5px;">Already have an account?</span>
                        <router-link to="/login" class="login-link">Log in here.</router-link>
                    </div>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="12">
                <el-card class="signup-card" shadow="hover">
                    <h2 class="signup-title">Something</h2>
                    <el-form ref="form" :model="form" label-position="top" label-width="0">
                        <el-form-item prop="email">
                            <el-input v-model="form.email" placeholder="Email address" class="signup-card-input" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="form.password" type="password" placeholder="Password" class="signup-card-input" />
                        </el-form-item>
                        <el-form-item prop="confirmPassword">
                            <el-input v-model="form.confirmPassword" type="password" placeholder="Confirm Password" class="signup-card-input" />
                        </el-form-item>
                        <el-form-item class="signup-form-actions">
                            <el-button class="signup-button" type="primary" :loading="loading" @click="handleSignup">Sign Up</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="signup-card-footer">
                        <span style="font-size: 14px; margin-right: 5px;">Already have an account?</span>
                        <router-link to="/login" class="login-link">Log in here.</router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            error: null,
            form: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            loading: false
        }
    },
    methods: {
        ...mapActions(['handleSignup']),
        async handleSignup() {
            try {
                this.loading = true
        
                await this.$store.dispatch('signup', {
                    email: this.form.email,
                    password: this.form.password,
                    confirmPassword: this.form.confirmPassword
                })
        
                setTimeout(() => {
                    this.loading = false
                    this.$router.push('/dashboard')
                }, 1000);
            } catch (error) {
                console.log(error)
                this.error = error.response.data.message
            }
        }
    }
}
</script>

<style scoped>
.signup-container {
    height: 100vh;
}

.signup-row {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signup-card {
    margin: 0;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    max-width: 100%;
    width: 100%;
    background-color: #fff;
}

.signup-title {
    margin-top: 0;
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: bold;
    color: #409EFF;
    text-align: center;
}

.signup-form {
width: 80%;
max-width: 600px;
background-color: #fff;
padding: 30px;
border-radius: 10px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.signup-card-input {
    margin-bottom: 20px;
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
    color: #999;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 14px;
}

.form-control {
margin-bottom: 20px;
}

.form-control label {
display: block;
font-size: 1.2rem;
font-weight: 600;
margin-bottom: 5px;
}

.form-control input[type="text"],
.form-control input[type="email"],
.form-control input[type="password"] {
width: 100%;
font-size: 1.2rem;
padding: 10px;
border: none;
border-bottom: 2px solid #ccc;
outline: none;
}

.form-control input[type="submit"] {
background-color: #007bff;
color: #fff;
font-size: 1.2rem;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease;
}

.form-control input[type="submit"]:hover {
background-color: #0069d9;
}

.signup-form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0px;
}

.signup-button {
    width: 325px;
    margin: 0px;
}
</style>
