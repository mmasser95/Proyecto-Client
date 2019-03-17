// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import App from './App';
import { store } from './store/';
import 'vuetify/dist/vuetify.min.css';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App),
});
