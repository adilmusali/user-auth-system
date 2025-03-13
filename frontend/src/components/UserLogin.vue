<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input v-model="email" id="email" name="email" type="email" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Password">
          </div>
        </div>
        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </button>
        </div>
        <p class="text-red-500 text-xs italic">{{ message }}</p>
        <div class="text-sm text-center">
          <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
            Register
          </router-link>
        </div>
      </form>
    </div>
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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(this.email)) {
        this.message = 'Invalid email format';
        return;
      }

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