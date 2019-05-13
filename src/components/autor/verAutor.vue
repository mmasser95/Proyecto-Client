<template>
  <div class="verAutor">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <h2 class="text-xs-center mb-3">{{getAutorProp('Nombre')}} {{getAutorProp('Apellidos')}}</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-list>
            <v-list-tile v-for="(item,k) in autor" :key="k">
              <v-list-tile-action></v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{item.value}}</v-list-tile-title>
                <v-list-tile-sub-title>{{item.name}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
      <div class="my-4">
        <hr>
      </div>
      <v-layout row wrap v-if="librosAutor.length">
        <v-flex xs12>
          <h2 class="text-xs-center mb-3">Libros</h2>
          <v-data-table
            :headers="headers"
            :items="librosAutor"
            rows-per-page-items="5"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{props.item.Titulo}}</td>
              <td>
                <v-btn flat color="teal" :to="'/verLibro/'+props.item._id" dark>
                  <v-icon>remove_red_eye</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="tipoUser == 'admin'">
        <v-flex xs12>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" :to="`/editarAutor/${autor._id}`">Editar</v-btn>
          <v-btn flat color="red" @click="eliminarLibro(autor._id)">Eliminar</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";
import moment from "moment";
const apiService = new APIService();
export default {
  name: "VerAutor",
  props: ["autorId"],
  computed: {
    ...mapGetters(["isLoggedIn", "tipoUser"])
  },
  data: () => {
    return {
      autor: [],
      librosAutor: [],
      headers: [
        { text: "Título", value: "Titulo" },
        { text: "Ver", value: "_id" }
      ]
    };
  },
  methods: {
    getAutorProp(nombre) {
      return this.autor[this.autor.map(e => e.name).indexOf(nombre)].value;
    },
    eliminarAutor(ids) {
      apiService
        .deleteLibroAutor(ids)
        .then(res => {
          apiService
            .deleteAutor(ids)
            .then(res2 => {
              window.alert("Borrado correctamente");
            })
            .catch(err => {
              console.log("err :", err);
            });
        })
        .catch(err => {
          console.log("err :", err);
        });
    }
  },
  created: function() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    document.getElementById("loader").style = "display:absolute;";
    apiService
      .getAutor(this.autorId)
      .then(res => {
        for (const i in res.data.autor) {
          if (i == "__v" || i == "_id") continue;
          if (i == "Fecha_nacimiento") {
            this.autor.push({
              name: "Fecha de nacimiento",
              value: moment(res.data.autor[i]).format("DD/MM/YYYY")
            });
            continue;
          }
          this.autor.push({ name: i, value: res.data.autor[i] });
        }
        document.getElementById("loader").style = "display:none;";
      })
      .catch(err => {
        document.getElementById("loader").style = "display:none;";
        console.log(err);
      });
    apiService
      .getLibrosAutor(this.autorId)
      .then(res => {
        this.librosAutor = res.data.libros;
      })
      .catch(err => {
        console.log(err);
        document.getElementById("loader").style = "display:none;";
      });
  }
};
</script>
