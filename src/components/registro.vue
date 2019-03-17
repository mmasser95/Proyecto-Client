<template>
  <div class="registro">
    <v-container>
      <v-layout row child-flex justify-center align-center wrap>
        <v-flex xs-12 sm-3></v-flex>
        <v-flex xs-12 sm-6>
          <div class="text-xs-center">
            <h1>Registro</h1>
          </div>
          <v-alert :value="alert.dis" :color="alert.color">
            {{
            alert.message
            }}
          </v-alert>
          <v-form v-model="form.valid" @submit.prevent="doSignUp">
            <v-text-field v-model="form.nombre" label="Nombre" :rules="form.rules.nombre" required></v-text-field>
            <v-text-field v-model="form.email" label="E-mail" :rules="form.rules.email" required></v-text-field>
            <v-text-field
              v-model="form.pass"
              :append-icon="form.passShow ? 'visibility_off' : 'visibility'"
              :type="form.passShow ? 'text' : 'password'"
              :rules="form.rules.pass"
              label="Contraseña"
              required
              @click:append="form.passShow = !form.passShow;"
            ></v-text-field>
            <v-text-field
              v-model="form.repass"
              :append-icon="form.passShow ? 'visibility_off' : 'visibility'"
              :type="form.passShow ? 'text' : 'password'"
              :rules="form.rules.pass"
              label="Repite la contraseña"
              required
              @click:append="form.passShow = !form.passShow;"
            ></v-text-field>
            <v-btn block dark color="teal" type="submit">
              <v-icon>create</v-icon>Registrate
            </v-btn>
          </v-form>
        </v-flex>
        <v-flex xs-12 sm-3></v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Cuenta creada!</v-card-title>
        <v-card-text>Se ha creado correctamente la cuenta</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false;" flat to="/login">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { APIService } from "../APIService";
import { mapGetters } from "vuex";
const APiService = new APIService();
export default {
  name: "registro",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  data: function() {
    return {
      dialog: false,
      alert: { dis: false, message: "", color: "red" },
      form: {
        valid: false,
        passShow: false,
        nombre: "",
        email: "",
        pass: "",
        repass: "",
        rules: {
          nombre: [
            v => !!v || "Nombre obligatorio",
            v => v.length >= 4 || "4 caracteres como mínimo",
            v =>
              v.length <= 20 || "El nombre no puede tener más de 20 caracteres"
          ],
          email: [
            v => !!v || "Email Obligatorio",
            v => /.+@.+/.test(v) || "Pon un email válido"
          ],
          pass: [
            v => !!v || "Contraseña Obligatoria",
            v => v.length >= 8 || "Mínimo 8 caracteres"
          ]
        }
      }
    };
  },
  methods: {
    doSignUp() {
      if (this.form.valid) {
        let fr = this.form;
        let datos = {
          username: fr.nombre,
          apellidos: fr.apellidos,
          email: fr.email,
          pass: fr.pass
        };
        APiService.signUpUser(datos)
          .then(res => {
            this.dialog = true;
          })
          .catch(err => {
            this.alert.dis = true;
            this.alert.message = err.response.message;
            this.alert.color = "red";
          });
      }
    }
  },
  created: function() {
    if (!!this.isLoggedIn.token) {
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
