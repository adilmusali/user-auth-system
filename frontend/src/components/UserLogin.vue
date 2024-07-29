<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="Email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" placeholder="Password" required />
      </div>
      <button type="submit">Login</button>
      <p>{{ message }}</p>
      <router-link to="/register">Register</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
// import { useRouter } from 'vue-router';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password
        });
        
        localStorage.setItem('token', response.data.token);
        this.$router.push('/home');
      } catch (error) {
        this.message = error.response.data.msg;
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
