import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SideBarMenu from "../modulos/plantillas/SideBarMenu.vue";
import SideNavBar from "../modulos/plantillas/SideNavBar.vue";
import TableView from "../modulos/plantillas/TableView.vue";
import Aranceles from "../modulos/comunicacion/aranceles-index.vue";
import Documentacion from "../modulos/comunicacion/documentacion-index.vue";
import Cuenta from "../modulos/facturacion/cuenta-index.vue";
import Carpeta from "../modulos/investigacion/carpeta-index.vue";
import Atencion from "../modulos/pacientes/atencion-index.vue";
import ObraSocial from "../modulos/obrassociales/obras_sociales-index.vue";
import Login from "../modulos/plantillas/Login.vue";
import Index from "../modulos/pacientes/atencion-index.vue";
import CuatroCientosCuatro from "../modulos/plantillas/404.vue";

//import moment from "moment";

Vue.use(VueRouter);

// function verificarAcceso(to, from, next) {
//   if (
//     moment().format("YYYY-MM-DD HH:mm:ss") >
//     moment(sessionStorage.getItem("FechaExpiracion")).format(
//       "YYYY-MM-DD HH:mm:ss"
//     )
//   ) {
//     sessionStorage.clear();
//     sessionStorage.setItem("SesionAbierta", 1);
//     next("/login");
//     location.reload();
//   } else {
//     let authUser = JSON.parse(sessionStorage.getItem("CodigoUsuario"));
//     if (authUser) {
//       let listRolPermisosByUsuario = JSON.parse(
//         sessionStorage.getItem("Permisos")
//       );

//       var bandera = 0;

//       for (let i = 0; i < listRolPermisosByUsuario.length; i++) {
//         if (listRolPermisosByUsuario[i].obj_Nombre == to.name) {
//           bandera = 1;
//         }
//       }

//       if (bandera == 1) {
//         next();
//       } else {
//         let listRolPermisosByUsuarioFilter = [];
//         listRolPermisosByUsuario.map(function (x) {
//           if (x.obj_Nombre == "index") {
//             listRolPermisosByUsuarioFilter.push(x);
//           }
//         });
//         if (to.name == "home") {
//           next({ name: listRolPermisosByUsuarioFilter[0] });
//         } else {
//           next(from.path);
//         }
//       }
//     } else {
//       next("/login");
//     }
//   }
// }

const routes = [
  {
    path: "/aranceles",
    name: "aranceles",
    component: Aranceles,
  },
  {
    path: "/documentacion",
    name: "documentacion",
    component: Documentacion,
  },
  {
    path: "/cuenta",
    name: "cuenta",
    component: Cuenta,
  },
  {
    path: "/carpeta",
    name: "carpeta",
    component: Carpeta,
  },
  {
    path: "/atencion",
    name: "Atencion",
    component: Atencion,
  },
  {
    path: "/obras-sociales",
    name: "obras-sociales",
    component: ObraSocial,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      let authUser = JSON.parse(sessionStorage.getItem("NombreUsuario"));
      if (authUser) {
        next({ name: "index" });
      } else {
        next();
      }
    },
  },
  {
    path: "/index",
    name: "index",
    component: Index,
  },
  // {
  //   path: "/index",
  //   name: "index",
  //   component: Index,
  //   beforeEnter: (to, from, next) => {
  //     verificarAcceso(to, from, next);
  //   },
  // },
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
  {
    path: "*",
    component: CuatroCientosCuatro,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
