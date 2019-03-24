import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    token: '',
    idd: '',
    email: '',
    username: '',
    tipo: '',
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
    },
  },
  mutations: {
    initin(state, { params }) {
      console.log(params);
      state.token = params.token;
      state.tipo = params.tipo;
      state.idd = params.idd;
      state.email = params.email;
      state.username=params.username;
      localStorage.setItem('storeToken', params.token);
    },
    setTipo(state, { tipo }) {
      state.tipo = tipo.tipo;
      localStorage.setItem('storeTipo', tipo.tipo);
    },
    setToken(state, { token }) {
      state.token = token.token;
      localStorage.setItem('storeToken', token.token);
    },
    setId(state, { idd }) {
      state.idd = idd.idd;
      localStorage.setItem('storeIdd', idd.idd);
    },
    setInfo(state, { email }) {
      state.email = email.email;
      state.username = email.username;
      localStorage.setItem('storeEmail', email.email);
      localStorage.setItem('storeUsername', email.username);
    },
  },
  actions: {
    authenticate: ({ commit }, token) => commit('setToken', { token }),
    authenticate2: ({ commit }, idd) => commit('setId', { idd }),
    authenticate3: ({ commit }, tipo) => commit('setTipo', { tipo }),
    setInfo: ({ commit }, email, username) => commit('setInfo', { email }),
    initin: ({ commit }, params) => commit('initin', { params }),
  },
});
