<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3" style="color: dimgray">
          Matriculados
        </h1>
      </v-col>
    </v-row>

    <v-row dense>
      <!-- <v-row dense style="margin-top: 5%; margin-bottom: 5%"> -->
      <v-col cols="12" style="margin-top: 2%">
        <!-- <v-card color="#1F7087" dark>
          <v-card-title class="text-h5"> Agregar Repuestos </v-card-title> -->
        <template>
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar (Identificador / Obra Social)"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="blue"
                    small
                    fab
                    dark
                    @click="ingresarObraSocial"
                  >
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>Crear Obra Social</span>
              </v-tooltip>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="tablaObrasSociales"
              :search="search"
              :footer-props="traduccionTabla"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip bottom mg="1">
                  <template v-slot:activator="{ on, attrs }">
                    <v-hover v-slot="{ hover }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        small
                        fab
                        dark
                        @click="modificarObraSocial(item)"
                        class="ml-2"
                        :color="hover ? 'green' : 'grey'"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-hover>
                  </template>
                  <span>Editar Obra Social</span>
                </v-tooltip>
                <v-tooltip bottom mg="1">
                  <template v-slot:activator="{ on, attrs }">
                    <v-hover v-slot="{ hover }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        small
                        fab
                        dark
                        @click="eliminarRepuesto(item)"
                        class="ml-2"
                        :color="hover ? 'red' : 'grey'"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-hover>
                  </template>
                  <span>Eliminar Obra Social</span>
                </v-tooltip>
                <v-tooltip bottom mg="1">
                  <template v-slot:activator="{ on, attrs }">
                    <v-hover v-slot="{ hover }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        small
                        fab
                        dark
                        @click="eliminarRepuesto(item)"
                        class="ml-2"
                        :color="hover ? 'purple' : 'grey'"
                        :to="{ name: 'aranceles', params: { datos: item } }"
                      >
                        <v-icon>mdi-eye-outline</v-icon>
                      </v-btn>
                    </v-hover>
                  </template>
                  <span>Ver Aranceles</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </template>
      </v-col>
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="this.mostrarDialog"
      >
        <v-card>
          <v-toolbar :color="colorDialog" dark
            >KGESTION - Formulario de Ingreso de Obra Social</v-toolbar
          >

          <template v-if="fillBsqObraSocial.identificador != null">
            <div class="text-h6 pa-12">
              Desea finalizar la Reparacion?
              <v-btn
                color="primary"
                @click="finalizarReparacion(fillBsqObraSocial.identificador)"
                >SI</v-btn
              >
              <v-btn color="primary" @click="dialog = false">NO</v-btn>
            </div>
          </template>

          <template v-else>
            <v-card-text>
              <div class="text-h6 pa-12">
                {{ this.mensajeDelDialog }}
              </div>
            </v-card-text>
          </template>

          <v-card-actions class="justify-end">
            <v-btn text @click="dialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <modalingresareditarobrasocial
      ref="modalingresareditarobrasocial"
      @recargarObraSocial="recargarObraSocial"
    >
    </modalingresareditarobrasocial>
  </v-container>
</template>
<script>
import modalingresareditarobrasocial from "./componentes/ModalIngresarEditarObraSocial.vue";

export default {
  components: {
    modalingresareditarobrasocial,
  },
  data() {
    return {
      fillBsqObraSocial: {
        identificador: null,
      },
      colorDialog: "blue",
      mostrarDialog: false,
      colorBtnEditar: false,
      colorBtnEliminar: false,
      search: "",
      headers: [
        {
          text: "Codigo",
          align: "start",
          //filterable: false,
          value: "id",
        },
        { text: "Nombre", value: "nombre" },
        { text: "Telefono", filterable: false, value: "telefono" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      tablaObrasSociales: [],
    };
  },
  mounted() {
    console.log(sessionStorage.getItem("Token"));
    // var form = {
    //   _token: sessionStorage.getItem("Token"),
    // };

    const form = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    };

    this.$http
      .get(this.urlBase + "api/obras-sociales", form, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        this.tablaObrasSociales = res.data;
      });

    this.$http.get(this.urlBase + "sanctum/csrf-cookie").then(() => {
      this.$http
        .get(this.urlBase + "api/obras-sociales", form, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
        });
    });

    // const instance = this.$http.create({
    //   withCredentials: true,
    //   baseURL: this.urlBase,
    // });

    // instance.get("api/obras-sociales");
    // console.log(instance);
  },
  methods: {
    cambiarColor() {
      console.log("cambio el color");
    },
    ingresarObraSocial() {
      console.log("Voy a abrir el formulario");
      var motivo = "Ingresar";
      this.$refs.modalingresareditarobrasocial.nuevaObraSocial(motivo);
    },

    async modificarObraSocial(fila) {
      this.$refs.modalingresareditarobrasocial.cargarDatosEdicionObraSocial(
        fila
      );
    },
  },
  watch: {
    hover(value) {
      console.log(this.hover);
      console.log(value);
    },
    // colorBtnEliminar(value) {
    //   console.log(this.colorBtnEliminar);
    //   console.log(value);
    // },
  },
  //   computed(){
  //     cambiarColor(){
  //         if ()
  //     }
  //   },
};
</script>
<style></style>
