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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
  name:'misOfertas',
  computed:{
    ...mapGetters(['isLoggedIn'])
  },
  data:()=>({
    ofertas:[],
    headers:[
      {text:'',value:''}
    ]
  }),
  methods:{
    getMisOfertas(){
      apiService
        .getMyOfertas()
        .then(res=>{
          this.ofertas=res.data.ofertas;
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  created(){
    if(!this.isLoggedIn){
      this.$router.push('/');
      return false;
    }
    this.getMisOfertas();
  },
};
</script>
