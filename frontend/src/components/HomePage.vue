<template>
  <div class="home">
    <h2>Home</h2>
    <p v-if="isLoggedIn">Welcome, {{ userName }}! You are logged in!</p>
    <p v-else>Please log in.</p>
    <button @click="logout" v-if="isLoggedIn">Log Out</button>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      userName: ''
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  },
  created() {
    if (this.isLoggedIn) {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      this.userName = decodedToken.user.name;
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
