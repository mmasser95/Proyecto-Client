<template>
  <v-app>
    <div id="loader">
      <div></div>
    </div>
    <v-toolbar app dark color="teal">
      <v-toolbar-side-icon @click.stop="drawer = !drawer;"></v-toolbar-side-icon>
      <v-toolbar-title class="font-weight-black">WalaBook</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-if="!isLoggedIn" to="/login">
          <v-icon v-if="!isLoggedIn">lock</v-icon>Login
        </v-btn>
        <v-btn flat v-if="!isLoggedIn" to="/registro">
          <v-icon v-if="!isLoggedIn">create</v-icon>Registro
        </v-btn>
        <v-btn flat v-if="isLoggedIn" to="/verPerfil">
          <v-icon>account_circle</v-icon>
          Hola {{ myInfo.username }}
        </v-btn>
        <v-btn flat v-if="isLoggedIn" @click='logout'>
          <v-icon>exit_to_app</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-up">
        <v-btn flat v-if="!isLoggedIn" to="/login">
          <v-icon v-if="!isLoggedIn">lock</v-icon>
        </v-btn>
        <v-btn flat v-if="!isLoggedIn" to="/registro">
          <v-icon v-if="!isLoggedIn">create</v-icon>
        </v-btn>
        <v-btn flat v-if="isLoggedIn" to="/verPerfil">
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-btn flat v-if="isLoggedIn" @click='logout'>
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" id="navi" absolute temporary>
      <v-img
        id="imagenMenu"
        v-if="isLoggedIn"
        :aspect-ratio="16 / 9"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      >
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">{{ myInfo.username }}</div>
            <div class="body-1">{{ myInfo.email }}</div>
          </v-flex>
        </v-layout>
      </v-img>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <div v-for="(item,i) in menuses" :key="i">
          <!-- Item sin submenu -->
          <v-list-tile :to="item.href" v-if="item.href">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- END Item sin submenu -->
          <!-- Item con submenu -->
          <v-list-group :prepend-icon="item.icon" v-if="item.submenu">
            <v-list-tile slot="activator">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
            <!-- Creación del submenu -->
            <v-list-tile v-for="(sub,k) in item.submenu" :key="k" :to="sub.href">
              <v-list-tile-title v-text="sub.title"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="sub.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <!-- END Creación del submenu -->
          </v-list-group>
          <!-- END Item con submenu -->
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
        <v-card-actions class="grey darken-3 justify-center">
          &copy;2019 -
          <strong>Martí Masot</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { APIService } from '@/APIService';

const apiService = new APIService();
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn', 'myInfo', 'tipoUser']),
    menuses() {
      if (this.isLoggedIn) {
        if (this.tipoUser === 'user') {
          return [
            { title: 'Home', icon: 'dashboard', href: '/' },
            {
              title: 'Libros',
              icon: 'book',
              submenu: [
                {
                  title: 'Buscar libro',
                  icon: 'search',
                  href: '/buscarLibro',
                },
                {
                  title: 'Nueva petición',
                  icon: 'bookmark',
                  href: '/nuevaPeticionLibro'
                },
              ],
            },
            {
              title: 'Autores',
              icon: 'face',
              submenu: [
                {
                  title: 'Buscar autor',
                  icon: 'search',
                  href: '/buscarAutor',
                },
                {
                  title: 'Nueva petición',
                  icon: 'bookmark',
                  href: '/nuevaPeticionAutor'
                },
              ],
            },
            {
              title: 'Mi rincón',
              icon: 'account_circle',
              submenu: [
                { title: 'Mis ofertas', icon: 'euro_symbol', href: '/oferta' },
                { title: 'Mis pedidos', icon: 'inbox', href: '/pedido' },
                {
                  title: 'Mis peticiones', icon: 'bookmarks', href: '/peticion',
                },
                {
                  title: 'Mi perfil',
                  icon: 'account_circle',
                  href: '/verPerfil',
                },
              ],
            },

            { title: 'About', icon: 'question_answer', href: '/about' },
          ];
        } else if (this.tipoUser === 'admin') {
          return [
            { title: 'Home', icon: 'dashboard', href: '/' },
            {
              title: 'Libros',
              icon: 'book',
              submenu: [
                {
                  title: 'Buscar libro',
                  icon: 'search',
                  href: '/buscarLibro',
                },
                { title: 'Subir libro', icon: 'backup', href: '/nuevolibro' },
              ],
            },
            {
              title: 'Autores',
              icon: 'face',
              submenu: [
                {
                  title: 'Buscar autor',
                  icon: 'search',
                  href: '/buscarAutor',
                },
                { title: 'Subir Autor', icon: 'backup', href: '/nuevoAutor' },
              ],
            },
            {
              title:'Peticiones',
              icon:'bookmarks',
              href:'/verPeticiones',
            },
          ];
        }
      }
      return [
        { title: 'Home', icon: 'dashboard', href: '/' },
        { title: 'Login', icon: 'account_circle', href: '/login' },
        { title: 'Admin login', icon: 'vpn_key', href: '/admin' },
        { title: 'Registro', icon: 'create', href: '/registro' },
      ];
    },
  },
  data: () => ({
    drawer: null,
    paraActualizar:0,
  }),
  methods: {
    logout() {
      localStorage.clear();
      this.$router.go({ path: '/'});
    },
  },
  beforeCreate() {
    const t = localStorage.getItem('storeToken');
    if (t) {
      const tip = localStorage.getItem('storeTipo');
      if (tip == 'admin') {
        console.log('admin');
        apiService
          .verificarAdminLogin({ token: t })
          .then((result) => {
            this.$store.dispatch({
              type: 'initin',
              token: result.data.token,
              idd: localStorage.getItem('storeIdd'),
              tipo: result.data.tipo,
              email: localStorage.getItem('storeEmail'),
              username: localStorage.getItem('storeUsername'),
            });
          })
          .catch((err) => {
            localStorage.clear();
            this.$router.go({ path: '/', force: true });
          });
      } else {
        apiService
          .verificarLogin({ token: t })
          .then((result) => {
            this.$store.dispatch({
              type: 'initin',
              token: result.data.token,
              idd: localStorage.getItem('storeIdd'),
              tipo: result.data.tipo,
              email: localStorage.getItem('storeEmail'),
              username: localStorage.getItem('storeUsername'),
            });
          })
          .catch((err) => {
            localStorage.clear();
            this.$router.go({ path: '/', force: true });
          });
      }
    }

    console.log(this.isLoggedIn);
  },
};

</script>
<style>
.application {
  font-family: Exo !important;
}
#navi {
  position: fixed;
}
#loader{
  position: fixed;
  width: 100vw;
  z-index: 3;
  height: 100vh;
  background-color: #ffffff
}
#loader > div{
  position: inherit;
  z-index: inherit;
  left: 55%;
  bottom: 45%;
  margin: -75px 0 0 -75px;
  border-bottom: 16px solid teal;
  /*border-right: 16px solid teal;*/
  border-top: 16px solid #333;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0%{ transform: rotate(0deg); }
  100%{ transform: rotate(360deg);}
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
