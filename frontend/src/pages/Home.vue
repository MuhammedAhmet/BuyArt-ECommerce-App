<template>
  <v-container>
    <v-row>
      <p v-if="this.user">{{this.user.name}} Welcome !</p>
      <p>Home Page</p>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["user"])
  }
  /*data() {  Üstteki ile aynı
    return {
      counter:0 
    }
  }*/
};
</script>
