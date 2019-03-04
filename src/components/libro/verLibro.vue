<template>
  <div class="verLibro">
    <v-container>
      <v-layout row wrap>
        <v-flex>
          <v-card>
            <v-card-title>
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12>
                    <h2 class="text-xs-center">{{ libro.Titulo }}</h2>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 sm4></v-flex>
                  <v-flex xs12 sm6>
                    <v-list>
                      <v-list-tile v-for="item in items" :key="item.id">
                        <v-list-tile-action>
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>{{
                            item.title
                          }}</v-list-tile-title>
                          <v-list-tile-sub-title>{{
                            item.sub
                          }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-icon></v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                    <hr />
                    <v-layout row wrap>
                      <v-flex v-if="tabla.ofertas.length">
                        <h1 class="text-xs-center my-3">Ofertas</h1>
                        <v-data-table
                          :headers="tabla.headers"
                          :items="tabla.ofertas"
                          class="elevation-1"
                        >
                          <template slot="items" slot-scope="props">
                            <td>{{ props.item.importe.$numberDecimal }}</td>
                            <td>{{ props.item.moneda }}</td>
                          </template>
                        </v-data-table>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm2></v-flex>
                </v-layout>
              </v-container>
            </v-card-title>
            <v-card-actions v-if="tipoUser.tipo == 'admin'">
              <v-spacer></v-spacer>
              <v-btn flat color="teal">Editar</v-btn>
              <v-btn flat color="red">Eliminar</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap> <v-flex></v-flex> </v-layout>
    </v-container>
  </div>
</template>

<script>
import { APIService } from "@/APIService";
import { mapGetters } from "vuex";
const apiService = new APIService();
export default {
  name: "verLibro",
  computed: {
    ...mapGetters(["isLoggedIn", "tipoUser"])
  },
  props: ["libroID"],
  data: () => {
    return {
      tabla: {
        ofertas: [],
        headers: [
          { text: "Importe", value: "importe" },
          { text: "Moneda", value: "moneda" }
        ]
      },
      libro: {},
      autor: {},
      items: []
    };
  },
  created: function() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    apiService
      .getLibro(this.libroID)
      .then(res => {
        this.libro = res.data.libro;
        let libro = this.libro;
        let items = this.items;
        items.push({
          id: 1,
          icon: "info",
          title: libro.ISBN,
          sub: "ISBN"
        });
        items.push({
          id: 2,
          icon: "book",
          title: libro.Editorial,
          sub: "Editorial"
        });

        if (this.libro.Autor)
          apiService
            .getAutor(this.libro.Autor)
            .then(res => {
              this.autor = res.data.autor;
              items.push({
                id: 3,
                icon: "face",
                title: this.autor.Nombre + " " + this.autor.Apellidos,
                sub: "Autor"
              });
            })
            .catch(err => {
              console.log(err);
            });
        apiService
          .getOfertasLibro(libro._id)
          .then(res => {
            this.tabla.ofertas = res.data.ofertas;
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
