<template>
  <div class="nuevoAutor">
    <v-container>
      <v-layout>
        <v-flex>
          <v-form id="form1" @submit.prevent="subirAutor" v-model="form.valid">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-text-field
                    label="Nombre"
                    v-model="form.Nombre"
                    :rules="fform.rules.nombre"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    label="Apellidos"
                    v-model="form.Apellidos"
                    :rules="fform.rules.apellidos"
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
                      v-model="form.Fecha_nacimiento"
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
                <v-flex xs2></v-flex>
                <v-flex xs8>
                  <input type="file" name="image" id="image">
                </v-flex>
                <v-flex xs2></v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-btn block dark color="teal" type="submit" form="form1">
                    <v-icon>backup</v-icon>
                    <pre></pre>Guardar
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
import { APIService } from "@/APIService";
import { mapGetters } from "vuex";

const apiService = new APIService();
export default {
  name: "nuevoAutor",
  computed: {
    ...mapGetters(["isLoggedIn", "tipoUser"])
  },
  data: () => ({
    form: {
      Nombre: "",
      Apellidos: "",
      Fecha_nacimiento: ""
    },
    menu1: false,
    fform: {
      valid: false,
      rules: {
        nombre: [v => !!v || "El nombre es necesario"],
        apellidos: [v => !!v || "Los apellidos son necesario"]
      }
    }
  }),
  watch: {
    menu1(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    subirAutor() {
      document.getElementById("loader").style = "display:absolute;";
      apiService
        .postAutor(this.form)
        .then(res => {
          document.getElementById("loader").style = "display:none;";
          let fl = document.getElementById("image").files[0];
          if (fl) {
            let dta = new FormData();
            dta.append("image", fl);
            apiService
              .putAutorImagen(res.data.autorsaved._id, dta)
              .then(res2 => {
                window.alert("Guardado");
                this.$router.push("/buscarLibro");
              })
              .catch(err => {
                window.alert("Error");
              });
          }
          document.getElementById("loader").style = "display:none;";
        })
        .catch(err => {
          console.log(err);
        });
    },
    save1() {
      this.$refs.menu1.save(this.form.Fecha_nacimiento);
    }
  },
  created() {
    if (!this.isLoggedIn || this.tipoUser != "admin") {
      this.$router.push("/");
      return false;
    }
  }
};
</script>

<style>
#image {
  width: 100%;
}
</style>
