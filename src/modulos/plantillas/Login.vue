<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="#0BD4AF">
                <v-list-item-avatar>
                  <v-img
                    src="http://sais.colkinse.com.ar/Images/colkinse/colkinse_small.jpg"
                  ></v-img>
                </v-list-item-avatar>
                <!-- <v-toolbar-title>Registro</v-toolbar-title> -->
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="login"
                    label="Usuario"
                    type="text"
                    v-model="nombreUsuario"
                    @keyup.enter="sha256"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Contraseña"
                    type="password"
                    v-model="password"
                    @keyup.enter="sha256"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="#0BD4AF" @click="sha256" style="width: 100%"
                  >Ingresar</v-btn
                ><br />
              </v-card-actions>
              <a style="margin-left: 150px">Olvide Mi Contraseña</a>
            </v-card>
          </v-flex>
        </v-layout>

        <v-snackbar class="mt-5" v-model="value" :color="colorSnackBar" top>
          {{ mensajeSnackBar }}

          <template v-slot:action="{ attrs }">
            <v-icon right v-bind="attrs" @click="value = false">
              mdi-close
            </v-icon>
          </template>
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import sha256 from "js-sha256";

export default {
  name: "LoginForm",
  props: {
    source: String,
  },
  data: () => ({
    password: null,
    nombreUsuario: null,
    passwordEncriptado: null,
    colorSnackBar: null,
    mensajeSnackBar: null,
    idUsuario: null,
    value: false,
  }),

  // mounted() {
  //   console.log(sessionStorage.getItem("CodigoUsuario"));
  //   //this.cerrarSesion();
  // },
  methods: {
    async sha256() {
      // encode as UTF-8
      // const msgBuffer = new TextEncoder().encode(this.password);

      // // hash the message
      // const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

      // // convert ArrayBuffer to Array
      // const hashArray = Array.from(new Uint8Array(hashBuffer));

      // // convert bytes to hex string
      // const hashHex = hashArray
      //   .map((b) => b.toString(16).padStart(2, "0"))
      //   .join("");
      //return hashHex;
      // if (hashHex == this.passwordPrueba) {
      //   console.log("Contraseñas Iguales");
      //   console.log(hashHex);
      // }

      this.passwordEncriptado = sha256(this.password);

      this.verificarUsuario();
    },

    // async verificarUsuario() {
    //   var respuesta = "";

    //   this.url =
    //     this.urlBase +
    //     "login?email=" +
    //     this.nombreUsuario +
    //     "&password=" +
    //     this.password;

    //   console.log(this.url);
    //   respuesta = await this.$http
    //     .post(this.url)
    //     .then((response) => response.data);
    //   console.log("respuesta:");
    //   console.log(respuesta);

    //   if (respuesta.message == "Login correcto") {
    //     sessionStorage.setItem("NombreUsuario", respuesta.user.name);
    //     sessionStorage.setItem("Email", respuesta.user.email);
    //     sessionStorage.setItem("Token", respuesta._token);
    //     sessionStorage.setItem("NombreRol", respuesta.user.roles[0].name);
    //     sessionStorage.setItem("SesionAbierta", 0);

    //     this.$router.push({ path: "/" });
    //     location.reload();
    //   } else {
    //     this.value = true;
    //     this.colorSnackBar = "red";
    //     this.mensajeSnackBar = "Usuario o Contraseña Incorrecta";
    //   }
    // },

    async verificarUsuario() {
      var form = {
        email: this.nombreUsuario,
        password: this.password,
      };
      axios.get(this.urlBase + "sanctum/csrf-cookie").then(() => {
        axios.post(this.urlBase + "login", form).then((res) => {
          console.log(res.data);
          console.log(res.data.message);
          if (res.data.message == "Login correcto") {
            sessionStorage.setItem("NombreUsuario", res.data.user.name);
            sessionStorage.setItem("Email", res.data.user.email);
            sessionStorage.setItem("Token", res.data._token);
            sessionStorage.setItem("NombreRol", res.data.user.roles[0].name);
            sessionStorage.setItem("SesionAbierta", 0);

            this.$router.push({ path: "/" });
            location.reload();
          } else {
            this.value = true;
            this.colorSnackBar = "red";
            this.mensajeSnackBar = "Usuario o Contraseña Incorrecta";
          }
        });
      });
    },

    async obtenerPermisos() {
      var respuesta = "";
      var obj = {
        idUsuario: JSON.parse(sessionStorage.getItem("CodigoUsuario")),
      };
      // console.log("La ficha es: ");
      // console.log(sessionStorage.getItem("Token"));
      this.url = this.urlBase + "Usuarios/obtenerPermisos";

      respuesta = await this.$http
        .post(this.url, obj)
        .then((response) => response.data);

      sessionStorage.setItem("Permisos", JSON.stringify(respuesta));
      this.$router.push({ path: "/" });
      location.reload();
    },

    async convertirArray(respuesta) {
      const respuesta1 = JSON.parse(respuesta);
      // console.log("Los permisos del usuario son en arreglo: ");
      // console.log(respuesta1);
      sessionStorage.setItem("Permisos", respuesta1);

      //this.$router.push({ name: "sideBar" });
      //location.reload();
    },
  },
};
</script>

<style></style>
