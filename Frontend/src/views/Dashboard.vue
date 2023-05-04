<template>
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
                    <i class="el-icon-user"></i>
                    <span class="name">{{ currentUser.lastName }} - {{ currentUser.firstName }}</span>
                    <span class="email">{{ currentUser.email }}</span>
                </div>
            <div class="logout-button">
                <el-button type="info" icon="el-icon-switch-button" @click="logout">Logout</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>

export default {
    data() {
        return {
            user: '',
            cookieValue: '',
            userLogout: false,
            loadingData: true,
            loadedData: false
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
        }
    },
}
</script>

<style scoped>
.card {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.message-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 24px;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  opacity: 0;
  animation: fade-in 1s ease-in-out forwards;
}

.message-card.logout {
  background-color: #e74c3c;
}

.message-card.loading {
  background-color: #2980b9;
}

.content-card {
  padding: 24px;
}

.header {
  font-size: 36px;
  margin-bottom: 16px;
  text-align: center;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.user-info i {
  font-size: 24px;
  margin-right: 8px;
}

.user-info .name {
  font-weight: bold;
  margin-right: 8px;
}

.user-info .email {
  color: #999;
}

.logout-button {
  display: flex;
  justify-content: center;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>