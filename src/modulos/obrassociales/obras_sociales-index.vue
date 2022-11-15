<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3" style="color: dimgray">
          Obras Sociales
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
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
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
              :items="desserts"
              :search="search"
              :footer-props="traduccionTabla"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip bottom mg="1">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="green"
                      small
                      fab
                      dark
                      @click="editItem(item)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Editar Obra Social</span>
                </v-tooltip>
                <v-tooltip bottom mg="1">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="red"
                      small
                      fab
                      dark
                      @click="eliminarRepuesto(item)"
                      class="ml-2"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
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
      search: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          //filterable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", filterable: false, value: "fat" },
        { text: "Carbs (g)", filterable: false, value: "carbs" },
        { text: "Protein (g)", filterable: false, value: "protein" },
        { text: "Iron (%)", filterable: false, value: "iron" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
};
</script>
<style></style>
