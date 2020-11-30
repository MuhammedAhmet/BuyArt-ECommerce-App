import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";
import toastr from "toastr";
import router from "../router";
<<<<<<< HEAD
=======
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.localStorage
})
>>>>>>> 3876db357229825630c2520edb5597cefc930caf

Vue.use(Vuex);

const mutations = {
  // For sync actions
  set_user(state, user) {
    state.user = user;
  },
  set_user_token(state, user_token) {
    state.user_token = user_token;
  }
};
const actions = {
  //Asenkron çalışır
  async login({ commit }, formData) {
    try {
      var userToken = (await axios.post("/auth/login", formData)).data;
      commit("set_user_token", userToken.token);
      var user = (await axios.get("/auth/profile")).data;
      commit("set_user", user);
      toastr.success("Logged in");
      router.replace("/");
    } catch (err) {
      toastr.error("Giriş bilgilerinizi kontrol edin");
    }
  },
  async register({ commit }, formData) {
    try {
      var userToken = (await axios.post("/auth/register", formData)).data;
      console.log(userToken);
      commit("set_user_token", userToken.token);
      var user = (await axios.get("/auth/profile")).data;
      commit("set_user", user);
      toastr.success("Your account created successfully");
      router.replace("/");
    } catch (err) {
      console.log(err);
      //toastr.error("Kullanıcı zaten var");
    }
  },
  async logout({ commit }) {
    await axios.get("/auth/logout");
    commit("set_user_token", null);
    commit("set_user", null);
    router.replace("/");
  }
};
const state = {
  user: null,
  user_token: null
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [vuexPersist.plugin]
});



export default store;
