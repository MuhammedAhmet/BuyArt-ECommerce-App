<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="rounded-card">
          <v-toolbar color="white" dark flat>
            <v-toolbar-title class="black--text">Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-email"
                type="text"
                v-model="email"
              />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-col align="center" justify="center">
              <v-btn color="primary" @click="login" block class="rounded-card">Login</v-btn>
              <p class="grey--text my-3">OR</p>
              <v-btn color="green" block class="rounded-card white--text" to="/register">Register</v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      //this.$toastr.success("LOSdOAd");
    }
  },
  data() {
    return {
      email: "",
      password: ""
    };
  }
};
</script>
<style>
.rounded-card {
  border-radius: 16px !important;
}
</style>
