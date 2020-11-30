<template>
  <v-navigation-drawer app v-model="drawer" absolute temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Application</v-list-item-title>
        <v-list-item-subtitle>subtext</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in links" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
<<<<<<< HEAD
      <v-list-item link v-if="this.user && this.user.is_admin" to="/admin">
=======

      <v-list-item link v-if="this.user && this.user.is_admin" to = "/admin">
>>>>>>> 3876db357229825630c2520edb5597cefc930caf
        <v-list-item-icon>
          <v-icon>mdi-account-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Admin Paneli</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

       <v-list-item link v-if="this.user" @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Çıkış</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
    links() {
      return this.items.filter(value => value.show);
    }
  },
  mounted() {
    Vue.prototype.$navdrawer = this;
  },
  methods: {
    toggle() {
      this.drawer = !this.drawer;
    },
    logout(){
      this.$store.dispatch("logout");
    }
  },
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: "mdi-home",
          title: "Home Page",
          to: "/",
          show: true
        },
        {
          icon: "mdi-login",
          title: "Login",
          to: "/login",
          show: this.user == null
        },
        {
          icon: "mdi-account-plus",
          title: "Register",
          to: "/register",
          show: this.user == null
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>