<template>
  <div class="editarAutor">
    <v-container>
      <v-layout row wrap class="my-3">
        <v-flex xs12>
          <h1 class="text-xs-center">Editar Autor</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-3">
        <v-flex xs12>
          <v-form @submit.prevent="editarAutor">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  :v-model="form.datos.Nombre"
                  label="Nombre"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  :v-model="form.datos.Apellidos"
                  label="Apellidos"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
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
                      v-model="form.datos.Fecha_nacimiento"
                      label="Fecha de nacimiento"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      ref="picker"
                      color="teal"
                      v-model="form.Fecha_nacimiento"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1500-01-01"
                      @change="save1"
                    ></v-date-picker>
                  </v-menu>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field></v-text-field>
              </v-flex>
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
  name: "editarAutor",
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  props:['autorId'],
  data: () => ({
    menu1:false,
    form:{
      datos:{
        Nombre:'',
        Apellidos:'',
        Fecha_nacimiento:'',
      },
      rules:{},
    },
  }),
  watch: {
    menu1(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save1() {
      this.$refs.menu1.save(this.form.Fecha_nacimiento);
    },
    async getAutor(){
      apiService
        .getAutor(this.autorId)
        .then((res) => {
          this.form.datos=res.data.autor;
        }).catch((err) => {
          window.alert(err);
        });
    },
    editarAutor(){
      apiService
        .putAutor(this.autorId,this.form.datos)
        .then((res) => {
          window.alert('Guardado')
          this.$router.go(-1)
        }).catch((err) => {
          window.alert('Error')
        });
    },
  },
  created() {
    if(!this.isLoggedIn){
      this.$router.push('/')
      return false;
    }
    this.getAutor()
  }
};
</script>
