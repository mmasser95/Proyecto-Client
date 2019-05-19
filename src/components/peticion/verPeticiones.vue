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
                  <v-img
                    :src="`https://www.walabook.tk/img/${props.item.Imagen}`"
                    v-if="props.item.Imagen"
                    :aspect-ratio="3/4"
                  ></v-img>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{props.item.Titulo}}</div>
                      <div class="grey--text">{{props.item.Autor}} ({{props.item.Editorial}})</div>
                      <div class="grey--text">ISBN: {{props.item.ISBN}}</div>
                      <div class="grey--text">Subido por: {{props.item.User}}</div>
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
                  <v-img
                    :src="`https://www.walabook.tk/img/${props.item.Imagen}`"
                    v-if="props.item.Imagen"
                    aspect-ratio="1.5"
                  ></v-img>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{props.item.Nombre}} {{props.item.Apellidos}}</div>
                      <div class="grey--text">{{props.item.Fecha_nacimiento}}</div>
                      <div class="grey--text">Subido por: {{props.item.User}}</div>
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
        .getUsers()
        .then(res => {
          let users = res.data.users;
          apiService
            .getPeticionesAutor()
            .then(res2 => {
              let autores = res2.data.peticiones;
              autores.map(e => {
                let uii = users.map((f)=>{return f._id}).indexOf(e.User);
                e.Fecha_nacimiento = moment(e.Fecha_nacimiento).format(
                  "DD/MM/YYYY"
                );
                e.User = users[uii].username;
                return e;
              });
              this.peticionesAutor = autores;
            })
            .catch(err => {
              console.log(err);
            });
          apiService
            .getPeticionesLibro()
            .then(res2 => {
              this.peticionesLibro = res2.data.peticiones;
              apiService
                .getAutores()
                .then(res3 => {
                  const libros = this.peticionesLibro;
                  let autores = res3.data.autores;
                  this.peticionesLibro = libros.map(e => {
                    let ai = autores
                      .map(f => {
                        return f._id;
                      })
                      .indexOf(e.Autor);
                    let ui = users
                      .map(g => {
                        return g._id;
                      })
                      .indexOf(e.User);
                    e.Autor = `${autores[ai].Nombre} ${autores[ai].Apellidos}`;
                    e.User = users[ui].username;
                    return e;
                  });
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {console.log('err :', err);});
    }
  },
  created: function() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    document.getElementById("loader").style = "display:absolute;";
    this.obtenerPeticiones();
    document.getElementById("loader").style = "display:none;";
  }
};
</script>
