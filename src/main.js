// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import App from './App';
import { store } from './store/';
import 'vuetify/dist/vuetify.min.css';
import router from './router';
import es from 'vuetify/es5/locale/es';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Vuetify, {
  lang: {
    locales: { es },
    current: 'es',
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    this.$router.push('/');
  },
  components: { App },
  render: h => h(App),
});
