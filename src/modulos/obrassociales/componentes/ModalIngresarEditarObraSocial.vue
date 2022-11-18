<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="600"
    v-model="this.dialogForm"
  >
    <v-card>
      <v-toolbar :color="colorDialogForm" dark>{{
        tituloDialogForm
      }}</v-toolbar>
      <v-card-text>
        <div class="text-h6 pa-12">
          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.id"
              label="Id"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.nombre"
              label="Nombre"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.razonSocial"
              label="Razon Social"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              v-model="fillIngresarObraSocial.conIVA"
              :items="fillIngresarObraSocial.listaConIVA"
              item-value="Unidad"
              item-text="Nombre"
              label="Cond IVA"
              outlined
              return-object
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.CUIT"
              label="CUIT"
            ></v-text-field>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.direccion"
              label="Direccion"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.localidad"
              label="Localidad"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.telefono"
              label="Telefono"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.contacto"
              label="Contacto"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              v-model="fillIngresarObraSocial.estado"
              :items="fillIngresarObraSocial.listaEstado"
              item-value="Unidad"
              item-text="Nombre"
              label="Estado"
              outlined
              return-object
            ></v-autocomplete>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.cantMaxOrdMes"
              label="Cantidad Maxima de Ordenes Por Mes"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.cantMaxOrdAno"
              label="Cantidad Maxima de Ordenes Por Año"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.lapMinAutDia"
              label="Lapso Minimo Entre Autorizacion en Dias"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.valAutDia"
              label="Validez de la Autorizacion en Dias"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.controlHClinica"
              label="Control H. Clinica"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              v-model="fillIngresarObraSocial.formaPago"
              :items="fillIngresarObraSocial.listaFormaPago"
              item-value="Unidad"
              item-text="Nombre"
              label="Forma de Pago"
              outlined
              return-object
            ></v-autocomplete>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12">
            <v-autocomplete
              v-model="fillIngresarObraSocial.formaFactura"
              :items="fillIngresarObraSocial.listaFormaFactura"
              item-value="Unidad"
              item-text="Nombre"
              label="Forma de Factura"
              outlined
              return-object
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.monto"
              label="Monto"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="fillIngresarObraSocial.gastosAdm"
              label="Gasto Admnistrativos"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              v-model="fillIngresarObraSocial.entregaFactura"
              :items="fillIngresarObraSocial.listaEntrega"
              item-value="Unidad"
              item-text="Nombre"
              label="Se le Entrega la Factura"
              outlined
              return-object
            ></v-autocomplete>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12">
            <v-dialog
              ref="dialogEntrada"
              v-model="dialogFechaEntrada"
              :return-value.sync="fillIngresarObraSocial.fechaEntrada"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="fillIngresarObraSocial.fechaEntrada"
                  label="Fecha de Entrada a Reparacion"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="fillIngresarObraSocial.fechaEntrada"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="dialogFechaEntrada = false"
                  >Cancel</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  @click="
                    $refs.dialogEntrada.save(
                      fillIngresarObraSocial.fechaEntrada
                    )
                  "
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>
        </div>
      </v-card-text>

      <v-card-actions class="justify-end">
        <template v-if="(motivo = 'crear')">
          <v-btn color="blue" text @click="crearObraSocial"
            >Guardar Nueva Obra Social</v-btn
          >
        </template>
        <template v-else>
          <v-btn color="green" text @click="editarObraSocial"
            >Guardar Cambio Obra Social</v-btn
          >
        </template>
        <v-btn text @click="dialogForm = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar class="mt-5" v-model="value" :color="colorSnackBar" top>
      {{ mensajeSnackBar }}

      <template v-slot:action="{ attrs }">
        <v-icon right v-bind="attrs" @click="value = false"> mdi-close </v-icon>
      </template>
    </v-snackbar>

    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialog"
    >
      <v-card>
        <v-toolbar :color="colorDialog" dark>EDESE S.A</v-toolbar>
        <v-card-text>
          <div class="text-h6 pa-12">
            {{ this.mensajeDelDialog }}
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="cerrarDialogMensaje">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <reparaciones ref="mainReparaciones" />
  </v-dialog>
