<template>
  <div class="nuevaDireccion">
    <v-container>
      <v-layout row wrap>
        <v-flex>
          <h1 class="text-xs-center">Nueva dirección</h1>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-form @submit.prevent="guardarDireccion" id="form1" v-model="form.valid">
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
  name: "nuevaDireccion",
  computed: {
    ...mapGetters(["isLoggedIn", "myId"])
  },
  data: () => {
    return {
      form: {
        valid: false,
        datos: {
          calle: "",
          numero: "",
          piso: "",
          puerta: "",
          escalera: "",
          poblacion: "",
          CP: "",
          provincia: "",
          estado: "",
          id: ""
        },
        rules: {}
      }
    };
  },
  methods: {
    guardarDireccion() {
      let nwdir = this.form.datos;
      apiService
        .postDireccion(nwdir)
        .then(res => {
          alert("Direccion guardada");
          this.$router.push("/verPerfil");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    this.form.datos.id = this.myId;
  }
};
</script>
