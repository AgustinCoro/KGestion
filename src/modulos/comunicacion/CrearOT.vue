<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3" style="color: dimgray">
          Nueva Orden de Trabajo
        </h1>
      </v-col>
    </v-row>

    <v-row style="margin-left: 80%" justify="space-around">
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
          <router-link
            :to="{
              name: 'mnu_ProcOT',
            }"
          >
            <v-btn v-bind="attrs" v-on="on" color="red" small fab dark>
              <v-icon>mdi-cancel</v-icon>
            </v-btn>
          </router-link>
        </template>
        <span>Cancelar Modificacion</span>
      </v-tooltip>
    </v-row>

    <v-row dense style="margin-top: 5%; margin-bottom: 5%">
      <v-col cols="6">
        <v-card color="#385F73" dark>
          <v-card-title class="text-h5"> Orden de Trabajo </v-card-title>
          <v-row>
            <v-col style="margin-left: 4%" cols="11">
              <v-select
                v-model="unidad"
                :items="fillNuevaOT.listaDeUnidades"
                item-value="Unidad"
                item-text="Nombre"
                label="Unidad"
                outlined
                menu-props="auto"
                @change="cambioUnidad()"
                return-object
              ></v-select>
            </v-col>

            <v-col style="margin-left: 4%" cols="11">
              <v-select
                v-model="proveedor"
                :items="fillNuevaOT.ccn"
                item-value="ID"
                item-text="Proveedor"
                label="CTA NRO"
                outlined
                menu-props="auto"
                @change="cambioProveedor()"
                return-object
              >
                <template v-slot:prepend-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-text-field
                        v-model="buscarEnManoObra"
                        placeholder="Buscar"
                        @input="buscarManoObra"
                      ></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
            </v-col>

            <v-col style="margin-left: 4%" cols="11">
              <v-select
                v-model="mecanico"
                :items="fillNuevaOT.listaDeMecanicos"
                item-value="Unidad"
                item-text="Nombre"
                label="Mecanicos"
                outlined
                :disabled="cbMecanico"
                menu-props="auto"
                return-object
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card color="#385F73" dark min-height="382">
          <v-card-title class="text-h5"> Reparaciones </v-card-title>
          <v-row>
            <v-col style="margin-left: 1%" cols="4">
              <v-textarea
                v-model="fillNuevaReparacion.observacion"
                outlined
                name="input-7-4"
                label="Observaciones"
              ></v-textarea>
            </v-col>

            <v-col cols="7">
              <v-select
                v-model="fillNuevaReparacion.manodeObra"
                :items="fillNuevaReparacion.listamanodeObra"
                item-value="itg_id"
                item-text="itg_descripcion"
                attach
                chips
                label="Mano de Obra"
                multiple
                outlined
                clearable
                return-object
              >
                <template v-slot:prepend-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-text-field
                        v-model="buscarEnManoObra"
                        placeholder="Buscar"
                        @input="buscarManoObra"
                      ></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" style="margin-top: 2%">
        <v-card color="#1F7087" dark>
          <v-card-title class="text-h5"> Agregar Repuestos </v-card-title>
          <v-data-table
            :headers="cabeceras"
            :items="tablaRepuestos"
            sort-by="Repuesto"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Repuestos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Agregar Repuesto
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Agregar Repuesto</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-select
                              v-model="editedItem.repuestoSeleccionado"
                              :items="fillNuevaRepuestos.listaRepuestos"
                              item-value="itg_id"
                              item-text="itg_descripcion"
                              label="Repuestos"
                              height="20"
                              return-object
                              @change="cambioRepuesto()"
                            ></v-select>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="editedItem.medida"
                              label="Medida"
                              @keyup.enter="agregarRepuesto"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="editedItem.cantidad"
                              label="Cantidad"
                              @keyup.enter="agregarRepuesto"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="agregarRepuesto"
                      >
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Desea quitar este repuesto de la lista?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="eliminarRepuestoConfirmar"
                        >Eliminar Repuesto</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
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
                    class="ml-2"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Modificar Repuesto</span>
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
                <span>Eliminar Repuesto</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
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

      <v-col cols="12" style="margin-top: 2%">
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
      </v-col>

      <!-- <v-col cols="4" style="margin-top: 2%">
        <v-card color="#26735B" dark>
          <v-card-title class="text-h6"> Comprobante </v-card-title>
          <v-row>
            <v-col style="margin-left: 5%" cols="11">
              <v-text-field
                v-model="fillComprobante.nroFactura"
                label="Nro de Factura"
                outlined
                readonly
              ></v-text-field>
            </v-col>

            <v-col style="margin-left: 5%" cols="11">
              <v-text-field
                v-model="fillComprobante.nroRemito"
                label="Nro de Remito"
                outlined
                readonly
              ></v-text-field>
            </v-col>

            <v-col style="margin-left: 5%" cols="11">
              <v-text-field
                v-model="fillComprobante.fechaFactura"
                label="Fecha Factura"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col> -->

      <!-- <v-col cols="4" style="margin-top: 2%">
        <v-card color="#26735B" dark>
          <v-card-title class="text-h6"> Total </v-card-title>
          <v-row>
            <v-col style="margin-left: 5%" cols="11">
              <v-text-field
                v-model="fillTotal.manoObra"
                label="Mano de Obra"
                outlined
                readonly
              ></v-text-field>
            </v-col>

            <v-col style="margin-left: 5%" cols="11">
              <v-text-field
                v-model="fillTotal.repuestos"
                label="Repuestos"
                outlined
                readonly
              ></v-text-field>
            </v-col>

            <v-col style="margin-left: 5%" cols="11">
              <v-text-field
                v-model="fillTotal.IVA"
                label="IVA"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>listaRepuestos
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    //fechaEstablecida: "Fecha No Establecida",
    buscarEnManoObra: "",
    cbMecanico: true,
    unidad: null,
    proveedor: [],
    mecanico: null,
    idOT: null,
    ccnCopia: [],
    fillNuevaOT: {
      OT: null,
      unidad: null,
      fecha: null,
      ccn: [],
      mecanico: null,
      listaDeUnidades: [],
    },
    fillNuevaReparacion: {
      observacion: null,
      manodeObra: [],
      listamanodeObra: [],
      listaRepuestos: [],
    },
    fillNuevaRepuestos: {
      listaRepuestos: [],
      medida: "",
      cantidad: 0,
    },
    fillDatosComplementarios: {
      kmActual: null,
      indisponibilidad: 0,
      generador: sessionStorage.getItem("NombreUsuario"),
    },
    fillComprobante: {
      nroFactura: null,
      nroRemito: null,
      fechaFactura: null,
    },
    fillTotal: {
      manoObra: null,
      repuesto: null,
      IVA: null,
    },
    dialog: false,
    tablaRepuestos: [],
    tablaServis: [],
    editedIndex: -1,
    editedItem: {
      cantidad: 0,
      medida: "",
      repuestoSeleccionado: null,
      repuestoSeleccionadoNombre: null,
      repuestoSeleccionadoId: null,
    },
    defaultItem: {
      cantidad: 0,
      medida: "",
      repuesto: 0,
    },
    cabeceras: [
      { text: "Cantidad", value: "cantidad" },
      { text: "Medida", value: "medida" },
      { text: "Repuesto", value: "repuestoSeleccionadoNombre" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    cabecerasServis: [
      { text: "ID SERVIS", value: "sep_id" },
      { text: "Unidad", value: "uni_id" },
      { text: "GASTO", value: "itg_id" },
      { text: "KM ACTUAL", value: "uni_kilometraje" },
      { text: "KM ULTIMO SERVIS", value: "sep_km_ult_servis" },
      { text: "KM CADA SERVIS", value: "sep_km_cada_servis" },
      { text: "KM PROXIMO SERVIS", value: "sep_km_prox_servis" },
      { text: "KM FALTANTE", value: "sep_km_faltantes" },
      { text: "FECHA ULTIMO SERVIS", value: "sep_fecha_ult_servis" },
      { text: "FECHA PROXIMO SERVIS", value: "sep_fec_prox_servis" },
    ],
    //urlBase: "https://localhost:5001/api/",
    //urlBase: "http://transporte.edese.local/API/api/",
    dialogDelete: false,
  }),
  mounted() {
    this.getListarUnidades();
    this.getListarManoObra();
    this.getListarRepuestos();
    this.getListarCuentasCorrientes();
    this.getListarMecanicos();
    //this.getListarServisXUnidad();
    //this.getUnidadXOT();
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    async getListarUnidades() {
      var respuesta;

      this.url = this.urlBase + "ot/recuperarunidades";

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };

      respuesta = await this.$http
        .get(this.url, config)
        .then((response) => response.data);

      this.fillNuevaOT.listaDeUnidades = respuesta;
    },

    async getListarManoObra() {
      var respuesta;

      this.url = this.urlBase + "ot/recuperarmanoobra";

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };

      respuesta = await this.$http
        .get(this.url, config)
        .then((response) => response.data);

      console.log("Las mano de obra son: ");
      console.log(respuesta);

      this.fillNuevaReparacion.listamanodeObra = respuesta;
    },

    cambioUnidad() {
      this.getKilometrajeXUnidad();
    },
    async getListarRepuestos() {
      var respuesta;

      this.url = this.urlBase + "ot/recuperarrepuestos";

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };

      respuesta = await this.$http
        .get(this.url, config)
        .then((response) => response.data);

      //console.log("Esto es lo que hay en la respuesta: ");
      //console.log(respuesta);
      this.fillNuevaRepuestos.listaRepuestos = respuesta;
      //this.editedItem.listaRepuestos = respuesta;
      //console.log(this.fillNuevaRepuestos.listaRepuestos);
    },

    async getListarCuentasCorrientes() {
      var respuesta;

      this.url = this.urlBase + "ot/recuperarcuentascorrientes";

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };

      respuesta = await this.$http
        .get(this.url, config)
        .then((response) => response.data);

      // console.log("Esto es lo que hay en cta: ");
      // console.log(respuesta);
      this.fillNuevaOT.ccn = respuesta;
      //this.editedItem.listaRepuestos = respuesta;
      //console.log(this.fillNuevaRepuestos.listaRepuestos);
    },

    async getListarMecanicos() {
      var respuesta;

      this.url = this.urlBase + "ot/recuperarmecanicos";

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };

      respuesta = await this.$http
        .get(this.url, config)
        .then((response) => response.data);

      // console.log("Esto es lo que hay en mecanicos: ");
      // console.log(respuesta);
      this.fillNuevaOT.listaDeMecanicos = respuesta;
      //this.editedItem.listaRepuestos = respuesta;
      //console.log(this.fillNuevaRepuestos.listaRepuestos);
    },

    async getNombreGenerador() {
      var respuesta;

      this.url = this.urlBase + "ot/recuperarnombregenerador";

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };

      respuesta = await this.$http
        .get(this.url, config)
        .then((response) => response.data);

      //console.log("Esto es lo que hay en la respuesta: ");
      //console.log(respuesta);
      this.fillDatosComplementarios.generador = respuesta;
      //this.editedItem.listaRepuestos = respuesta;
      //console.log(this.fillNuevaRepuestos.listaRepuestos);
    },

    async crearOT() {
      var respuesta;

      this.url = this.urlBase + "ot/ingresar";

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };

      var obj = {
        unidad: this.unidad.Unidad,
        kilometraje: this.fillDatosComplementarios.kmActual,
        tiempoI: this.fillDatosComplementarios.indisponibilidad,
        nota: this.fillNuevaReparacion.observacion,
        usuario: this.fillDatosComplementarios.generador,
        mecanico: this.mecanico,
        ctaCte: this.proveedor.ID,
      };

      respuesta = await this.$http
        .post(this.url, obj, config)
        .then((response) => response.data);

      console.log("Repuesta del Ingreso de OT");
      console.log(respuesta);
      this.idOT = respuesta[0].idOT;
      this.ingresarDetalleManoObraOT();
      //console.log("Esto es lo que hay en la respuesta: ");
      //console.log(respuesta);
      //this.fillDatosComplementarios.generador = respuesta;
    },

    async ingresarDetalleManoObraOT() {
      if (this.fillNuevaReparacion.manodeObra.length == 0) {
        console.log("No se ha seleccionado un proveedor");
        return;
      } else {
        console.log("Los proveedores seleccionados son: ");
        console.log(this.fillNuevaReparacion.manodeObra);

        this.url = this.urlBase + "ot/registrarDetallesManoOT";

        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
          },
        };

        var i = 0;

        while (i < this.fillNuevaReparacion.manodeObra.length) {
          console.log(this.fillNuevaReparacion.manodeObra[i].itg_id);
          var obj = {
            unidad: this.unidad.Unidad,
            item: this.fillNuevaReparacion.manodeObra[i].itg_id,
            idOT: this.idOT,
          };

          await this.$http
            .post(this.url, obj, config)
            .then((response) => response.data);

          i = i + 1;
        }
      }
    },

    async ingresarDetalleRepuestoOT() {
      if (this.tablaRepuestos.length == 0) {
        return;
      } else {
        console.log("Los proveedores seleccionados son: ");
        console.log(this.tablaRepuestos);

        this.url = this.urlBase + "ot/registrarDetallesRepuestosOT";

        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
          },
        };

        var i = 0;

        while (i < this.tablaRepuestos.length) {
          console.log(this.tablaRepuestos[i].itg_id);
          var obj = {
            unidad: this.unidad.Unidad,
            item: this.tablaRepuestos[i].repuestoSeleccionadoId,
            cantidad: this.tablaRepuestos[i].cantidad,
            medida: this.tablaRepuestos[i].medida,
            idOT: this.idOT,
          };

          await this.$http
            .post(this.url, obj, config)
            .then((response) => response.data);

          i = i + 1;
        }
      }
    },

    agregarRepuesto() {
      //console.log("Esto hay en la tabla: ");
      //console.log(this.tablaRepuestos);
      if (this.editedIndex > -1) {
        Object.assign(this.tablaRepuestos[this.editedIndex], this.editedItem);
      } else {
        this.tablaRepuestos.push(this.editedItem);
      }
      this.close();
    },

    cambioProveedor() {
      console.log("El proveedor seleccionado es:");
      console.log(this.proveedor.ID);

      if (this.proveedor.ID == 0) {
        this.cbMecanico = false;
      } else {
        this.cbMecanico = true;
      }
    },

    // async getListarServisXUnidad() {
    //   var respuesta;

    //   this.url = this.urlBase + "ot/recuperarservis";

    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
    //     },
    //   };

    //   var obj = {
    //     unidad: this.$route.params.datos.uni_id,
    //   };

    //   respuesta = await this.$http
    //     .post(this.url, obj, config)
    //     .then((response) => response.data);

    //   this.tablaServis = respuesta;
    // },

    // async getUnidadXOT() {
    //   var respuesta;

    //   this.url = this.urlBase + "ot/recuperarunidad";

    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
    //     },
    //   };

    //   var obj = {
    //     idOT: this.$route.params.datos.otr_id,
    //   };

    //   console.log("La OT es: ");
    //   console.log(obj);

    //   respuesta = await this.$http
    //     .post(this.url, obj, config)
    //     .then((response) => response.data);

    //   console.log("La unidad es: ");
    //   console.log(respuesta);

    //   this.unidad = respuesta[0].uni_id;

    //   this.getKilometrajeXUnidad();
    // },
    async getKilometrajeXUnidad() {
      var respuesta;

      this.url = this.urlBase + "ot/recuperarkilometraje";

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      };

      var obj = {
        unidad: this.unidad.Unidad,
      };

      console.log("La unidad es: ");
      console.log(obj);

      respuesta = await this.$http
        .post(this.url, obj, config)
        .then((response) => response.data);

      // console.log("El kilometraje es: ");
      // console.log(respuesta);

      this.fillDatosComplementarios.kmActual = respuesta[0].uni_kilometraje;
    },

    buscarManoObra() {
      if (!this.buscarEnManoObra) {
        this.fillNuevaOT.ccn = this.ccnCopia;
      }
      this.fillNuevaOT.ccn = this.ccnCopia.filter((manoObra) => {
        console.log("Voy a buscar: ");
        console.log(this.buscarEnManoObra);
        return (
          manoObra.toLowerCase().indexOf(this.buscarEnManoObra.toLowerCase()) >
          -1
        );
      });
    },

    cambioRepuesto() {
      this.editedItem.repuestoSeleccionadoId =
        this.editedItem.repuestoSeleccionado.itg_id;
      this.editedItem.repuestoSeleccionadoNombre =
        this.editedItem.repuestoSeleccionado.itg_descripcion;
    },

    editItem(item) {
      this.editedIndex = this.tablaRepuestos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    eliminarRepuestoConfirmar() {
      this.tablaRepuestos.splice(this.editedIndex, 1);
      this.closeDelete();
      //console.log("Esto hay en la tabla: ");
      //console.log(this.tablaRepuestos);
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    eliminarRepuesto(item) {
      this.editedIndex = this.tablaRepuestos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style></style>