</template>

<script>
//import { expiroSesion } from "../../helpers/CerrarSesion";

export default {
  //components: { expiroSesion },
  name: "ModalObrasSociales",

  data: () => ({
    dialogFechaSalida: null,
    dialogFechaEntrada: null,
    tituloDialogForm: null,
    dialogForm: false,
    dialogFechaInicio: false,
    dialogFecha: false,
    dialogFechaFin: false,
    dialogFechaUltimaReparacion: false,
    dialogfe: false,
    dialogFechai: false,
    dialogFechaf: false,
    value: false,
    colorDialogForm: null,

    fillIngresarObraSocial: {
      id: null,
      nombre: null,
      razonSocial: null,
      condIva: null,
      listaConIVA: [],
      cuit: null,
      direccion: null,
      localidad: null,
      telefono: null,
      contacto: null,
      estado: null,
      listaEstado: [],
      cantMaxOrdMes: null,
      cantMaxOrdAnos: null,
      lapMinAutDia: null,
      valAutDia: null,
      fechaSalida: null,
    },

    colorDialog: "green",
    listaDeReparacion: [],
    //urlBase: "https://localhost:5001/api/",
    //urlBase: "http://transporte.edese.local/API/api/",
    url: "",
    colorSnackBar: "red",
    snackbar: false,
    mensajeSnackBar: null,
    mensajeDelDialog: null,
    dialog: false,
    dialog2: false,
  }),
  watch: {
    fecha() {
      this.getListarReparaciones();
    },
    fechaFin() {
      this.getListarReparaciones();
    },
    dialog(val) {
      val || this.close();
    },
  },

  mounted() {
    // this.initialize();
  },

  methods: {
    // mostrarDialog(item) {
    //   this.numReclamo = item.NumReclamo;
    //   this.dialog2 = true;
    // },

    //nuevaObraSocial() {},
    expiroSesion() {},

    recargarReparaciones() {
      this.$refs.mainReparaciones.getListarReparaciones();
    },

    cerrarDialogMensaje() {
      if (this.colorDialog == "green") {
        this.$emit("recargarReparaciones");
        this.dialog = false;
      }
    },

    limpiarCampos() {
      this.fillIngresarObraSocial.unidad = null;
      this.fillIngresarObraSocial.kilometraje = null;
      this.fillIngresarObraSocial.fechaEntrada = null;
      this.fillIngresarObraSocial.fechaSalida = null;
      this.fillIngresarObraSocial.identificador = null;
    },

    // getColor(KM) {
    //   if (KM < 500 && KM > 0) return "yellow";
    //   else if (KM < 0) return "red";
    //   // else return "white";
    // },

    nuevaObraSocial() {
      console.log("Entro en la nueva obraSocial");
      this.fillIngresarObraSocial.identificador = null;
      this.fillIngresarObraSocial.unidad = null;
      this.fillIngresarObraSocial.kilometraje = null;
      this.fillIngresarObraSocial.tiempo = null;
      this.fillIngresarObraSocial.fecha = null;
      this.dialogForm = true;
      this.tituloDialogForm = "Registrar Nueva Obra Social";
      this.colorDialogForm = "#0B91D4";
    },

    cargarDatosEdicionObraSocial(row) {
      this.fillIngresarObraSocial.identificador = row.Identificador;
      this.fillIngresarObraSocial.unidad = row.Unidad;
      this.fillIngresarObraSocial.kilometraje = row.Kilometraje_de_la_Revision;
      this.fillIngresarObraSocial.fecha = this.moment(
        row.Fecha_de_la_Ultima_Revision,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      this.dialogForm = true;
      this.colorDialogForm = "green";
      this.tituloDialogForm = "Editar Informacion de la Reparacion";
    },

    async editarReparacion() {
      if (this.verificarSesion()) {
        return;
      }
      if (this.fillIngresarObraSocial.identificador == null) {
        this.mensajeSnackBar =
          "Seleccionar una Reparacion para realizar la modificacion";
        this.colorSnackBar = "red";
        this.value = true;
        return;
      }

      var respuesta;

      var fechaEntrada = this.moment(
        this.fillIngresarObraSocial.fechaEntrada
      ).format("DD/MM/YYYY");
      var fechaSalida = this.moment(
        this.fillIngresarObraSocial.fechaSalida
      ).format("DD/MM/YYYY");
      //this.moment(this.fillIngresarObraSocial.fechaSalida).format("DD/MM/YYYY");

      var obj = {
        idReparacion: this.fillIngresarObraSocial.identificador,
        uni: this.fillIngresarObraSocial.unidad,
        kilometraje: this.fillIngresarObraSocial.kilometraje,
        fechai: fechaEntrada == "Fecha inválida" ? null : fechaEntrada,
        fechaf: fechaSalida == "Fecha inválida" ? null : fechaSalida,
        usuario: sessionStorage.getItem("NombreUsuario"),
      };

      this.url = this.urlBase + "reparacion/modificar";

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };

      respuesta = await this.$http
        .post(this.url, obj, config)
        .then((response) => response.data);
      if (respuesta[0].Codigo == 200) {
        this.mensajeDelDialog = respuesta[0].Mensaje;
        this.colorDialog = "green";
        this.dialog = true;
        this.dialogForm = false;
      } else {
        this.mensajeDelDialog = respuesta[0].Error;
        //this.mensajeDelDialog = respuesta.Error.split("-");
        this.colorDialog = "red";
        this.dialog = true;
      }
      this.limpiarCampos();
    },

    async registrarReparacion() {
      if (this.verificarSesion()) {
        return;
      }

      if (this.fillIngresarObraSocial.unidad == null) {
        this.mensajeSnackBar =
          "Debe ingresar el codigo de una unidad para poder registrar una nueva Reparacion";
        this.colorSnackBar = "red";
        this.value = true;
        return;
      }

      var respuesta;

      var obj = {
        uni: this.fillIngresarObraSocial.unidad,
        kilometraje: this.fillIngresarObraSocial.kilometraje,
        usuario: sessionStorage.getItem("NombreUsuario"),
      };
      this.url = this.urlBase + "reparacion/ingresar";

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };

      respuesta = await this.$http
        .post(this.url, obj, config)
        .then((response) => response.data);
      if (respuesta.Codigo == 200) {
        this.mensajeDelDialog = respuesta.Mensaje;
        this.colorDialog = "green";
        this.dialogForm = false;
        this.dialog = true;
      } else {
        this.mensajeDelDialog = respuesta.Error;
        this.mensajeDelDialog = respuesta.Error.split("-");
        this.colorDialog = "red";
        this.dialog = true;
      }
      this.limpiarCampos();
      this.getListarReparaciones();
    },

    editarModal(item) {
      this.dialogForm = true;
      //this.colorDialogForm = "green";
      this.tituloDialogForm = "Editar Informacion de la Reparacion";
      this.fillIngresarObraSocial.identificador = item.Identificador;
      this.fillIngresarObraSocial.unidad = item.Unidad;
      this.fillIngresarObraSocial.kilometraje = item.Kilometraje;
      this.fillIngresarObraSocial.fechaEntrada =
        item.Fecha_de_Ingreso == null
          ? null
          : this.moment(item.Fecha_de_Ingreso, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            );
      this.fillIngresarObraSocial.fechaSalida =
        item.Fin_de_Reparacion == null
          ? null
          : this.moment(item.Fin_de_Reparacion, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            );
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style></style>
