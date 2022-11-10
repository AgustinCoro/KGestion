import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SideBarMenu from "../modulos/plantillas/SideBarMenu.vue";
import SideNavBar from "../modulos/plantillas/SideNavBar.vue";
import TableView from "../modulos/plantillas/TableView.vue";
import Login from "../modulos/plantillas/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/tableView",
    name: "tableView",
    component: TableView,
  },
  {
    path: "/sidenavbar",
    name: "sidenavbar",
    component: SideNavBar,
  },
  {
    path: "/sidebarmenu",
    name: "sidebarmenu",
    component: SideBarMenu,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
