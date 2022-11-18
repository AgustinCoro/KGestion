<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3" style="color: dimgray">
          Aranceles {{ nombreTitulo }}
        </h1>
      </v-col>
    </v-row>

    <!-- <v-row style="margin-left: 80%" justify="space-around">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="green"
            small
            fab
            dark
            @click="ingresarDetalleRepuestoOT"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </template>
        <span>Crear Orden de Trabajo</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="red"
            :to="{
              name: 'mnu_ProcOT',
            }"
            small
            fab
            dark
          >
            <v-icon>mdi-cancel</v-icon>
          </v-btn>
        </template>
        <span>Cancelar Modificacion</span>
      </v-tooltip>
    </v-row> -->
    <v-row dense>
      <!-- <v-row dense style="margin-top: 5%; margin-bottom: 5%"> -->
      <v-col cols="12" style="margin-top: 2%">
        <!-- <v-card color="#1F7087" dark>
          <v-card-title class="text-h5"> Agregar Repuestos </v-card-title> -->
        <template>
          <v-card>
            <v-card-title>
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
                    @click="ingresarDetalleRepuestoOT"
                  >
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>Crear Obra Social</span>
              </v-tooltip>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="tablaAranceles"
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
                        @click="eliminarRepuesto(item)"
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
              </template>
            </v-data-table>
          </v-card>
        </template>
        <!-- </v-card> -->
      </v-col>

      <!-- <v-col cols="12" style="margin-top: 2%">
        <v-card color="#952175" dark>
          <v-card-title class="text-h5"> Servis Periodico </v-card-title>
          <v-data-table
            :headers="cabecerasServis"
            :items="tablaServis"
            sort-by="Repuesto"
            class="elevation-1"
          >
            <template v-slot:[`item.sep_fec_prox_servis`]="{ item }">
              <span>
                <template v-if="item.sep_fec_prox_servis">
                  {{ moment(item.sep_fec_prox_servis).format("DD/MM/YYYY") }}
                </template>
              </span>
            </template>
          </v-data-table>
        </v-card>
      </v-col> -->

      <!-- <v-col cols="12" style="margin-top: 2%">
        <v-card color="#26735B" dark>
          <v-card-title class="text-h6"> Datos Complementarios </v-card-title>
          <v-row>
            <v-col style="margin-left: 5%" cols="11">
              <v-text-field
                v-model="fillDatosComplementarios.kmActual"
                label="KMS de la Unidad"
                outlined
              ></v-text-field>
            </v-col>

            <v-col style="margin-left: 5%" cols="11">
              <v-text-field
                v-model="fillDatosComplementarios.indisponibilidad"
                label="Indisponibilidad"
                outlined
                readonly
              ></v-text-field>
            </v-col>

            <v-col style="margin-left: 5%" cols="11">
              <v-text-field
                v-model="fillDatosComplementarios.generador"
                label="Generado Por"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>-->
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      nombreTitulo: null,
      colorBtnEditar: false,
      colorBtnEliminar: false,
      headers: [
        {
          text: "Codigo",
          align: "start",
          //filterable: false,
          value: "id",
        },
        { text: "Importe", value: "importe_sesion" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      tablaAranceles: [],
    };
  },
  mounted() {
    console.log(sessionStorage.getItem("Token"));
    // var form = {
    //   _token: sessionStorage.getItem("Token"),
    // };
    console.log("Los datos recibidos son: ");
    console.log(this.$route.params.datos);

    if (this.$route.params.datos.nombre != null) {
      this.nombreTitulo = " de " + this.$route.params.datos.nombre;
    }

    const form = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    };

    this.$http.get(this.urlBase + "api/aranceles", form).then((res) => {
      console.log(res.data);
      this.tablaAranceles = res.data;
    });

    this.$http.get(this.urlBase + "sanctum/csrf-cookie").then(() => {
      this.$http.get(this.urlBase + "api/aranceles", form).then((res) => {
        console.log(res);
      });
    });
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
  methods: {
    cambiarColor() {
      console.log("cambio el color");
    },
  },
  //   computed(){
  //     cambiarColor(){
  //         if ()
  //     }
  //   },
};
</script>
<style></style>
