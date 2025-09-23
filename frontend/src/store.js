import { reactive } from 'vue';

const store = reactive({
  isLoggedIn: false,
  user: null,
  login(userData) {
    this.isLoggedIn = true;
    this.user = userData;
  },
  logout() {
    this.isLoggedIn = false;
    this.user = null;
  },
});

export default store;