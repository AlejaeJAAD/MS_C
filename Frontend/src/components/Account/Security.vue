<template>
    <div class="security-form">
        <div>
            <el-form size="medium">
                <el-row :gutter="24">
                    <el-col :xs="24" :sm="12" class="col_input">
                        <el-form-item prop="email" :rules="emailRules">
                            <el-input size="small" v-model="user.email" placeholder="Email address" disabled>
                                <i slot="prefix" class="el-input__icon el-icon-message"></i>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="12"></el-col>
                    <el-col :xs="24" :sm="8" class="col_input">
                        <el-form-item prop="oldPassword" :rules="passwordRules">
                            <el-input minlength="6" show-password size="small" v-model="oldPassword" type="password" placeholder="Old Password" >
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" class="col_input">
                        <el-form-item prop="newPassword" :rules="passwordRules">
                            <el-input minlength="6" show-password size="small" v-model="newPassword" type="password" placeholder="New Password" >
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" class="col_input">
                        <el-form-item prop="confirmPassword" :rules="passwordRules">
                            <el-input minlength="6" show-password size="small" v-model="confirmPassword" type="password" placeholder="Confirm Password" >
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editable: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            dialog: false,
            progress: false,
            error: '',
            showError: false,
            dialog: false,
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
    mounted() {
        this.$nextTick(() => {
            this.form = this.user
        })
    },
    methods: {
        ...mapActions(['changePassword']),
        async updatePassword() {
            try {
                if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
                    this.showError = true
                    this.error = 'Please add all the required information.'
                }

                if (this.newPassword === this.confirmPassword) {
                    this.progress = true

                    const form = {
                        email: this.user.email,
                        password: this.oldPassword,
                        newPassword: this.newPassword
                    }

                    const { message, flag } = await changePassword({ form })
                    console.log(message, flag)

                    this.dialog = true
    
                    setTimeout(() => {
                        this.progress = false
                        this.$router.push({
                            name: 'dashboard'
                        })
                    }, 1500)
                    
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
.security-form {
    margin: 0 auto;
    padding: 24px;
}
.col_input {
    margin-bottom: 24px;
}
::v-deep .el-input__inner {
    background-color: transparent !important;
    color: #ffd04b;
    border: none;
    border-bottom: 1px solid #ffd04b;
    border-right: 1px solid #ffd04b;
    text-align: center;
}
::v-deep .el-input.is-disabled .el-input__inner {
    color: rgba(255, 207, 75, 0.835);
    border-bottom: 1px solid #ffcf4b6f;
    border-right: 1px solid #ffcf4b6f;
}
::v-deep .el-input.is-disabled .el-input__inner::placeholder {
    color: rgba(255, 207, 75, 0.835);
}
::v-deep .el-input__inner::placeholder {
    color: #ffd04b;
}
::v-deep .el-form-item__error {
    color: #FFF;
    font-size: medium;
}

::v-deep .el-form-item.is-error .el-input__inner {
    border-bottom-color: #ffd04b;
}
</style>