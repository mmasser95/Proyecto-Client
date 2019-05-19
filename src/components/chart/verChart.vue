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
                    <img :src="`https://www.walabook.tk/img/${props.item.oferta.Imagen}`" :to="`/verOferta/${props.item.ofertaId}`">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      <div>
                        <h3 :to="`/verLibro/${props.item.libro._id}`">{{props.item.libro.Titulo}}</h3>
                        <p
                          class="text-secondary"
                          :to="`/verAutor/${props.item.autor._id}`"
                        >{{props.item.autor.Nombre}} {{props.item.autor.Apellidos}}</p>
                      </div>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>{{props.item.oferta.userId}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action
                    class="mx-1"
                  >{{props.item.oferta.importe.$numberDecimal}} {{props.item.oferta.moneda}}</v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn dark color="red" flat @click="borrarItemChart(props.item.oferta._id)">
                      <v-icon>delete_forever</v-icon>
                      <v-icon>indeterminate_check_box</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-data-iterator>
          </v-list>
        </v-flex>
        <v-flex xs12 sm3></v-flex>
      </v-layout>
      <v-layout row wrap class="my-3">
        <v-flex xs12 sm3></v-flex>
        <v-flex xs12 sm6>
          <PayPal
            v-if="myChart"
            :amount="totaleu"
            currency="EUR"
            :button-style="myStyle"
            :client="paypal"
            env="sandbox"
          ></PayPal>
        </v-flex>
        <v-flex xs12 sm3></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";
import PayPal from "vue-paypal-checkout";

const apiService = new APIService();
export default {
  name: "verChart",
  computed: {
    ...mapGetters(["isLoggedIn", "myChart"])
  },
  components: {
    PayPal
  },
  data: () => ({
    credentials: "",
    totalOf: 0,
    totaleu: "0",
    direccion: "",
    myStyle: {
      label: "checkout",
      size: "responsive",
      shape: "pill",
      color: "gold"
    },
    paypal: {
      sandbox:
        "Afm1dcSiwJjxfO8FupsLEl0l-M7WItd6P726cMXCRFnQE3lyvodK9wybWfkyDcR_IfmDoJb8d-sVenpu",
      production:
        "AcbZfUy41KPiHHLk1xDgMjJtwuQLH5KBzVp9vagyYwKqAQ6Er-hvvyPRrob7mM3iqnFxWEiA-YRf_DXS"
    }
  }),
  methods: {
    borrarItemChart(k) {
      let chart = this.myChart;
      chart.splice(
        chart
          .map(e => {
            return e.oferta._id;
          })
          .indexOf(k)
      );
      this.$store.dispatch({
        type: "setChart",
        chart
      });
    },
    comprar() {
      let items = this.myChart.map(e => ({
        ofertaId: e.oferta._id,
        precio: e.oferta.importe.$numberDecimal
      }));
      this.totaleu = this.myChart
        .map(e => {
          return e.oferta.importe.$numberDecimal;
        })
        .reduce((a, b) => {
          a + b;
        }, 0);
      let datos = {
        items,
        direccion,
        total: this.totaleu
      };
      apiService
        .postPedido(datos)
        .then(res => {
          console.log("Compra realizada");
        })
        .catch(err => {
          console.log("Error en la compra");
        });
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
  },
  mounted() {
    this.totaleu = this.myChart
      .map(function(e) {
        return parseFloat(e.oferta.importe.$numberDecimal);
      })
      .reduce(function(a, b) {
        return a + b;
      }, 0);
    this.totaleu = this.totaleu.toString();
  }
};
</script>