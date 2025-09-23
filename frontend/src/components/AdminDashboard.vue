<template>
  <div class="container mx-auto p-4 sm:p-8">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
    <div class="bg-white shadow-md rounded-lg overflow-x-auto">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Role
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ user.name }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ user.email }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span :class="user.role === 'admin' ? 'text-red-600' : 'text-gray-700'" class="font-semibold capitalize">{{ user.role }}</span>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <button @click="toggleRole(user)" class="text-indigo-600 hover:text-indigo-900 mr-4 font-medium">
                {{ user.role === 'admin' ? 'Make User' : 'Make Admin' }}
              </button>
              <button @click="deleteUser(user._id)" class="text-red-600 hover:text-red-900 font-medium">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api, { setAccessToken } from '../api';
import store from '../store';

export default {
    name: 'AdminDashboard',
    data() {
        return {
            users: []
        };
    },
    methods: {
        async fetchUsers() {
                const response = await api.get('/admin/users');
                this.users = response.data;
        },
        
        async deleteUser(userId) {
            if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
                await api.delete(`/admin/users/${userId}`);
                if (store.user && store.user._id === userId) {
                    alert('You have deleted your own account. You will now be logged out.');
                    setAccessToken('');
                    store.logout();
                    this.$router.push('/');
                    return;
                }
                this.fetchUsers();
            }
        },

        async toggleRole(user) {
            const newRole = user.role === 'admin' ? 'user' : 'admin';
            await api.put(`/admin/users/${user._id}/role`, { role: newRole });

            if (store.user._id === user._id && newRole === 'user') {
              store.user.role = 'user';
              this.$router.push('/home');
              return;
            }

            this.fetchUsers();
        }
    },
    mounted() {
        this.fetchUsers();
    }
}
</script>