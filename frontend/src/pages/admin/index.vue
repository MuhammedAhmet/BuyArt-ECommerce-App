<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="blue" dark to="/admin/artist_profile">
          <v-icon class="mr-2">mdi-account-multiple</v-icon>Artist Profiles
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="blue" dark to="/admin/user">
          <v-icon class="mr-2">mdi-account-multiple</v-icon>Users
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
       <v-col>
        <v-btn color="blue" dark to="/admin/order">
          <v-icon class="mr-2">mdi-account-multiple</v-icon>Orders
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
        <v-col>
        <v-btn color="blue" dark to="/admin/product">
          <v-icon class="mr-2">mdi-account-multiple</v-icon>Products
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>