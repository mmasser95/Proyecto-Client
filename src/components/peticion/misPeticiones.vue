<template>
  <div class="misPeticiones">
    <v-container>
      <v-layout row wrap class="my-3">
        <v-flex xs12>
          <h1 class="text-xs-center">Mis peticiones</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-3">
        <v-flex xs12>
          <h2 class="text-xs-center">Libros</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-3">
        <v-flex xs12>
          <v-data-table :items="peticiones.libro" :headers="headers.libro" class="elevation-1">
            <template v-slot:items="props">
              <td>{{props.item.ISBN}}</td>
              <td>{{props.item.Titulo}}</td>
              <td>{{props.item.Autor}}</td>
              <td>{{props.item.Genero}}</td>
              <td>{{props.item.Estado}}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-3">
        <v-flex xs12>
          <h2 class="text-xs-center">Autores</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-3">
        <v-flex xs12>
					<v-data-table :items="peticiones.autor" :headers="headers.autor">
						<template v-slot:items="props">
							<td>{{props.item.Nombre}}</td>
							<td>{{props.item.Apellidos}}</td>
							<td>{{props.item.Fecha_nacimiento}}</td>
							<td>{{props.item.Estado}}</td>
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
import moment from "moment";
const apiService = new APIService();
export default {
  name: "misPeticiones",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  data: () => ({
    peticiones: {
      libro: [],
      autor: []
    },
    autor: [],
    headers: {
      libro: [
        { text: "ISBN", value: "ISBN" },
        { text: "Titulo", value: "Titulo" },
        { text: "Autor", value: "Autor" },
        { text: "Género", value: "Genero" },
        { text: "Estado", value: "Estado" }
      ],
      autor: [
				{text:'Nombre', value:'Nombre'},
				{text:'Apellidos', value:'Apellidos'},
				{text:'Fecha Nacimiento', value:'Fecha_nacimiento'},
				{text:'Estado', value:'Estado'}
			]
    }
  }),
  methods: {
    async getPeticionesLibro() {
      apiService
        .getMyPeticionesLibro()
        .then(res => {
          this.peticiones.libro = res.data.peticiones;
          this.peticiones.libro.map(e => {
            if (e.Estado == 0) e.Estado = "Pendiente";
            else if (e.Estado == 1) e.Estado = "Denegado";
            else if (e.Estado == 2) e.Estado = "Aprobada";

            if (e.Autor) {
              const vID = this.autor.map(v => v._id).indexOf(e.Autor);
              console.log("vID :", vID);
              e.Autor = `${this.autor[vID].Nombre} ${
                this.autor[vID].Apellidos
              }`;
            }
          });
        })
        .catch(err => {
          console.log("Error" + err);
        });
    },
    async getPeticionesAutor() {
      apiService
        .getMyPeticionesAutor()
        .then(res => {
          this.peticiones.autor = res.data.peticiones;
          this.peticiones.autor.map(e => {
            if (e.Estado == 0) e.Estado = "Pendiente";
            else if (e.Estado == 1) e.Estado = "Denegado";
						else if (e.Estado == 2) e.Estado = "Aprobada";
						if(e.Fecha_nacimiento)e.Fecha_nacimiento=moment(e.Fecha_nacimiento).format("DD/MM/YYYY")
          });
        })
        .catch(err => {
          console.log("Error " + err);
        });
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    apiService
      .getAutores()
      .then(res => {
        this.autor = res.data.autores;
        this.getPeticionesLibro();
        console.log("this.autor :", this.autor);
      })
      .catch(err => {
        window.alert("Error");
      });

    this.getPeticionesAutor();
  }
};
</script>

<style>
</style>
