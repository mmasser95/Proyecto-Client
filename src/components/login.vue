<template>
  <div class="login">
    <v-container class="text-xs-center">
      <v-layout row child-flex justify-center align-center wrap>
        <v-flex xs-12 sm-3></v-flex>
        <v-flex xs-12 sm-6>
          <div class="text-xs-center">
            <h1>Login</h1>
            <p class="subheading">Usuario</p>
          </div>
          <v-alert
            :value="alert.statee"
            :type="alert.type"
            :color="alert.color"
            >{{ alert.message }}</v-alert
          >
          <v-form v-model="form.valid" @submit.prevent="doLogin" id="form1">
            <v-text-field
              v-model="form.email"
              :rules="form.emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.pass"
              :append-icon="form.passShow ? 'visibility_off' : 'visibility'"
              :type="form.passShow ? 'text' : 'password'"
              :rules="form.passRules"
              label="Contraseña"
              required
              @click:append="form.passShow = !form.passShow;"
            ></v-text-field>
            <v-btn id="submitbtn" type="submit" form="form1" dark color="teal">Login</v-btn>
          </v-form>
          {{ myId }}
        </v-flex>
        <v-flex xs-12 sm-3></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { APIService } from '../APIService';
const APiService = new APIService();

export default {
  name: 'login',
  computed: {
    ...mapGetters(['isLoggedIn', 'myId']),
  },
  data() {
    return {
      statelogin:false,
      alert: {
        statee: false,
        message: '',
        type: 'error',
        color: 'red',
      },
      form: {
        valid: false,
        email: '',
        pass: '',
        passShow: false,
        emailRules: [
          v => !!v || 'Email necesario',
          v => /.+@.+/.test(v) || 'Introduce un email valido',
        ],
        passRules: [
          v => !!v || 'Contraseña necesaria',
          v => v.length >= 6 || '6 caracteres minimo',
        ],
      },
    };
  },
  methods: {
    doLogin() {
      if (this.form.valid) {
        let sbtn=this.statelogin;
        if(sbtn===true){
          return false;
        }
        sbtn=true;
        const datos = {
          email: this.form.email,
          pass: this.form.pass,
        };
        APiService.signinUser(datos)
          .then((res) => {
            this.$store.dispatch({
              type: 'authenticate',
              token: res.data.token,
            });
            this.$store.dispatch({
              type: 'authenticate2',
              idd: res.data.idUser,
            });
            this.$store.dispatch({
              type: 'authenticate3',
              tipo: 'user',
            });
            this.alert.statee = false;
            APiService.getUser(this.myId.idd)
              .then((resp) => {
                this.$store.dispatch({
                  type: 'setInfo',
                  email: resp.data.user.email,
                  username: resp.data.user.username,
                });
                this.$router.push('/');
                sbtn=false;
              })
              .catch((err) => {
                sbtn.disabled=false;
                this.alert.statee = true;
                this.alert.type = 'warning';
                this.alert.color = 'yellow';
                this.alert.message = `Error ${err}`;
                throw err;
              });
          })
          .catch((err) => {
            sbtn=false;
            this.alert.statee = true;
            this.alert.type = 'error';
            this.alert.color = 'red';
            this.alert.message = `Error en la autenticacion ${
              err.response.data.message
            }`;
          });
      }
      return false;
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
