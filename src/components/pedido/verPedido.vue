<template>
  <div class="verPedido">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">Pedido {{pedido._id}}</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table :items="pedido.items" :item-key="i" :headers="headers">
            <template v-slot:items="props">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <p class="text-xs-right">Total: {{pedido.totaleu}}€</p>
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
  name: "verPedido",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  props: ["pedidoId"],
  data() {
    return {
      pedido: {}
    };
  },
  methods: {
    getPedido() {
      apiService
        .getPedido(this.pedidoId)
        .then(res => {
          this.pedido = res.data.pedido;
        })
        .catch(err => {
          window.alert(err);
        });
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    this.getPedido();
  }
};
</script>
