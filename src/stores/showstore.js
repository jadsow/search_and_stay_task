import { defineStore } from 'pinia';

export const useShowStore = defineStore('Show Store', {
  state: () => ({
    data: {}
  }),
  getters: {
    dataShow : (state) => state.data
  },
  actions: {
    showData(data) {
      this.data = data
    }
  },
});
