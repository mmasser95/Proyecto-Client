<template>
  <div class="verOferta">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">Oferta {{oferta._id}}</h1>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm3></v-flex>
        <v-flex xs12 sm6>
          <v-img :src="`https://www.walabook.tk/img/${oferta.Imagen}`" :aspect-ratio="4/3"></v-img>
          <v-list>
            <v-list-tile v-for="(item, i) in items" :key="i">
              <v-list-tile-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
                <v-list-tile-sub-title>{{item.sub}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action v-if="item.action">
                <v-btn flat color="teal" :to="item.action">
                  <v-icon>exit_to_app</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex xs12 sm3></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";

const apiService = new APIService();
export default {
  name: "verOferta",
  computed: {
    ...mapGetters(["isLoggedIn", "myId"])
  },
  props: ["ofertaId"],
  data: () => ({
    oferta: {},
    libro: {},
    autor: {},
    user: {},
    items: []
  }),
  mounted() {},
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    apiService
      .getMyUser()
      .then(res => {
        this.user = res.data.user;
      })
      .catch(err => {});
    apiService
      .getOferta(this.ofertaId)
      .then(res1 => {
        this.oferta = res1.data.oferta;
        apiService
          .getLibro(this.oferta.id_libro)
          .then(res2 => {
            this.libro = res2.data.libro;
            apiService
              .getAutor(this.libro.Autor)
              .then(res3 => {
                this.autor = res3.data.autor;
                const items = this.items;
                items.push(
                  {
                    icon: "book",
                    title: this.libro.Titulo,
                    sub: "Libro",
                    action: `/verLibro/${this.libro._id}`
                  },
                  {
                    icon: "face",
                    title: `${this.autor.Nombre} ${this.autor.Apellidos}`,
                    sub: "Autor",
                    action: `/verAutor/${this.autor._id}`
                  },
                  {
                    icon: "account_circle",
                    title: this.user.username,
                    sub: "Usuario"
                  },{
                    icon:'edit',
                    title:this.oferta.defectos,
                    sub:'Defectos'
                  },{
                    icon:'shopping_cart',
                    title:this.oferta.importe.$numberDecimal+" €",
                    sub:'Importe'
                  }
                );
              })
              .catch(err3 => {
                window.alert(`Error al cargar el libro ${err2}`);
                this.$router.go(-1);
              });
          })
          .catch(err2 => {
            window.alert(`Error al cargar el libro ${err2}`);
            this.$router.go(-1);
          });
      })
      .catch(err1 => {
        window.alert(`Error al cargar la oferta ${err1}`);
        this.$router.go(-1);
      });
  }
};
</script>

<style>
</style>
