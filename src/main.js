import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import "@babel/polyfill";

//Colocar aqui la direccion para hacer las solicitudes
Vue.prototype.$http = axios;
Vue.prototype.urlBase = "http://kgestion.loco22.com/";
Vue.prototype.traduccionTabla = {
  showFirstLastPage: true,
  firstIcon: "mdi-arrow-collapse-left",
  lastIcon: "mdi-arrow-collapse-right",
  prevIcon: "mdi-minus",
  nextIcon: "mdi-plus",
  "items-per-page-text": "Registros Por Pagina",
  pageText: "{0}-{1} de {2}",
  itemsPerPageOptions: [5, 10, 20, 50, 100, { text: "Todos", value: -1 }],
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
