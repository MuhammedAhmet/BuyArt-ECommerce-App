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
              <span class="headline">Create Order</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Product Id*" required v-model="createForm.product_id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Order Status*" required v-model="createForm.order_status"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="City*" required v-model="createForm.city"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Phone*" required v-model="createForm.phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Address*" required v-model="createForm.address"></v-text-field>
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
                <th class="text-left">Product Id</th>
                <th class="text-left">Order Status</th>
                <th class="text-left">City</th>
                <th class="text-left">Phone</th>
                <th class="text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{order.id}}</td>
                <td>{{order.product_id}}</td>
                <td>{{order.order_status}}</td>
                <td>{{order.city}}</td>
                <td>{{order.phone}}</td>
                <td>{{order.address}}</td>
                <td>
                  <v-btn icon @click="edit(order)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="destroy(order)">
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
        <v-card-title class="headline">Edit Order</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Email*" required v-model="editform.product_id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Phone*" required v-model="editform.order_status"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Profile_Picture*" required v-model="editform.city"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Name*" required v-model="editform.phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field label="Password*" required v-model="editform.address"></v-text-field>
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
      this.$axios.get("/admin/order").then(response => {
        this.orders = response.data; //[]
      });
    },
    storeData() {
      this.$axios
        .post("/admin/order", this.createForm)
        .then(() => this.refreshData());
      this.dialog = false;
    },
    edit(order) {
      this.editform = order;
      this.edit_dialog = true;
    },
    clearEdit() {
      this.refreshData();
      this.edit_dialog = false;
    },
    destroy(order) {
      this.$axios
        .delete(`/admin/order/${order.id}`)
        .then(() => {
          this.refreshData();
        });
    },
    update() {
      this.$axios
        .put(`/admin/order/${this.editform.id}`, this.editform)
        .then(() => {
          this.refreshData();
          this.editform = {
            product_id: "",
            order_status: "",
            city: "",
            phonename : "",
            address : ""
          };
          this.edit_dialog = false;
        });
    }
  },
  data() {
    return {
      createForm: {
        product_id: "",
        order_status: "",
        city: "",
        phonename : "",
        address : ""
      },
      orders: [],
      dialog: false,
      edit_dialog: false,
      editform: {
        product_id: "",
        order_status: "",
        city: "",
        phonename : "",
        address : ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>