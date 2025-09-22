<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 text-center py-12 px-4">
    <div class="max-w-md w-full space-y-8">
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
        Email Verification
      </h2>
      <p class="text-lg text-gray-700" :class="{ 'text-red-500': isError }">
        {{ message }}
      </p>
      <div v-if="isVerified">
        <router-link to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
          Click here to Log In
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'EmailVerification',
  data() {
    return {
      message: 'Verifying your email, please wait...',
      isError: false,
      isVerified: false,
    };
  },
  async mounted() {
    const token = this.$route.query.token;

    if (!token) {
      this.message = 'No verification token found.';
      this.isError = true;
      return;
    }

    try {
      await api.get(`/auth/verify/${token}`);
      
      this.message = 'Success! Your email has been verified.';
      this.isVerified = true;
    } catch (error) {
      this.message = 'This verification link is invalid or has expired.';
      this.isError = true;
    }
  },
};
</script>