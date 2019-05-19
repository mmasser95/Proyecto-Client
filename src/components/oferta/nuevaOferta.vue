<template>
  <div class="nuevaOferta">
    <v-container>
      <v-layout row wrap>
        <v-flex>
          <v-form @submit.prevent="guardarOferta" ref="formulario" v-model="form.valid">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="form.datos.importe"
                  :rules="form.rules.importe"
                  label="Importe"
                ></v-text-field>
              </v-flex>
              <!--<v-flex xs12 sm4>
                <v-select :items="form.selct" label="Moneda" v-model="form.datos.moneda"></v-select>
              </v-flex>-->
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                v-model="form.datos.defectos"
                label="Pequeña descripción del estado del libro"
              ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs2></v-flex>
              <v-flex xs8>
                <input type="file" name="image" id="image">
              </v-flex>
              <v-flex xs2></v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn dark color="teal" block class="my-3" type="submit">Publicar Oferta</v-btn>
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
  name: "nuevaOferta",
  computed: {
    ...mapGetters(["isLoggedIn", "myId"])
  },
  props: ["libroId"],
  data: () => ({
    form: {
      valid: false,
      selct: [{ text: "EUR", value: "EUR" }, { text: "USD", value: "USD" }],
      datos: {
        importe: "",
        moneda: "EUR",
        estado: 1,
        defectos:'',
        id_libro: "",
        id_user: ""
      },
      rules: {
        importe: [
          v => !isNaN(v) || "El importe debe ser un numero",
          v =>
            /^(\d){1,9}(\.(\d){1,2})?$/g.test(v) ||
            "Introduce un importe correcto"
        ]
      }
    }
  }),
  methods: {
    guardarOferta() {
      if (this.form.valid) {
        apiService
          .postOferta(this.form.datos)
          .then(res => {
            let fl= document.getElementById('image').files[0]
            if(fl){
              let dta= new FormData();
              dta.append('image', fl);
              for (const i of dta.entries()) {
                console.log('i :', i);
              }
              apiService
                .putOfertaImagen(res.data.saved._id, dta)
                .then((res2) => {
                  console.log(res);
                  window.alert("Oferta publicada");
                  this.$router.push("/buscarlibro");
                }).catch((err) => {
                  window.alert('Error');
                  this.$refs.formulario.reset();
                });
            }else{
              console.log(res);
              window.alert("Oferta publicada");
              this.$router.push("/buscarlibro");
            }
            
          })
          .catch(err => {
            console.log(err);
            window.alert("Error");
            this.$refs.formulario.reset();
          });
      }
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    this.form.datos.id_libro = this.libroId;
    this.form.datos.id_user = this.myId;
    return true;
  }
};
</script>

<style></style>
