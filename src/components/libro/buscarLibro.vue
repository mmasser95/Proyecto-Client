<template>
  <div class="buscarLibro">
    <v-data-table :headers="tabla.headers" :items="tabla.libros" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.ISBN }}</td>
        <td>{{ props.item.Titulo }}</td>
        <td>{{ props.item.Editorial }}</td>
        <td>{{ props.item.Edicion }}</td>
        <td>{{ props.item.Autor }}</td>
        <td>
          <v-btn :to="props.item.Ver" color="teal" dark>
            <v-icon>remove_red_eye</v-icon>
          </v-btn>
        </td>
        <td>
          <v-btn color="teal" dark :to="props.item.Oferta">
            <v-icon>remove_red_eye</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";
const apiService = new APIService();
export default {
  name: "buscarLibro",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  data: () => {
    return {
      autores: [],
      tabla: {
        libros: [],
        headers: [
          { text: "ISBN", value: "ISBN" },
          { text: "Titulo", value: "Edicion" },
          { text: "Editorial", value: "Editorial" },
          { text: "Edicion", value: "Titulo" },
          { text: "Autor", value: "Autor" },
          { text: "Ver", value: "Ver" },
          { text: "Oferta", value: "Oferta" }
        ]
      }
    };
  },
  mounted: function() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    apiService
      .getAutores()
      .then(res => {
        this.autores = res.data.autores;
        console.log(this.autores);
      })
      .catch(err => {
        console.log(`Error ${err}`);
        return false;
      });
    apiService
      .getLibros()
      .then(res => {
        let libros = res.data.libros;
        for (let libro of libros) {
          if (libro.Autor) {
            console.log(libro.Autor);
            let autor = this.autores
              .map(function(e) {
                return e._id;
              })
              .indexOf(libro.Autor);
            if (autor) {
              libro.Autor =
                this.autores[autor].Nombre +
                " " +
                this.autores[autor].Apellidos;
            }
          }
          libro.Ver = `/verLibro/${libro._id}`;
          libro.Oferta = `/nuevaOferta/${libro._id}`;
        }
        this.tabla.libros = libros;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
