<template>
  <div class="dashboard-container">
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-menu-item class="expand-collapse" @click="isCollapse = !isCollapse">
        <i class="el-icon-s-fold" v-if="!isCollapse"></i>
        <i class="el-icon-s-unfold" v-else></i>
      </el-menu-item>

      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">Dashboard</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">Customer</span>
        </template>
        <el-menu-item-group title="Account">
          <el-menu-item index="2-1">Profile</el-menu-item>
          <el-menu-item index="2-2">Restore Password</el-menu-item>
          <el-menu-item index="2-3">Forgot Password</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    <el-card class="card">
      <div v-if="userLogout" class="message-card logout">
        <i class="el-icon-circle-check"></i>
        Closing session...
      </div>
      <div v-if="loadingData" class="message-card loading">
        <i class="el-icon-loading"></i>
        Loading data...
      </div>
      <div v-if="loadedData" class="content-card">
        <h1 class="header">Protected route</h1>
        <div class="user-info">
          <div class="user-profile-widget">
            <div class="user-info">
              <h3 class="user-name">{{ user.firstName }} {{ user.lastName }}</h3>
              <div class="contact-info">
                <span class="email">{{ user.email }}</span>
              </div>
              <div class="profile-buttons">
                <el-button class="edit-profile-button" @click="editProfile">Edit Profile</el-button>
                <el-button class="reset-password-button" @click="resetPassword">Reset Password</el-button>
                <el-button class="logout-button" @click="logout">Logout</el-button>
              </div>
            </div>
          </div>
        </div>

        <el-collapse accordion>
          <el-collapse-item name="1">
            <template slot="title">
              Sales<i class="header-icon el-icon-information"></i>
            </template>
            <Sales />
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  margin: 5px;
  padding: 0px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
}
.dashboard-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.card {
  flex-grow: 1;
  margin: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}
.sidebar {
  margin: 5px;
  padding: 0px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.expand-collapse {
  cursor: pointer;
}

.message-card {
display: flex;
justify-content: center;
align-items: center;
height: 200px;
font-size: 24px;
color: #fff;
border-radius: 8px;
}
.loading {
background-color: #007aff;
}
.logout {
background-color: #28a745;
}

.header {
font-size: 24px;
font-weight: bold;
margin-bottom: 20px;
}
.user-info {
margin-bottom: 10px;
}
.name {
font-weight: bold;
}
.email {
color: #aaa;
}

.user-profile-widget {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.contact-info a {
  display: flex;
  align-items: center;
  color: #007aff;
  margin-bottom: 5px;
  text-decoration: none;
}

.contact-info a i {
  margin-right: 5px;
}

.profile-buttons {
  display: flex;
}

.edit-profile-button, .reset-password-button, .logout-button {
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.reset-password-button {
  background-color: #28a745;
}

.logout-button {
  background-color: #ff6347;
}
</style>

<script>
import Sales from '../components/Employee/Sales.vue'
export default {
  components: {
    Sales
  },
  data() {
    return {
      isCollapse: false,
      userLogout: false,
      loadingData: true,
      loadedData: false,
      }
  },
  async mounted() {
    if (this.user) {
      this.loadingData = false
      this.loadedData = true
    }
  },
  computed: {
    user() {
      const user = this.$store.getters.getUser;
      return user || {};
    }
  },
  methods: {
    logout() {
        try {
            this.userLogout = true
            this.loadedData = false
            this.$store.dispatch('logout')
            setTimeout(() => {
                this.userLogout = false
                this.$router.push("/login")
            }, 1500);
        } catch (error) {
            console.log(error)
        }
    },
    editProfile() {
    },
    resetPassword() {
    },
    toggleSidebar() {
      this.collapse = !this.collapse;
    },
  },
}
</script>