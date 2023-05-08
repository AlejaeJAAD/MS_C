<template>
  <div class="dashboard-container">
    <div class="sidebar-menu">
      <div class="menu-header">
        <i class="el-icon-menu"></i>
        <span class="menu-title">Dashboard</span>
      </div>
      <el-menu :default-active="$route.path" class="menu-items">
        <el-menu-item index="/dashboard">
          <i class="el-icon-s-home"></i>
          <span slot="title">Home</span>
        </el-menu-item>
        <el-submenu index="users">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>Users</span>
          </template>
          <el-menu-item index="/dashboard/users">
            <i class="el-icon-s-custom"></i>
            <span slot="title">All Users</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/users/new">
            <i class="el-icon-plus"></i>
            <span slot="title">New User</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="settings">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>Settings</span>
          </template>
          <el-menu-item index="/dashboard/settings/general">
            <i class="el-icon-s-tools"></i>
            <span slot="title">General</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/settings/security">
            <i class="el-icon-s-check"></i>
            <span slot="title">Security</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
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
        <div v-for="currentUser in user" class="user-info">
          <div class="user-profile-widget">
            <div class="user-info">
              <h3 class="user-name">{{ currentUser.firstName }} {{ currentUser.lastName }}</h3>
              <div class="contact-info">
              </div>
              <div class="profile-buttons">
                <el-button class="edit-profile-button" @click="editProfile">Edit Profile</el-button>
                <el-button class="reset-password-button" @click="resetPassword">Reset Password</el-button>
                <el-button class="logout-button" @click="logout">Logout</el-button>
              </div>
            </div>
          </div>
        </div>

        <Sales />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.sidebar-menu {
width: 250px;
height: 100%;
background-color: #fff;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 20px;
}
.menu-header {
display: flex;
flex-direction: row;
align-items: center;
margin-bottom: 20px;
}
.menu-title {
font-size: 18px;
font-weight: bold;
margin-left: 10px;
}
.menu-items {
flex-grow: 1;
}
.card {
flex-grow: 1;
margin: 20px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
overflow: hidden;
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
.content-card {
  padding: 20px;
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

.profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.user-title {
  color: #aaa;
  margin: 5px 0;
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
          user: '',
          cookieValue: '',
          userLogout: false,
          loadingData: true,
          loadedData: false,
      }
  },
  async mounted() {
      this.user = await this.$store.dispatch('getUser');
      setTimeout(() => {
          this.loadingData = false
          this.loadedData = true
      }, 1000);
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
        // navigate to edit profile page
      },
      resetPassword() {
        // navigate to reset password page
      },
  },
}
</script>