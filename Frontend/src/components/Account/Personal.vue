<template>
    <div class="user-form">
        <div class="user-form__header">
            <h2>User Information</h2>
        </div>
        <div class="user-form__content">
            <el-form label-width="80px" size="medium" :label-position="isMobile ? 'top' : 'left'">
                <el-row :gutter="24">
                    <el-col :xs="24" :sm="12" class="col_input">
                        <el-form-item label="First Name">
                            <el-input v-model="user.firstName" disabled :placeholder="user.firstName ? '' : 'NO DATA'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" class="col_input">
                        <el-form-item label="Last Name">
                            <el-input v-model="user.lastName" disabled :placeholder="user.lastName ? '' : 'NO DATA'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" class="col_input">
                        <el-form-item label="Phone">
                            <el-input v-model="user.phone" :placeholder="user.phone ? '' : 'NO DATA'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="16" class="col_input">
                        <el-form-item label="Email">
                            <el-input v-model="user.email" disabled :placeholder="user.email ? '' : 'NO DATA'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" class="col_input">
                        <el-form-item label="City">
                            <el-input v-model="user.city" :placeholder="user.city ? '' : 'NO DATA'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="6" class="col_input">
                        <el-form-item label="State">
                            <el-input v-model="user.state" :placeholder="user.state ? '' : 'NO DATA'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="6" class="col_input">
                        <el-form-item label="Country">
                            <el-input v-model="user.country" :placeholder="user.country ? '' : 'NO DATA'"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-divider></el-divider>

                <div class="user-form__section">
                    <h2>Company Information</h2>
                    <el-row :gutter="24">
                        <el-col :xs="24" :sm="16" class="col_input">
                            <el-form-item label="Company">
                                <el-input v-model="user.company" :placeholder="user.company ? '' : 'NO DATA'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="8" class="col_input">
                            <el-form-item label="Address">
                                <el-input v-model="user.address" :placeholder="user.address ? '' : 'NO DATA'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" class="col_input">
                            <el-form-item label="Postal Code">
                                <el-input v-model="user.postalCode" :placeholder="user.postalCode ? '' : 'NO DATA'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" class="col_input">
                            <el-form-item label="Fax">
                                <el-input v-model="user.fax" :placeholder="user.fax ? '' : 'NO DATA'"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            isMobile: false,
            form: {},
            isCustomer: false,
            isEmployee: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.form = this.user
            const user = this.$store.getters.isCustomerOrEmployee;
            this.isCustomer = user.isCustomer
            this.isEmployee = user.isEmployee

            if (document.documentElement.clientWidth < 768) {
                this.isMobile = true;
            }
            window.addEventListener('resize', () => {
            if (document.documentElement.clientWidth < 768) {
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
            });
        })
    },
    methods: {
        update() {
            const updatedData = {
                firstName: this.form.firstName,
                lastName: this.form.lastName,
                phone: this.form.phone,
                email: this.form.email,
                city: this.form.city,
                state: this.form.state,
                country: this.form.country,
                company: this.form.company,
                address: this.form.address,
                postalCode: this.form.postalCode,
                fax: this.form.fax
            }
        }
    }
}
</script>

<style scoped>
.user-form {
    margin: 0 auto;
    padding: 24px;
}
.user-form__header {
    margin-bottom: 24px;
}
.user-form__section {
    margin-top: 24px;
}
.card {
    padding: 50px;
    overflow: hidden;
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
</style>