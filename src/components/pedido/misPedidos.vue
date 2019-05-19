<template>
  <div class="misPedidos">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">Mis Pedidos</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table :items="pedidos" :headers="headers">
            <template v-slot:items='props'>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
  name: "misPedidos",
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  data: () => ({
    pedidos:[],
    headers:[],
  }),
  methods: {
    getMisPedidos(){
      apiService
        .getMyPedidos()
        .then((res) => {
          this.pedidos=res.data.pedidos
        }).catch((err) => {
          console.log('err :', err);
        });
    }
  },
  created() {
    if(!this.isLoggedIn){
      this.$router.go(-1);
      return false;
    }
    this.getMisPedidos();
  }
};
</script>
