import Vue from "vue";
import Vuex from "vuex";
import Api from "@/api";
import * as Auth from "@/shared/utils/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    user: {
    },
    menuText: '',
    permission: {},
    apiMessage: "",
  },
  getters: {
    isLogin(state) {
      return !!state.token;
    },
    isGranted: (state) => (payload) => {
      let permission = state.permission[state.menuId] || [];
      return permission.indexOf(payload) > -1;
    },
    isAllGranted: (state) => (payload) => {
      let permission = state.permission[state.menuId] || [];
      return payload.every((item) => {
        return permission.indexOf(item) > -1;
      });
    },
    isAnyGranted: (state) => (payload) => {
      let permission = state.permission[state.menuId] || [];
      return payload.some((item) => {
        return permission.indexOf(item) > -1;
      });
    },
  },
  mutations: {
    setToken(state, token) {
      if (token) {
        state.token = token;
        Auth.setToken(token);
      } else {
        state.token = "";
        Auth.removeToken();
      }
    },
    setUser(state, user) {
      state.user = { ...state.user, ...user, };
    },
    setPermission(state, payload) {
      let temp = {};
      for (const key in payload) {
        temp[key] = payload[key].map((item) => item.enCode);
      }
      state.permission = temp;
    },
    setMessage(state, payload) {
      state.apiMessage = payload;
    },
    setMenuText(state, payload) {
      state.menuText = payload;
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      let { token_type, access_token } = await Api.account.login(
        payload
      );
      let token = token_type + " " + access_token;
      commit("setToken", token);
      await dispatch("getUserInfo");
    },
    async logout({ commit }) {
      await Api.account.logout();
      commit("setToken");
    },
    async autoLogin({ commit, getters, dispatch }) {

      // 用户未执行登录但存有token,执行认证登录
      if (!getters.isLogin) {
        let token = Auth.getToken();
        if (token) {
          commit("setToken", token);
          await dispatch("getUserInfo");
        }
      }
    },
    async getUserInfo({ commit }) {
      let user = await Api.account.getUserInfo();
      commit("setUser", user);
    },
    pushMessage({ commit }, payload) {
      commit("setMessage", payload);
      setTimeout(() => {
        commit("setMessage", "");
      }, 100);
    },
  },
});
