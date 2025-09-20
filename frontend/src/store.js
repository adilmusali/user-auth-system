import { reactive } from 'vue';

const store = reactive({
  isLoggedIn: false,
  login() {
    this.isLoggedIn = true;
  },
  logout() {
    this.isLoggedIn = false;
  },
});

export default store;