<template>
  <v-app>
    <v-app-bar app color="blue" dark :elevation="5">
      <v-app-bar-nav-icon @click="$navdrawer.toggle()"></v-app-bar-nav-icon>
      <v-toolbar-title>{{this.user ? this.user.name : 'BuyArt'}}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <slot />
    </v-content>
    <NavDrawer />
  </v-app>
</template>

<script>
import NavDrawer from "../components/NavDrawer";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]) // this.user = this.$store.state.user
  },
  components: {
    NavDrawer
  },
  name: "App",
  data: () => ({
    //
  })
};
</script>
