import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";

import router from "./router";
import store from "./store";
import axios from "axios";
import toastr from "toastr";

import Default from "./layouts/default.vue";
import Login from "./layouts/login.vue";

//Api Client
axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.request.use(config => {
  if (store.state.user_token) {
    config.headers["Authorization"] = `Bearer ${store.state.user_token}`;
  }
  return config;
});

Vue.use(VueRouter);

Vue.config.productionTip = false;

Vue.component("default-layout", Default);
Vue.component("login-layout", Login);

Vue.prototype.$axios = axios;
Vue.prototype.$toastr = toastr;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
