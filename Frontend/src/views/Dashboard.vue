<template>
  <div class="dashboard-container">
    <Nav />
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
        <div>
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

        <el-card class="collapse_card">
          <el-collapse accordion>
            <el-collapse-item name="1">
              <template slot="title">
                Sales<i class="header-icon el-icon-information"></i>
              </template>
              <Sales />
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.collapse_card {
  background-color: transparent;
  opacity: 0.9;
}
.dashboard-container {
  display: flex;
  flex-direction: row;
}
.card {
  flex-grow: 1;
  margin: 5px;
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
import Nav from '../components/Global/Nav.vue'
import Sales from '../components/Employee/Sales.vue'
export default {
  components: {
    Nav, Sales
  },
  data() {
    return {
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
  },
}
</script>