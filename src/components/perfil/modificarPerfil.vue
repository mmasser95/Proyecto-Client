<template>
  <div class="modificarPerfil">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">Modificar Perfil</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-form v-model="form.valid" @submit.prevent="modificarPerfil">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field v-model="form.datos.nombre" label="Nombre"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field v-model="form.datos.apellidos" label="Apellidos"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field v-model="form.datos.telf" label="Teléfono"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field v-model="form.datos.fecha_nacimiento" label="Fecha de nacimiento"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn block dark color="teal" type="submit">
                  <v-icon>edit</v-icon> Editar
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
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
  name: "modificarPerfil",
  computed: {
    ...mapGetters(["isLoggedIn", "tipoUser", "myId"])
  },
  data() {
    return {
      form: {
        valid: false,
        datos: {
          telf: "",
          nombre: "",
          apellidos: "",
          fecha_nacimiento: ""
        }
      }
    };
  },
  created: function() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    this.getPerfil();
  },
  methods: {
    getPerfil() {
      apiService
        .getMyUser()
        .then(res => {
          this.form.datos = res.data.user;
        })
        .catch(err => {
          window.alert(err);
        });
    },
    modificarPerfil() {
      apiService
        .putMyUser(this.form.datos)
        .then(res => {
          window.alert('Guardado')
          this.$router.push("/verPerfil");
        })
        .catch(err => {
          window.alert(err);
        });
    }
  }
};
</script>

<style>
</style>
