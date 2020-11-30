<template>
  <v-container>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">
              <v-icon>mdi-plus</v-icon>ADD NEW
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Create User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Email*" required v-model="createForm.email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Phone*" required v-model="createForm.phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Profile_Picture*" required v-model="createForm.profile_picture"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Name*" required v-model="createForm.name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Password*" required v-model="createForm.password"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="IsAdmin*" required v-model="createForm.is_admin"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Artist Id*" required v-model="createForm.artist_id"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="storeData">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">#</th>
                <th class="text-left">Email</th>
                <th class="text-left">Phone</th>
                <th class="text-left">Profile Picture</th>
                <th class="text-left">Name</th>
                <th class="text-left">Password</th>
                <th class="text-left">IsAdmin</th>
                <th class="text-left">ArtisId</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{user.id}}</td>
                <td>{{user.email}}</td>
                <td>{{user.phone}}</td>
                <td>{{user.profile_picture}}</td>
                <td>{{user.name}}</td>
                <td>{{user.password}}</td>
                <td>{{user.is_admin}}</td>
                <td>{{user.artist_id}}</td>
                <td>
                  <v-btn icon @click="edit(user)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="destroy(user)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-dialog v-model="edit_dialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">Edit User</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Email*" required v-model="editform.email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Phone*" required v-model="editform.phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Profile_Picture*" required v-model="editform.profile_picture"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Name*" required v-model="editform.name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Password*" required v-model="editform.password"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="IsAdmin*" required v-model="editform.is_admin"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Artist Id*" required v-model="editform.artist_id"></v-text-field>
                  </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="clearEdit">Close</v-btn>
          <v-btn color="blue darken-1" text @click="update">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      this.$axios.get("/admin/user").then(response => {
        this.users = response.data; //[]
      });
    },
    storeData() {
      this.$axios
        .post("/admin/user", this.createForm)
        .then(() => this.refreshData());
      this.dialog = false;
    },
    edit(user) {
      this.editform = user;
      this.edit_dialog = true;
    },
    clearEdit() {
      this.refreshData();
      this.edit_dialog = false;
    },
    destroy(user) {
      this.$axios
        .delete(`/admin/user/${user.id}`)
        .then(() => {
          this.refreshData();
        });
    },
    update() {
      this.$axios
        .put(`/admin/user/${this.editform.id}`, this.editform)
        .then(() => {
          this.refreshData();
          this.editform = {
            email: "",
            phone: "",
            profile_picture: "",
            name : "",
            is_admin : "",
            artist_id : ""
          };
          this.edit_dialog = false;
        });
    }
  },
  data() {
    return {
      createForm: {
        email: "",
        phone: "",
        profile_picture: "",
        name : "",
        is_admin : "",
        artist_id : ""
      },
      users: [],
      dialog: false,
      edit_dialog: false,
      editform: {
        email: "",
        phone: "",
        profile_picture: "",
        name : "",
        is_admin : "",
        artist_id : ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>