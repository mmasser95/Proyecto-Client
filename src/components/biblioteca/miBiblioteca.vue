<template>
  <div class="miBiblioteca">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">Mi Biblioteca</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table :items="biblioteca" :headers="headers">
            <template v-slot:items="props">
              <td>{{props.item.ISBN}}</td>
              <td>{{props.item.Titulo}}</td>
              <td>{{props.item.Autor}}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";
const apiService = new APIService();
export default {
  name: "miBiblioteca",
  computed: {
    ...mapGetters(["isLoggedIn"]),
    biblioteca: this.getMyBiblioteca()
  },
  data: () => ({
    headers: [
      { text: "ISBN", value: "ISBN" },
      { text: "Título", value: "Titulo" },
      { text: "Autor", value: "Autor" }
    ],
    biblioteca: [],
    autor: []
  }),
  methods: {
    async getMyBiblioteca() {
      let auxbiblio=[];
      apiService
        .getMyBiblioteca()
        .then((res1) => {
          auxbiblio=res1.data.biblioteca;
          apiService
            .getAutores()
            .then((res2) => {
              this.autor=res2.data.autores;
              apiService
                .getLibros()
                .then((res3) => {
                  this.libro=res3.data.libros.map((e)=>{
                    let autor=this.autor[this.autor.map((f)=>({f._id})).indexOf(e.Autor)];
                    e.Autor=`${autor.Nombre} ${autor.Apellidos}`
                    return e;
                  });
                  auxbiblio.map((e)=>{
                    this.biblioteca.push(this.libro[this.libro.map((f)=>({f._id})).indexOf(e.libroId)])
                  })
                }).catch((err) => {
                  window.alert(err)
                });
            }).catch((err) => {
              window.alert(err)
            });
        }).catch((err) => {
          window.alert(err)
        });
    },
    async deleteLibro(ids){
      apiService
        .deleteLibroMyBiblioteca(ids)
        .then((res) => {
          this.getMyBiblioteca();
        }).catch((err) => {
          window.alert(err)
        });
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    this.getMyBiblioteca();
  }
};
</script>
