<template>
  <div class="verPedido">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">Pedido {{}}</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>

        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";
const apiService=new APIService();
export default {
  name:'verPedido',
  computed:{},
  data:()=>{},
  methods:{},
  created(){
    
  },
}
</script>
