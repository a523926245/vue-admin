import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editList: null,
  },
  getters: {
    editList: (state) => state.editList,
  },
  mutations: {},
  actions: {
    storeEditLists({ state }, payload) {
      state.editList = payload;
    },
  },
  modules: {},
});
