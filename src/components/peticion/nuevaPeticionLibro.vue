<template>
  <div class="nuevoLibro">
    <v-container>
      <v-layout>
        <v-flex>
          <v-form id="form" @submit.prevent="subirLibro" v-model="form.valid">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-text-field
                    type="number"
                    label="ISBN"
                    v-model="form.ISBN"
                    :rules="form.rules.ISBN"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    label="Título"
                    v-model="form.Titulo"
                    :rules="form.rules.Titulo"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    label="Editorial"
                    v-model="form.Editorial"
                    :rules="form.rules.Editorial"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                    type="number"
                    label="Edición"
                    v-model="form.Edicion"
                    :rules="form.rules.Edicion"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-combobox
                    label="Autor"
                    :item-text="autores.Nombre"
                    :item-value="JSON.stringify(autores._id)"
                    :items="autores"
                    :key="autores._id"
                    v-model="form.Autor"
                    return-object
                    single-line
                    chips
                  ></v-combobox>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    bottom
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="form.Fecha_Publicacion"
                      label="Fecha de publicación"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      ref="picker"
                      v-model="form.Fecha_Publicacion"
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
                    bottom
                    offset-x
                    left
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="form.Fecha_Edicion"
                      label="Fecha de edición"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker
                      ref="picker"
                      v-model="form.Fecha_Edicion"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save2"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-text-field v-model="form.Genero" label="Género"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field v-model="form.Tapa" label="Tapa"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-text-field
                    type="number"
                    v-model="form.Paginas"
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
                    v-model="form.Sinopsis"
                  ></v-textarea>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12><input type="file" name="image" id="image"></v-flex>
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
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { APIService } from "@/APIService";
import { mapGetters } from "vuex";

const apiService = new APIService();
export default {
  name: "nuevaPeticionLibro",
  computed: {
    ...mapGetters(["isLoggedIn", "myId"])
  },
  data: () => ({
    autores: [],
    menu1: false,
    menu2: false,
    form: {
      valid: false,
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
      Paginas: "",
      User: null,
      rules: {
        ISBN: [
          v => !!v || "El ISBN es requerido",
          v => !isNaN(v) || "Introduce solo numeros",
          v => v.length >= 10 || "El ISBN debe tener como mínimo 10 caracteres",
          v => v.length <= 13 || "El ISBN debe tener como máximo 13 caracteres"
        ],
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
    subirLibro() {
      const libro = this.form;
      const datos = {
        ISBN: libro.ISBN,
        Autor: libro.Autor.value,
        Titulo: libro.Titulo,
        Edicion: libro.Edicion,
        Editorial: libro.Editorial,
        Fecha_Edicion: libro.Fecha_Edicion,
        Fecha_Publicacion: libro.Fecha_Publicacion,
        Genero: libro.Genero,
        Tapa: libro.Tapa,
        Sinopsis: libro.Sinopsis,
        Paginas: libro.Paginas,
        Estado:0,
        User: this.myId
      };
      if (libro.valid) {
        apiService
          .postPeticionLibro(datos)
          .then(res => {
            let fl=document.getElementById('image').files[0]
            let dta= new FormData();
            dta.append('image', fl);
            apiService
              .putPeticionLibroImagen(res.data.saved._id, dta)
              .then((res2) => {
                window.alert('Guardado')
              }).catch((err) => {
                window.alert('Error')
              });
          })
          .catch(err => {
            window.alert('Error');
          });
      }
    },
    save1() {
      this.$refs.menu1.save(this.form.Fecha_Publicacion);
    },
    save2() {
      this.$refs.menu2.save(this.form.Fecha_Edicion);
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    apiService
      .getAutores()
      .then(res => {
        for (const autor of res.data.autores) {
          this.autores.push({
            text: `${autor.Nombre} ${autor.Apellidos}`,
            value: autor._id
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
