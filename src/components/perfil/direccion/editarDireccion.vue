<template>
  <div class="editarDireccion">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">Editar dirección</h1>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-form @submit.prevent="editarDireccion" id="form1" v-model="form.valid">
            <v-layout row wrap>
              <v-flex xs10 sm4>
                <v-text-field v-model="form.datos.calle" label="Calle"></v-text-field>
              </v-flex>
              <v-flex xs2 sm2>
                <v-text-field type="number" v-model="form.datos.numero" label="Número"></v-text-field>
              </v-flex>
              <v-flex xs4 sm2>
                <v-text-field v-model="form.datos.escalera" label="Esc."></v-text-field>
              </v-flex>
              <v-flex xs4 sm2>
                <v-text-field type="number" v-model="form.datos.piso" label="Piso"></v-text-field>
              </v-flex>
              <v-flex xs4 sm2>
                <v-text-field type="number" v-model="form.datos.puerta" label="Puerta"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs8 sm6>
                <v-text-field v-model="form.datos.poblacion" label="Poblacion"></v-text-field>
              </v-flex>
              <v-flex xs4 sm6>
                <v-text-field type="number" v-model="form.datos.CP" label="Código Postal"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field v-model="form.datos.provincia" label="Província"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field v-model="form.datos.estado" label="Estado"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm3></v-flex>
              <v-flex xs12 sm6>
                <v-btn color="teal" type="submit" dark block>
                  <v-icon>backup</v-icon>
                  <pre></pre>Guardar
                </v-btn>
              </v-flex>
              <v-flex xs12 sm3></v-flex>
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
  name: "editarDireccion",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  props: ["direccionId"],
  data: () => {
    return {
      form: {
        valid: false,
        datos: {
          calle: "",
          numero: "",
          escalera: "",
          piso: "",
          puerta: "",
          poblacion: "",
          CP: "",
          provincia: "",
          estado: ""
        },
        rules: {}
      }
    };
  },
  methods: {
    getDireccion() {
      apiService
        .getDireccion(this.direccionId)
        .then(res => {
          this.form.datos = res.data.direccion;
        })
        .catch(err => {
          window.alert(err);
        });
    },
    editarDireccion() {
      apiService
        .modificarUserDireccion(this.direccionId, this.form.datos)
        .then(res => {
          window.alert("Guardado");
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
    this.getDireccion();
  }
};
</script>
