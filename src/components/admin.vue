<template>
  <div class="adminlogin">
    <v-container>
      <v-layout row child-flex justify-center align-center wrap>
        <v-flex xs-12 sm-3></v-flex>
        <v-flex xs-12 sm-6>
          <div class="text-xs-center mt-5">
            <h1 class="font-weight-bold">Login</h1>
            <p class="subheading">Admin</p>
          </div>
          <v-alert :value="alert.dis" :type="alert.type" :color="alert.color">
            {{
            alert.message
            }}
          </v-alert>
          <v-form v-model="form.valid" @submit.prevent="loginAdmin">
            <v-text-field v-model="form.email" :rules="form.rules.email" label="Email" required></v-text-field>
            <v-text-field
              v-model="form.pass"
              :append-icon="form.passShow ? 'visibility_off' : 'visibility'"
              :type="form.passShow ? 'text' : 'password'"
              :rules="form.rules.pass"
              label="Contraseña"
              required
              @click:append="form.passShow = !form.passShow;"
            ></v-text-field>
            <v-btn id="submitbtn" block dark color="teal" class="font-weight-black" type="submit">
              <v-icon>vpn_key</v-icon>
              <pre></pre>Login
            </v-btn>
          </v-form>
        </v-flex>
        <v-flex xs-12 sm-3></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APIService } from "../APIService";

const apiService = new APIService();
export default {
  name: "adminLogin",
  computed: { ...mapGetters(["isLoggedIn", "myId"]) },
  data: () => ({
    statelogin: false,
    alert: { dis: false, message: "", type: "error", color: "red" },
    form: {
      valid: false,
      passShow: false,
      email: "",
      pass: "",
      rules: {
        email: [
          v => !!v || "El email es necesario",
          v => /^.+@.+\.((\w{3})|(\w{2}))$/.test(v) || "Pon un email valido"
        ],
        pass: [
          v => !!v || "La contraseña es necesaria",
          v => v.length >= 6 || "La contraseña debe tener 6 caracteres"
        ]
      }
    }
  }),
  methods: {
    loginAdmin() {
      if (this.form.valid) {
        let sbtn = this.statelogin;
        document.getElementById("loader").style = "display:absolute;";
        const fr = this.form;
        const datos = {
          email: fr.email,
          pass: fr.pass
        };
        apiService
          .signinAdmin(datos)
          .then(res => {
            this.$store.dispatch({
              type: "authenticate",
              token: res.data.token
            });
            this.$store.dispatch({
              type: "authenticate2",
              idd: res.data.idAdmin
            });
            this.$store.dispatch({
              type: "authenticate3",
              tipo: "admin"
            });
            apiService
              .getAdmin(this.myId)
              .then(res => {
                document.getElementById("loader").style = "display:none;";
                this.$store.dispatch({
                  type: "setInfo",
                  email: res.data.admin.email,
                  username: res.data.admin.username
                });
                this.$router.push("/");
              })
              .catch(err => {
                document.getElementById("loader").style = "display:none;";
                this.alert.dis = true;
                this.alert.type = "warning";
                this.alert.color = "yellow";
                this.alert.message = `Status: ${err.response.status} ${
                  err.response.data.message
                }`;
              });
          })
          .catch(err => {
            document.getElementById("loader").style = "display:none;";
            this.alert.dis = true;
            this.alert.type = "error";
            this.alert.color = "blue";
            this.alert.message = `Status${err.response.status} ${
              err.response.data.message
            }`;
          });
      }
    }
  }
};
</script>

<style></style>
