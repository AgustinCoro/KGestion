<template>
  <div>
    <v-toolbar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title
        ><v-spacer></v-spacer>
        <v-breadcrumbs :items="items"></v-breadcrumbs>
        <!-- PROFESIONALES / {{ item.title }} / {{ child.icon }} -->
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="dialogSesion = true">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer color="#2f4050" v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="http://sais.colkinse.com.ar/Images/colkinse/colkinse_small.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6 white--text">
              {{ NombreUsuario }}
            </v-list-item-title>
            <v-list-item-subtitle class="white--text"
              >PROFESIONAL</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <!-- <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Files</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shared with me</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Starred</v-list-item-title>
          </v-list-item> -->
        <v-list-group
          :group="'attractions'"
          v-for="item in items"
          :key="item.text"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          color="white"
          class="white--text"
        >
          <template v-slot:activator>
            <v-list-item link class="color-white">
              <v-list-item-title
                v-text="item.text"
                class="white--text"
              ></v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.text"
            class="white--text"
          >
            <v-list-item link>
              <v-list-item-icon class="white--text">
                <v-icon class="white--text"
                  >{{ prefijoIcon }}-{{ child.icon }}</v-icon
                >
              </v-list-item-icon>
              <v-list-item-title
                class="white--text"
                v-text="child.text"
              ></v-list-item-title>
            </v-list-item>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="this.dialogSesion"
      >
        <v-card>
          <v-toolbar :color="colorDialog" dark>KGESTION</v-toolbar>

          <div class="text-h6 pa-12">
            Desea Cerrar la Sesion?
            <v-btn color="primary" @click="cerrarSesion">SI</v-btn>
            <v-btn color="primary" @click="dialogSesion = false">NO</v-btn>
          </div>

          <v-card-actions class="justify-end">
            <v-btn text @click="dialogSesion = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-navigation-drawer>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
import axios from "axios";

export default {
  data: () => {
    return {
      NombreUsuario: sessionStorage.getItem("NombreUsuario"),
      colorDialog: "red",
      dialogSesion: false,
      drawer: null,
      prefijoIcon: "mdi",
      // items: [
      //   {
      //     action: "mdi-account-group",
      //     text: "Mis Pacientes",
      //     items: [{ text: "Atenciones", icon: "exclamation-thick" }],
      //   },
      //   {
      //     action: "mdi-cash",
      //     active: true,
      //     text: "Mi Facturacion",
      //     items: [{ text: "Estado de Cuenta", icon: "clipboard-list-outline" }],
      //   },
      //   {
      //     action: "mdi-send",
      //     text: "Comunicacion",
      //     items: [
      //       { text: "Documentacion", icon: "file-document-outline" },
      //       { text: "Aranceles", icon: "currency-usd" },
      //     ],
      //   },
      //   {
      //     action: "mdi-text-box-search-outline",
      //     text: "Investigacion",
      //     items: [
      //       { text: "Revista Digital", icon: "newspaper-variant-multiple" },
      //     ],
      //   },
      // ],
      items: [],
    };
  },

  mounted() {
    this.cargarPermisos();
  },

  methods: {
    cargarPermisos() {
      console.log("En a cargar Permisos");
      console.log(sessionStorage.getItem("NombreRol"));
      if (sessionStorage.getItem("NombreRol") == "admin") {
        //console.log("Entro en si del if");
        this.items = [
          {
            action: "mdi-account-group",
            text: "Board",
            // items: [{ text: "Atenciones", icon: "exclamation-thick" }],
          },
          {
            action: "mdi-cash",
            active: true,
            text: "Matriculados",
            // items: [
            //   { text: "Estado de Cuenta", icon: "clipboard-list-outline" },
            // ],
          },
          {
            action: "mdi-send",
            text: "Obras Sociales",
            // items: [
            //   { text: "Documentacion", icon: "file-document-outline" },
            //   { text: "Aranceles", icon: "currency-usd" },
            // ],
          },
          // {
          //   action: "mdi-text-box-search-outline",
          //   text: "Investigacion",
          //   items: [
          //     { text: "Revista Digital", icon: "newspaper-variant-multiple" },
          //   ],
          // },
        ];
      }
    },

    mostrarMenu() {
      console.log("El valor del drawer es ");
      console.log(this.drawer);
      this.drawer = !this.drawer;
    },

    obtenerNombreDireccion(item) {
      console.log(item);
    },

    // async cerrarSesion() {
    //   var respuesta = "";

    //   this.url =
    //     this.urlBase + "logout?_token=" + sessionStorage.getItem("Token");

    //   // const config = {
    //   //   headers: {
    //   //     Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
    //   //   },
    //   // };
    //   const config = {
    //     headers: {
    //       Accept: `application/json`,
    //     },
    //   };
    //   respuesta = await this.$http
    //     .post(this.url, config)
    //     .then((response) => response.data);

    //   console.log("He cerrado la sesion" + respuesta);

    //   sessionStorage.clear();
    //   sessionStorage.setItem("SesionAbierta", 2);
    //   this.$router.push({ path: "/" });
    //   location.reload();
    // },

    async cerrarSesion() {
      var form = {
        _token: sessionStorage.getItem("Token"),
      };

      axios.post(this.urlBase + "logout", form).then((res) => {
        console.log(res.data);
      });
    },

    async confirmarCerrarSesion() {
      this.dialogSesion = true;
    },
  },
};
</script>
