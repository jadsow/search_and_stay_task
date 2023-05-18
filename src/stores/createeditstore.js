import { defineStore } from "pinia";

export const useCreateOrEditStore = defineStore("Create or Edit store", {
  state: () => ({
    isCreate: true,
  }),
  getters: {
    option: (state) => state.isCreate,
  },
  actions: {
    changeOption(param) {
      this.isCreate = param;
    },
  },
});
