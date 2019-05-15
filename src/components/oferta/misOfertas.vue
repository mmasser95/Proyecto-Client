<template>
  <div class="misOfertas">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">Mis Ofertas</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table :items="ofertas" :headers="headers">
            <template v-slot:items="props">
              <td>{{props.item.titulo}}</td>
              <td>{{props.item.editorial}}</td>
              <td>{{props.item.importe}}</td>
              <td>{{props.item.estado}}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";

const apiService = new APIService();
export default {
  name: "misOfertas",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  data: () => ({
    ofertas: [],
    headers: [{ text: "", value: "" }],
    libros: []
  }),
  methods: {
    getMisOfertas() {
      apiService
        .getMyOfertas()
        .then(res => {
          this.ofertas = res.data.ofertas.map(e => {
            let l = this.libros
              .map(f => {
                return f._id;
              })
              .indexOf(e.id_libro);
            e.titulo = this.libros[l].Titulo;
            e.editorial = this.libros[l].Editorial;
            return e;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    apiService
      .getLibros()
      .then(res => {
        this.libros = res.data.libros;
        this.getMisOfertas();
      })
      .catch(err => {
        window.alert(err);
      });
  }
};
</script>
