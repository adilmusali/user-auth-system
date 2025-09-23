<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div class="flex justify-center">
        <img v-if="userAvatar" :src="userAvatar" alt="User Avatar" class="h-24 w-24 rounded-full object-cover mx-auto mb-4">
        <div v-else class="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-4">
          <span class="text-gray-500 text-xs">No Avatar</span>
        </div>
      </div>
      <h1 class="text-4xl font-extrabold text-gray-900">Welcome, {{ userName }}!</h1>
      <p class="text-lg text-gray-700">You have successfully logged in.</p>
      <router-link to="/profile" class="font-medium text-indigo-600 hover:text-indigo-500">Go to Profile</router-link>
      <button @click="logout"
              class="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Log Out
      </button>
    </div>
  </div>
</template>

<script>
import api, { setAccessToken } from '../api';
import store from '../store';

export default {
  data() {
    return {
      userName: '',
      userAvatar: null
    };
  },
  methods: {
    async logout() {
      try {
        await api.post('/auth/logout');
      } catch (error) {
        console.error('Failed to logout on server', error);
      } finally {
        setAccessToken('');
        store.logout();
        this.$router.push('/');
      }
    }
  },
  async mounted() {
    try {
      const response = await api.get('/users/me');
      this.userName = response.data.name;
      this.userAvatar = response.data.avatar;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      this.logout();
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
