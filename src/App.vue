<template>
  <v-app>
    <template v-if="IsSesionActive != null">
      <SideNavBar :usuario="nombreUsuario"> </SideNavBar>
    </template>

    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SideNavBar from "./modulos/plantillas/SideNavBar.vue";

export default {
  name: "AppVue",
  components: { SideNavBar },

  data() {
    return {
      colorSnackBar: "red",
      colorSnackBar2: "blue",
      nombreUsuario: this.usuario,
      listRolPermisosByUsuario: [],
      mensajeSnackBar: "",
      snackActive: false,
      bandera: false,
    };
  },

  computed: {
    IsSesionActive() {
      this.ChangeDataSnack();
      return sessionStorage.getItem("NombreRol");
    },
  },

  mounted() {
    console.log("Entro en el mounted del AppVue");
  },

  methods: {
    ChangeDataSnack() {
      if (JSON.parse(sessionStorage.getItem("SesionAbierta")) == 1) {
        this.snackActive = true;
        this.mensajeSnackBar = "Expiro su Sesion";
      }
      if (JSON.parse(sessionStorage.getItem("SesionAbierta")) == 2) {
        this.snackActive = true;
        this.mensajeSnackBar = "Ha Cerrado la Sesion";
      }
    },

    verificarSesion: function () {
      if (
        this.moment().format("YYYY-MM-DD HH:mm:ss") >
        this.moment(sessionStorage.getItem("FechaExpiracion")).format(
          "YYYY-MM-DD HH:mm:ss"
        )
      ) {
        sessionStorage.clear();
        sessionStorage.setItem("SesionAbierta", 1);
        this.$router.push({ name: "login" });
        location.reload();
        return true;
      }
    },
  },
};
</script>
