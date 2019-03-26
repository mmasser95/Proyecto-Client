<template>
  <div class="nuevaPeticionAutor">
    <v-container>
      <v-layout>
        <v-flex>
          <v-form id="form1" @submit.prevent="subirPeticionAutor" v-model="form.valid">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-text-field
                    label="Nombre"
                    v-model="dform.Nombre"
                    :rules="form.rules.nombre"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    label="Apellidos"
                    v-model="dform.Apellidos"
                    :rules="form.rules.apellidos"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="dform.Fecha_nacimiento"
                      label="Fecha de nacimiento"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      ref="picker"
                      color="teal"
                      v-model="dform.Fecha_nacimiento"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1500-01-01"
                      @change="save1"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-btn block dark color="teal" type="submit" form="form1">
                    <v-icon>backup</v-icon><pre> </pre>Guardar
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
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
  name:'nuevaPeticionAutor',
  computed:{
    ...mapGetters(['isLoggedIn', 'myId']),
  },
  watch:{
    menu1(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
  },
  data:()=>{
    return{
      menu1:false,
      form:{
        valid:false,
        rules:{
          nombre:[v => !!v || 'El nombre es necesario'],
          apellidos:[v => !!v || 'Los apellidos son necesario']
        }
      },
      dform:{
        Nombre:'',
        Apellidos:'',
        Fecha_nacimiento:'',
        User:null,
      }
    }
  },
  methods:{
    subirPeticionAutor(){
      apiService
        .postPeticionAutor(this.dform)
        .then((res) => {
          window.alert('Guardado');
          this.$router.push('/');
        }).catch((err) => {
          window.alert('Error');
        });
    },
    save1() {
      this.$refs.menu1.save(this.form.Fecha_nacimiento);
    },
  },
  created:function() {
    if(!this.isLoggedIn){
      this.$router.push('/');
      return false;
    }
    this.dform.User=this.myId;
  },
}
</script>
