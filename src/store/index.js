import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    token: "",
    idd: "",
    email: "",
    username: "",
    tipo: ""
  },
  getters: {
    tipoUser(state) {
      return state.tipo;
    },
    isLoggedIn(state) {
      return state.token;
    },
    myId(state) {
      return state.idd;
    },
    myInfo(state) {
      return { idd: state.idd, email: state.email, username: state.username };
    }
  },
  mutations: {
    setTipo(state, { tipo }) {
      state.tipo = tipo;
    },
    setToken(state, { token }) {
      state.token = token;
    },
    setId(state, { idd }) {
      state.idd = idd;
    },
    setInfo(state, { email, username }) {
      state.email = email;
      state.username = username;
    }
  },
  actions: {
    authenticate: ({ commit }, token) => commit("setToken", { token }),
    authenticate2: ({ commit }, idd) => commit("setId", { idd }),
    authenticate3: ({ commit }, tipo) => commit("setTipo", { tipo }),
    setInfo: ({ commit }, email, username) =>
      commit("setInfo", { email, username })
  }
});
