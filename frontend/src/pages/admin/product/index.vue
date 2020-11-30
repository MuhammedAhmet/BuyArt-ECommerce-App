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
              <span class="headline">Create Product</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Type*" required v-model="createForm.type"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Price*" required v-model="createForm.price"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Image Path*" required v-model="createForm.image_paths"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Count*" required v-model="createForm.count"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Name*" required v-model="createForm.name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Description*" required v-model="createForm.description"></v-text-field>
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
                <th class="text-left">Type</th>
                <th class="text-left">Price</th>
                <th class="text-left">Image Path</th>
                <th class="text-left">Count</th>
                <th class="text-left">Name</th>
                <th class="text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{product.id}}</td>
                <td>{{product.type}}</td>
                <td>{{product.price}}</td>
                <td>{{product.image_paths}}</td>
                <td>{{product.count}}</td>
                <td>{{product.name}}</td>
                <td>{{product.description}}</td>
                <td>
                  <v-btn icon @click="edit(product)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="destroy(product)">
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
        <v-card-title class="headline">Edit Product</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Type*" required v-model="editform.type"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Price*" required v-model="editform.price"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Image Path*" required v-model="editform.image_paths"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Count*" required v-model="editform.count"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Name*" required v-model="editform.name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Description*" required v-model="editform.description"></v-text-field>
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
      this.$axios.get("/admin/products").then(response => {
        this.products = response.data; //[]
      });
    },
    storeData() {
      this.$axios
        .post("/admin/products", this.createForm)
        .then(() => this.refreshData());
      this.dialog = false;
    },
    edit(product) {
      this.editform = product;
      this.edit_dialog = true;
    },
    clearEdit() {
      this.refreshData();
      this.edit_dialog = false;
    },
    destroy(product) {
      this.$axios
        .delete(`/admin/products/${product.id}`)
        .then(() => {
          this.refreshData();
        });
    },
    update() {
      this.$axios
        .put(`/admin/products/${this.editform.id}`, this.editform)
        .then(() => {
          this.refreshData();
          this.editform = {
            type: "",
            price: "",
            image_paths: "",
            count: "",
            name: "",
            description: ""
          };
          this.edit_dialog = false;
        });
    }
  },
  data() {
    return {
      createForm: {
       type: "",
        price: "",
        image_paths: "",
        count: "",
        name: "",
        description: ""
      },
      products: [],
      dialog: false,
      edit_dialog: false,
      editform: {
        type: "",
        price: "",
        image_paths: "",
        count: "",
        name: "",
        description: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>