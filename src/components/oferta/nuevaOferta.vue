<template>
  <div class="nuevaOferta">
    <v-container>
      <v-layout row wrap>
        <v-flex>
          <v-form
            @submit.prevent="guardarOferta"
            ref="formulario"
            v-model="form.valid"
          >
            <v-layout row wrap>
              <v-flex xs12 sm8>
                <v-text-field
                  v-model="form.datos.importe"
                  :rules="form.rules.importe"
                  label="Importe"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                <v-select
                  :items="form.selct"
                  label="Moneda"
                  v-model="form.datos.moneda"
                ></v-select>
              </v-flex>
            </v-layout>
            
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn dark color="teal" type="submit">Publicar Oferta</v-btn>
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
import { APIService } from "../../APIService";
const apiService = new APIService();
export default {
  name: "nuevaOferta",
  computed: {
    ...mapGetters(["isLoggedIn", "myId"])
  },
  props: ["libroId"],
  data: () => {
    return {
      form: {
        valid: false,
        selct: [{ text: "EUR", value: "EUR" }, { text: "USD", value: "USD" }],
        datos: {
          importe: "",
          moneda: "",
          estado: 1,
          id_libro: "",
          id_user: ""
        },
        rules: {
          importe: [
            v => !isNaN(v) || "El importe debe ser un numero",
            v =>
              /^(\d){1,9}(\.(\d){0,2})?$/g.test(v) ||
              "Introduce un importe correcto"
          ]
        }
      }
    };
  },
  methods: {
    guardarOferta() {
      if (this.form.valid) {
        apiService
          .postOferta(this.form.datos)
          .then(res => {
            console.log(res);
            window.alert("Oferta publicada");
            this.$router.push('/buscarlibro')
          })
          .catch(err => {
            console.log(err);
            window.alert('Error')
            this.$refs.formulario.reset();
          });
      }
    }
  },
  created: function() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    this.form.datos.id_libro = this.libroId;
    this.form.datos.id_user = this.myId.idd;
  }
};
</script>

<style></style>
