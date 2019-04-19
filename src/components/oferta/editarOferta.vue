<template>
    <div class="editarOferta">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-form @submit.prevent="modificarOferta" id="form1" v-model="form.valid">
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    v-model="form.datos.importe"
                    :rules="form.rules.importe"
                    type="number"
                    label="Importe"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select :items="form.slct" label="Moneda" v-model="form.datos.moneda"></v-select>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs3></v-flex>
                <v-flex xs6>
                  <v-btn dark color="teal" type="submit">Editar Oferta</v-btn>
                </v-flex>
                <v-flex xs3></v-flex>
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {APIService} from '@/APIService';

const apiService = new APIService();
export default {
  name:'editarOferta',
  computed:{
    ...mapGetters(['isLoggedIn', 'myId',])
  },
  props:['ofertaId'],
  data:()=>{
    return{
      form:{
        valid:false,
        selct:[{text:'EUR', value:'EUR'}, {text:'USD', value:'USD'}],
        datos:{
          importe:'',
          moneda:'',
          estado:'',
          id_libro:'',
          id_user:'',
        },
        rules:{
          importe:[
            v => !isNaN(v) || 'El importe debe ser un numero',
            v => /^(\d){1,9}(\.(\d){1,2})?$/g.test(v) || 'Introduce un importe correcto',
          ],
        },
      },
    }
  },
  methods:{
    modificarOferta(){
      apiService
        .putOferta(this.ofertaId, this.form.datos)
        .then((res) => {
          window.alert('Guardado correctamente')
        }).catch((err) => {
          console.log('Error');
          this.$router.go(-1);
        });
    }
  },
  created(){
    if (!this.isLoggedIn) {
      this.$router.push('/');
      return false;
    }
    apiService
      .getOferta(this.ofertaId)
      .then((res) => {
        if(res.data.oferta.id_user!=this.myId){
          this.$router.go(-1);
          return false;
        }
        this.form.datos=res.data.oferta;
      }).catch((err) => {
        window.alert('Error al cargar la oferta');
        this.$router.go(-1);
      });
  },
}
</script>
