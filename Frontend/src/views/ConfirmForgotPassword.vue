<template>
    <div>
        <el-row v-if="!jwtExpired">
            <el-col>
                <el-card>
                    <el-form ref="form" :model="form" label-position="top" label-width="0">
                        <el-form-item prop="email" :rules="emailRules">
                            <el-input size="small" v-model="form.email" placeholder="Email address" >
                                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" :rules="passwordRules">
                            <el-input size="small" v-model="form.password" type="password" placeholder="Password" >
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="confirmPassword" :rules="confirmPasswordRules">
                            <el-input size="small" v-model="form.confirmPassword" type="password" placeholder="Confirm Password" >
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" class="login-button" type="primary" :loading="loading" @click="restorePassword">Restore Password</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col v-if="showMessage">
                <el-card>
                    {{ sucessMessage }}
                </el-card>
            </el-col>
        </el-row>
        <el-row v-else>
            <el-col>
                <el-card>
                    {{  errorMessage }}
                    <el-button>Reset password</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            jwtExpired: false,
            token: '',
            form: {
                email: '',
                password: '',
                confirmPassword: ''
            },
            loading: false,
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
                    "Password must be at least 8 characters long and contain at least one letter and one number",
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
            showMessage: false,
            sucessMessage: '',
            errorMessage: ''
        }
    },
    created() {
            this.token = this.$route.params.token
    },
    methods: {
        async restorePassword() {
            try {
                await this.$refs.form.validate();
                this.loading = true;
                const result = await this.$store.dispatch('confirmForgotPassword', { token: this.token, form: this.form })
                console.log(result)

                if (result.data.flag) {
                    this.sucessMessage = result.data.message
                    this.showMessage = true
                    setTimeout(() => {
                        this.$router.push({ name: "login" });
                    }, 2000);
                } else {
                    this.jwtExpired = true
                    this.errorMessage = result.data.message
                    
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    // Maybe add some function where we send an email to the user with a message telling him that the password was successfully changed.
}
</script>

<style lang="scss" scoped>

</style>