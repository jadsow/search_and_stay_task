import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    logged: false
  }),
  getters: {
    isLogged: (state) => state.logged
  },
  actions: {
    loggin(param) {
      this.logged = param
    },
    logout() {
      this.logged = false
    }
  },
});
