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

      <v-btn icon>
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
              LEMA FERNANDO RAUL
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
    </v-navigation-drawer>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
  data: () => {
    return {
      drawer: null,
      prefijoIcon: "mdi",
      items: [
        {
          action: "mdi-account-group",
          text: "Mis Pacientes",
          items: [{ text: "Atenciones", icon: "exclamation-thick" }],
        },
        {
          action: "mdi-cash",
          active: true,
          text: "Mi Facturacion",
          items: [{ text: "Estado de Cuenta", icon: "clipboard-list-outline" }],
        },
        {
          action: "mdi-send",
          text: "Comunicacion",
          items: [
            { text: "Documentacion", icon: "file-document-outline" },
            { text: "Aranceles", icon: "currency-usd" },
          ],
        },
        {
          action: "mdi-text-box-search-outline",
          text: "Investigacion",
          items: [
            { text: "Revista Digital", icon: "newspaper-variant-multiple" },
          ],
        },
      ],
    };
  },

  methods: {
    mostrarMenu() {
      console.log("El valor del drawer es ");
      console.log(this.drawer);
      this.drawer = !this.drawer;
    },

    obtenerNombreDireccion(item) {
      console.log(item);
    },
  },
};
</script>
