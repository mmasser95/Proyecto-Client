<template>
  <v-app>
    <v-toolbar app dark color="teal">
      <v-toolbar-side-icon @click.stop="drawer = !drawer;"></v-toolbar-side-icon>
      <v-toolbar-title class="font-weight-black">WalaBook</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-if="!isLoggedIn" to="/login">
          <v-icon v-if="!isLoggedIn">lock</v-icon>Login
        </v-btn>
        <v-btn flat v-if="isLoggedIn">
          <v-icon>lock_open</v-icon>
          Hola {{ myInfo.email.username }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-up">
        <v-btn icon>
          <v-icon>drag_indicator</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" id="navi" absolute temporary>
      <v-img
        v-if="isLoggedIn.token"
        :aspect-ratio="16 / 9"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      >
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">{{ myInfo.email.username }}</div>
            <div class="body-1">{{ myInfo.email.email }}</div>
          </v-flex>
        </v-layout>
      </v-img>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <div v-for="item in menuses" :key="item.title">
          <!-- Item sin submenu -->
          <v-list-tile :to="item.href" v-if="item.href">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- Item con submenu -->
          <v-list-group :prepend-icon="item.icon" v-if="item.submenu">
            <v-list-tile slot="activator">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
            <!-- Creación del submenu -->
            <v-list-tile v-for="sub in item.submenu" :key="sub.title" :to="sub.href">
              <v-list-tile-title v-text="sub.title"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="sub.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <v-layout>
          <v-flex>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app dark height="auto">
      <v-card class="flex" flat tile>
        <v-card-actions class="grey darken-3 justify-center">&copy;2019 -
          <strong>Martí Masot</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["isLoggedIn", "myInfo", "tipoUser"]),
    menuses: function() {
      if (this.isLoggedIn) {
        if (this.tipoUser.tipo === "user") {
          return [
            { title: "Home", icon: "dashboard", href: "/" },
            {
              title: "Libros",
              icon: "book",
              submenu: [
                {
                  title: "Buscar Libro",
                  icon: "search",
                  href: "/buscarLibro"
                }
              ]
            },
            {
              title: "Autores",
              icon: "face",
              submenu: [
                {
                  title: "Buscar Autor",
                  icon: "search",
                  href: "/buscarAutor"
                }
              ]
            },
            {
              title: "Mi perfil",
              icon: "account_circle",
              submenu: [
                { title: "Mis Ofertas", icon: "euro_symbol", href: "/oferta" },
                {
                  title: "Mis Direcciones",
                  icon: "picture_in_picture",
                  href: "/misdirecciones"
                },
                { title: "Mis Pedidos", icon: "inbox", href: "/pedido" }
              ]
            },

            { title: "About", icon: "question_answer", href: "/about" }
          ];
        } else if (this.tipoUser.tipo === "admin") {
          return [
            { title: "Home", icon: "dashboard", href: "/" },
            {
              title: "Libros",
              icon: "book",
              submenu: [
                {
                  title: "BuscarLibro",
                  icon: "search",
                  href: "/buscarLibro"
                },
                { title: "Subir Libro", icon: "backup", href: "/nuevolibro" }
              ]
            },
            {
              title: "Autores",
              icon: "face",
              submenu: [
                {
                  title: "Buscar Autor",
                  icon: "search",
                  href: "/buscarAutor"
                },
                { title: "Subir Autor", icon: "backup", href: "/nuevoAutor" }
              ]
            }
          ];
        }
      }
      return [
        { title: "Home", icon: "dashboard", href: "/" },
        { title: "Login", icon: "account_circle", href: "/login" },
        { title: "Admin Login", icon: "vpn_key", href: "/admin" },
        { title: "Registro", icon: "create", href: "/registro" }
      ];
    }
  },
  data: () => {
    return {
      drawer: null
    };
  },
  methods: {},
  created:function(){
    this.$router.push('/');
  }
};
</script>
<style>
.application {
  font-family: Exo !important;
}
#navi{
  position: fixed;
}
</style>

<style scoped>
.v-navigation-drawer {
  transition: none !important;
}

.lightbox {
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
</style>
