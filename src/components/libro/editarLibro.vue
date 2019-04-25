<template>
  <div class="editarLibro">
    <v-container>
      <v-layout>
        <v-flex>
          <v-form id="form" @submit.prevent="editarLibro" v-model="form.valid">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Título"
                    v-model="form.datos.Titulo"
                    :rules="form.rules.Titulo"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Editorial"
                    v-model="form.datos.Editorial"
                    :rules="form.rules.Editorial"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                    type="number"
                    label="Edicion"
                    v-model="form.datos.Edicion"
                    :rules="form.rules.Edicion"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-combobox
                    label="Autor"
                    :item-text="autores.text"
                    :item-value="autores.valu"
                    :items="autores"
                    :key="autores.valu"
                    v-model="form.datos.Autor"
                    chips
                  ></v-combobox>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <!-- DatePickers -->
                <v-flex xs12 sm6>
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
                      v-model="form.datos.Fecha_Publicacion"
                      label="Fecha de publicación"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      ref="picker"
                      v-model="form.datos.Fecha_Publicacion"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save1"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
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
                      v-model="form.datos.Fecha_Edicion"
                      label="Fecha de edición"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      ref="picker"
                      v-model="form.datos.Fecha_Edicion"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save2"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-text-field v-model="form.datos.Genero" label="Género"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field v-model="form.datos.Tapa" label="Tapa"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="form.datos.Paginas"
                    type="number"
                    label="Páginas"
                    :rules="form.rules.Paginas"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-textarea
                    label="Sinopsis"
                    row="2"
                    hint="Sinopsis breve del libro"
                    v-model="form.datos.Sinopsis"
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex></v-flex>
                <v-flex xs12 sm4>
                  <v-btn block dark color="teal" type="submit" form="form">
                    <v-icon>backup</v-icon>
                    <pre></pre>Guardar
                  </v-btn>
                </v-flex>
                <v-flex></v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-flex>
        <v-dialog v-model="dialog" width="500">
          <v-card class="text-xs-center">
            <v-card-title>Error</v-card-title>
            <v-card-text>{{errorText}}</v-card-text>
            <v-divider></v-divider>
            <v-card-action>
              <v-spacer></v-spacer>
              <v-btn color="red" flat @click="dialog=false">Ok</v-btn>
            </v-card-action>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { APIService } from "@/APIService";

const apiService = new APIService();
export default {
  name: "editarLibro",
  props: ["idLibro"],
  data: () => ({
    errorText: "",
    dialog: false,
    libro: {},
    autores: [],
    menu1: false,
    menu2: false,
    form: {
      valid: false,
      datos: {
        ISBN: "",
        Titulo: "",
        Editorial: "",
        Edicion: "",
        Autor: "",
        Fecha_Publicacion: null,
        Fecha_Edicion: null,
        Genero: "",
        Tapa: "",
        Sinopsis: "",
        Paginas: ""
      },
      rules: {
        Titulo: [v => !!v || "El titulo es requerido"],
        Editorial: [v => !!v || "La editorial es requerida"],
        Edicion: [v => v > 0 || "La edicion es requerida"],
        Paginas: [v => v >= 0 || "Si no lo sabes, pon 0"]
      }
    }
  }),
  watch: {
    menu1(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    menu2(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    save1() {
      this.$refs.menu1.save(this.form.datos.Fecha_Publicacion);
    },
    save2() {
      this.$refs.menu2.save(this.form.datos.Fecha_Edicion);
    },
    editarLibro() {
      if (this.form.valid) {
        document.getElementById("loader").style = "display:absolute;";
        this.form.datos.Autor = this.form.datos.Autor.valu;
        apiService
          .putLibro(this.form.datos._id, this.form.datos)
          .then(res => {
            if (res.status == 200) {
              this.$router.push(`/verLibro/${this.form.datos._id}`);
              document.getElementById("loader").style = "display:none;";
            }
          })
          .catch(err => {
            document.getElementById("loader").style = "display:none;";
            this.errorText = "Error al guardar el libro";
            this.dialog = true;
          });
      }
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "tipoUser"])
  },
  created() {
    if (!this.isLoggedIn || this.tipoUser != "admin") {
      this.$router.push("/");
      return false;
    }
    document.getElementById("loader").style = "display:absolute;";
    apiService
      .getAutores()
      .then(res => {
        for (const autor of res.data.autores) {
          this.autores.push({
            text: `${autor.Nombre} ${autor.Apellidos}`,
            valu: autor._id
          });
        }
      })
      .catch(err => {
        document.getElementById("loader").style = "display:none;";
        window.alert("Ha habido un error");
        this.$router.push("/");
      });
    document.getElementById("loader").style = "display:absolute;";
    apiService
      .getLibro(this.idLibro)
      .then(res => {
        this.form.datos = res.data.libro;
        this.form.datos.Fecha_Publicacion = moment(
          this.form.datos.Fecha_Publicacion
        ).format("YYYY-MM-DD");
        this.form.datos.Fecha_Edicion = moment(
          this.form.datos.Fecha_Edicion
        ).format("YYYY-MM-DD");
        apiService
          .getAutor(this.form.datos.Autor)
          .then(resp => {
            this.form.datos.Autor = {
              text: `${resp.data.autor.Nombre} ${resp.data.autor.Apellidos}`,
              valu: resp.data.autor._id
            };
            document.getElementById("loader").style = "display:none;";
          })
          .catch(err => {
            document.getElementById("loader").style = "display:none;";
            this.$router.push("/");
          });
      })
      .catch(err => {
        document.getElementById("loader").style = "display:none;";
        this.$router.push("/");
      });
  }
};
</script>
