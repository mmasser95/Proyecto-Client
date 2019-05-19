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
              <td>{{props.item.importe.$numberDecimal}}</td>
              <td>{{props.item.estado}}</td>
              <td><v-btn flat color="teal" :to="`/verOferta/${props.item._id}`">
                <v-icon>exit_to_app</v-icon>
              </v-btn></td>
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
    headers: [],
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
            if(e.estado==1)e.estado='En oferta';
            if(e.estado==0)e.estado='Pedido';
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
