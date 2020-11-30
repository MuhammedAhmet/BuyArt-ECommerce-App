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
              <span class="headline">Create Artist Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Nick Name*" required v-model="createForm.nick_name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Slug*" required v-model="createForm.slug"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      name="input-7-1"
                      label="Biography"
                      hint="Type a biography"
                      v-model="createForm.biography"
                    ></v-textarea>
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
                <th class="text-left">Nick Name</th>
                <th class="text-left">Slug</th>
                <th class="text-left">Biography</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="artist_profile in artist_profiles" :key="artist_profile.id">
                <td>{{artist_profile.id}}</td>
                <td>{{artist_profile.nick_name}}</td>
                <td>{{artist_profile.slug}}</td>
                <td>{{artist_profile.biography}}</td>
                <td>
                  <v-btn icon @click="edit(artist_profile)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="destroy(artist_profile)">
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
        <v-card-title class="headline">Edit Artist</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Nick Name*" required v-model="editform.nick_name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field label="Slug*" required v-model="editform.slug"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  name="input-7-1"
                  label="Biography"
                  hint="Type a biography"
                  v-model="editform.biography"
                ></v-textarea>
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
      this.$axios.get("/admin/artist_profile").then(response => {
        this.artist_profiles = response.data; //[]
      });
    },
    storeData() {
      this.$axios
        .post("/admin/artist_profile", this.createForm)
        .then(() => this.refreshData());
      this.dialog = false;
    },
    edit(artist_profile) {
      this.editform = artist_profile;
      this.edit_dialog = true;
    },
    clearEdit() {
      this.refreshData();
      this.edit_dialog = false;
    },
    destroy(artist_profile) {
      this.$axios
        .delete(`/admin/artist_profile/${artist_profile.id}`)
        .then(() => {
          this.refreshData();
        });
    },
    update() {
      this.$axios
        .put(`/admin/artist_profile/${this.editform.id}`, this.editform)
        .then(() => {
          this.refreshData();
          this.editform = {
            nick_name: "",
            slug: "",
            biography: ""
          };
          this.edit_dialog = false;
        });
    }
  },
  data() {
    return {
      createForm: {
        nick_name: "",
        slug: "",
        biography: ""
      },
      artist_profiles: [],
      dialog: false,
      edit_dialog: false,
      editform: {
        nick_name: "",
        slug: "",
        biography: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>