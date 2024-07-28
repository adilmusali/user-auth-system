<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
        <p>{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserRegister',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        message: ''
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('/api/auth/register', {
            name: this.name,
            email: this.email,
            password: this.password
          });
          this.message = 'Registration successful!';
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
  