<template>
  <!-- <div class="ma-12 pa-12"> -->
  <div>
    <v-card>
      <v-navigation-drawer permanent expand-on-hover color="#2f4050">
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
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
            color="white"
            class="white--text"
          >
            <template v-slot:activator>
              <v-list-item link class="color-white">
                <v-list-item-title
                  v-text="item.title"
                  class="white--text"
                ></v-list-item-title>
              </v-list-item>
            </template>

            <v-list-item
              v-for="child in item.items"
              :key="child.title"
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
                  v-text="child.title"
                ></v-list-item-title>
              </v-list-item>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    prefijoIcon: "mdi",
    items: [
      {
        action: "mdi-account-group",
        title: "Mis Pacientes",
        items: [{ title: "Atenciones", icon: "exclamation-thick" }],
      },
      {
        action: "mdi-cash",
        active: true,
        title: "Mi Facturacion",
        items: [{ title: "Estado de Cuenta", icon: "clipboard-list-outline" }],
      },
      {
        action: "mdi-send",
        title: "Comunicacion",
        items: [
          { title: "Documentacion", icon: "file-document-outline" },
          { title: "Aranceles", icon: "currency-usd" },
        ],
      },
      {
        action: "mdi-text-box-search-outline",
        title: "Investigacion",
        items: [
          { title: "Revista Digital", icon: "newspaper-variant-multiple" },
        ],
      },
    ],
  }),
};
</script>
