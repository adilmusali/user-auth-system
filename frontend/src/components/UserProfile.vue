<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">User Profile</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="updateProfile">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="avatar" class="block text-sm font-medium text-gray-700">Change Avatar</label>
            <input @change="handleFileUpload" id="avatar" name="avatar" type="file" accept="image/jpeg, image/png"
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
          </div>
          <div>
            <label for="name" class="sr-only">Name</label>
            <input v-model="user.name" id="name" name="name" type="text" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Name">
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input v-model="user.email" id="email" name="email" type="email" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">New Password</label>
            <input v-model="password" id="password" name="password" type="password"
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="New Password">
          </div>
          <div>
            <label for="oldPassword" class="sr-only">Old Password</label>
            <input v-model="oldPassword" id="oldPassword" name="oldPassword" type="password"
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Old Password (required for password change)">
          </div>
        </div>
        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save Changes
          </button>
        </div>
        <div class="flex items-center justify-center">
           <router-link to="/home" class="font-medium text-indigo-600 hover:text-indigo-500">Go to Home</router-link>
        </div>
        <p class="text-red-500 text-xs italic">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
    name: 'UserProfile',
    data() {
        return {
            user: {
                name: '',
                email: '',
                avatar: null
            },
            password: '',
            oldPassword: '',
            message: ''
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.user.avatar = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        async updateProfile() {
            try {
                const payload = {
                    name: this.user.name,
                    email: this.user.email,                    
                };
                if (this.user.avatar && this.user.avatar.startsWith('data:image')) {
                    payload.avatar = this.user.avatar;
                }
                if (this.password) {
                    payload.password = this.password;
                    payload.oldPassword = this.oldPassword;
                }
                const response = await api.put('/users/me', payload);
                this.user = response.data;
                this.password = '';
                this.oldPassword = '';
                this.message = "Profile updated successfully!";
            } catch (error) {
                this.message = error.response.data.msg || 'An error occured.';
            }
        }
    },
    async mounted() {
        try {
            const response = await api.get('/users/me');
            this.user = response.data;
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    }
};
</script>