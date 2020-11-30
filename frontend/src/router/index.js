import VueRouter from "vue-router";
import Home from "../pages/Home";
import AdminIndex from "../pages/admin/index";
import AdminArtistProfileIndex from "../pages/admin/artist_profile";
import AdminUserIndex from "../pages/admin/user";
import AdminOrderIndex from "../pages/admin/order";
import AdminProductIndex from "../pages/admin/product";

import Login from "../pages/login";
import Register from "../pages/Register";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login,
    meta: {
      layout: "login"
    }
  },
  {
    path: "/register",
    component: Register,
    meta: {
      layout: "login"
    }
  },
  {
    path: "/admin",
    component: AdminIndex
  },
  {
    path: "/admin/artist_profile",
    component: AdminArtistProfileIndex
  },
  {
    path: "/admin/user",
    component: AdminUserIndex
  },
  {
    path: "/admin/order",
    component: AdminOrderIndex
  },
  {
    path: "/admin/product",
    component: AdminProductIndex
  }
];

const router = new VueRouter({
  routes
});

export default router;
