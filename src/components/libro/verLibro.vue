<template>
  <div class="verLibro">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <h2 class="text-xs-center">{{ libro.Titulo }}</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm4></v-flex>
        <v-flex xs12 sm6>
          <v-list>
            <v-list-tile v-for="(item,i) in items" :key="i">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{
                  item.title
                  }}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{
                  item.sub
                  }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action v-if="item.action">
                <v-btn flat color="teal" :to="item.action">
                  <v-icon>exit_to_app</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <hr>
          <v-layout row wrap>
            <v-flex v-if="tabla.ofertas.length">
              <h1 class="text-xs-center my-3">Ofertas</h1>
              <v-data-table :headers="tabla.headers" :items="tabla.ofertas" class="elevation-1">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.importe.$numberDecimal }}</td>
                  <td>{{ props.item.moneda }}</td>
                  <td><v-btn dark color="teal" flat @click="addChart(props.item._id)">
                    <v-icon>shopping_cart</v-icon>
                  </v-btn></td>
                </template>
              </v-data-table>
            </v-flex>
            <v-flex xs12>
              <v-spacer></v-spacer>
              <v-btn flat color="teal" :to="pagEditar">Editar</v-btn>
              <v-btn flat color="red" @click="eliminarLibro">Eliminar</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm2></v-flex>
      </v-layout>
    </v-container>

    <div class="w-xs-100" v-if="tipoUser == 'admin'"></div>

    <v-dialog v-model="dialog" width="500">
      <v-card class="text-xs-center">
        <v-card-title>Guardado</v-card-title>
        <v-card-text>Guardado correctamente</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" flat @click="dialog=false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { APIService } from "@/APIService";
import { mapGetters } from "vuex";

const apiService = new APIService();
export default {
  name: "verLibro",
  computed: {
    ...mapGetters(["isLoggedIn", "tipoUser", "myChart"])
  },
  props: ["libroID"],
  data: () => ({
    dialog: false,
    tabla: {
      ofertas: [],
      headers: [
        { text: "Importe", value: "importe" },
        { text: "Moneda", value: "moneda" },
        {text: "Comprar", value:"_id"}
      ]
    },
    libro: {},
    pagEditar: "",
    autor: {},
    items: []
  }),
  methods: {
    eliminarLibro() {
      apiService
        .deleteLibro(this.libroID)
        .then(res => {
          window.alert("Borrado");
          this.$router.push("/buscarlibro");
        })
        .catch(err => {
          window.alert(`Ha habido un error ${err}`);
        });
    },
    addChart(ofertaId){
      let mycarro=this.myChart;
      
      let myOferta=this.tabla.ofertas[this.tabla.ofertas.map((e)=>e._id).indexOf(ofertaId)];
      let add2chart={
        oferta:myOferta,
        libro:this.libro,
        autor:this.autor,
      }
      console.log('mycarro :', mycarro);
      mycarro.push(add2chart);
      this.$store.dispatch({
        type:'setChart',
        chart:mycarro,
      });
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    document.getElementById("loader").style = "display:absolute;";
    this.pagEditar = `/editarLibro/${this.libroID}`;
    apiService
      .getLibro(this.libroID)
      .then(res => {
        this.libro = res.data.libro;
        const libro = this.libro;
        const items = this.items;
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

        if (this.libro.Autor) {
          apiService
            .getAutor(this.libro.Autor)
            .then(res => {
              this.autor = res.data.autor;
              items.push({
                id: 3,
                icon: "face",
                title: `${this.autor.Nombre} ${this.autor.Apellidos}`,
                sub: "Autor",
                action: `/verAutor/${this.autor._id}`
              });
              document.getElementById("loader").style = "display:none;";
            })
            .catch(err => {
              document.getElementById("loader").style = "display:none;";
              console.log(err);
            });
        }
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
