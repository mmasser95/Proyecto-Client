<template>
  <div class="buscarAutor">
    <v-container fluid grid-list-md>
      <v-data-iterator :items="autores" row wrap content-tag="v-layout">
        <template v-slot:item="props">
          <v-flex xs12 sm6 md4 lg3>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{props.item.Nombre}} {{props.item.Apellidos}}</div>
                  <span class="grey--text">{{props.item.Fecha_nacimiento}}</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="teal" :to="`/verAutor/${props.item._id}`">
                  <v-icon>remove_red_eye</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";
import moment from "moment";
const apiService = new APIService();
export default {
  name: "BuscarAutor",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  data: () => {
    return {
      autores: []
    };
  },
  methods: {},
  created: function() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    document.getElementById("loader").style = "display:absolute;";
    apiService
      .getAutores()
      .then(res => {
        document.getElementById("loader").style = "display:none;";
        this.autores = res.data.autores;
        this.autores.map(e => {
          if (e.Fecha_nacimiento)
            e.Fecha_nacimiento = moment(e.Fecha_nacimiento).format(
              "DD/MM/YYYY"
            );
        });
      })
      .catch(err => {
        document.getElementById("loader").style = "display:none;";
        console.log(err);
      });
  }
};
</script>
