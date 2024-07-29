<!-- <template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" placeholder="Name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="Email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" placeholder="Password" required />
      </div>
      <button type="submit">Register</button>
      <p>{{ message }}</p>
      <router-link to="/">Login</router-link>
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
        await axios.post('http://localhost:5000/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        this.message = 'Registration successful!';
        this.$router.push('/'); // Redirect to login page
      } catch (error) {
        this.message = error.response.data.msg;
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style> -->

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Name</label>
            <input v-model="name" id="name" name="name" type="text" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Name">
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input v-model="email" id="email" name="email" type="email" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            Register
          </button>
        </div>
        <p class="text-red-500 text-xs italic">{{ message }}</p>
        <div class="text-sm text-center">
          <router-link to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
            Login
          </router-link>
        </div>
      </form>
    </div>
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
        await axios.post('http://localhost:5000/api/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        this.message = 'Registration successful!';
        this.$router.push('/'); // Redirect to login page
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
