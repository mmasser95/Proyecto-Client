<template>
  <div class="verChart">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">Ver carrito</h1>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm3></v-flex>
        <v-flex xs12 sm6>
          <v-list two-line>
            <v-data-iterator :items="myChart">
              <template v-slot:item="props">
                <v-list-tile>
                  <v-list-tile-avatar>
                    <img :src="props.item.Imagen" :to="`/verOferta/${props.item.ofertaId}`">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <h3 :to="`/verLibro/${props.item.libroId}`">{{props.item.Titulo}}</h3>
                      <p class="text-secondary" :to="`/verAutor/${props.item.autorId}`">{{props.item.Autor}}</p>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{props.item.userId}}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action></v-list-tile-action>
                </v-list-tile>
              </template>
            </v-data-iterator>
          </v-list>
        </v-flex>
        <v-flex xs12 sm3></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";

const apiService = new APIService();
export default {
  name: "verChart",
  computed: {
    ...mapGetters(["isLoggedIn", "myChart"])
  },
  data: () => ({
    totalOf: 0,
    totaleu: 0
  }),
  methods: {},
  created() {
    if(!this.isLoggedIn){
      
    }
  }
};
</script>