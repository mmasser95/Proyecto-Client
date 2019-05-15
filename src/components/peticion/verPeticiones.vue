<template>
  <div class="verPeticiones">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 class="my-3">
          <h1 class="text-xs-center">Peticiones</h1>
        </v-flex>
        <hr>
        <v-flex xs12 class="my-3">
          <h3 class="text-xs-center">Libros</h3>
        </v-flex>
        <v-flex xs12 class="my-3">
          <v-data-iterator :items="peticionesLibro">
            <template v-slot:item="props">
              <v-flex xs12 sm6 md4 lg3>
                <v-card>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{props.item.Titulo}}</div>
                      <span class="grey--text">{{props.item.Autor}}</span>
                    </div>
                  </v-card-title>
                  <v-card-text></v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="green" @click="aceptarPeticion(props.item._id, 'libro')">Ok</v-btn>
                    <v-btn flat color="red" @click="denegarPeticion(props.item._id,'libro')">Borrar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </template>
          </v-data-iterator>
        </v-flex>
        <v-flex class="my-3">
          <h3 class="text-xs-center">Autores</h3>
        </v-flex>
        <v-flex class="my-3">
          <v-data-iterator :items="peticionesAutor">
            <template v-slot:item="props">
              <v-flex xs12 sm6 md4 lg3>
                <v-card>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{props.item.Nombre}} {{props.item.Apellidos}}</div>
                      <span class="grey--text">{{props.item.Fecha_nacimiento}}</span>
                    </div>
                  </v-card-title>
                  <v-card-text></v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="green" @click="aceptarPeticion(props.item._id,'autor')">Ok</v-btn>
                    <v-btn flat color="red" @click="denegarPeticion(props.item._id,'autor')">Borrar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </template>
          </v-data-iterator>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { APIService } from "@/APIService";
import { mapGetters } from "vuex";
import moment from "moment";

const apiService = new APIService();
export default {
  name: "verPeticiones",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  data: () => {
    return {
      peticionesAutor: [],
      peticionesLibro: []
    };
  },
  methods: {
    aceptarPeticion(ids, tipo) {
      console.log("ids :", ids);
      if (tipo == "autor") {
        apiService
          .aceptarPeticionAutor(ids)
          .then(res => {
            window.alert("Guardado");
            this.obtenerPeticiones();
          })
          .catch(err => {
            window.alert(err);
          });
      } else if (tipo == "libro") {
        apiService
          .aceptarPeticionLibro(ids)
          .then(res => {
            window.alert("Guardado");
            this.obtenerPeticiones();
          })
          .catch(err => {
            window.alert(err);
          });
      }
    },
    denegarPeticion(ids, tipo) {
      if (tipo == "libro") {
        apiService
          .denegarPeticionLibro(ids)
          .then(res => {
            window.alert("Denegada");
            this.obtenerPeticiones();
          })
          .catch(err => {
            window.alert("Error");
          });
      } else if (tipo == "autor") {
        apiService
          .denegarPeticionAutor(ids)
          .then(res => {
            window.alert("Denegada");
            this.obtenerPeticiones();
          })
          .catch(err => {
            window.alert("Error");
          });
      }
    },
    obtenerPeticiones() {
      this.peticionesAutor = [];
      this.peticionesLibro = [];
      apiService
        .getPeticionesAutor()
        .then(res => {
          let autores = res.data.peticiones;
          autores.map(e => {
            e.Fecha_nacimiento = moment(e.Fecha_nacimiento).format(
              "DD/MM/YYYY"
            );
          });
          this.peticionesAutor = autores;
        })
        .catch(err => {
          console.log(err);
        });
      apiService
        .getPeticionesLibro()
        .then(res => {
          this.peticionesLibro = res.data.peticiones;
          apiService
            .getAutores()
            .then(res => {
              const libros = this.peticionesLibro;
              let autores = res.data.autores;
              for (let libro of libros) {
                if (libro.Autor) {
                  const autor = autores.map(e => e._id).indexOf(libro.Autor);
                  if (autor) {
                    libro.Autor = `${autores[autor].Nombre} ${
                      autores[autor].Apellidos
                    }`;
                  }
                }
              }
              this.peticionesLibro = libros;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created: function() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    this.obtenerPeticiones();
  }
};
</script>
