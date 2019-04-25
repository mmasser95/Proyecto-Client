<template>
  <div class="verPerfil">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">{{user.username}}</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-5">
        <v-flex></v-flex>
        <v-flex xs12 sm10>
          <h2 class="text-xs-center">Mi Perfil</h2>
          <v-list>
            <v-list-tile v-for="(item,i) in user" :key="i">
              <v-list-tile-action>
                <v-icon>{{item.icn}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
                <v-list-tile-sub-title>{{item.sub}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex></v-flex>
      </v-layout>
      <v-layout row wrap class="mt-5" v-if="tipoUser != 'admin'">
        <v-flex></v-flex>
        <v-flex xs12 sm10>
          <h2 class="text-xs-center">
            Mis direcciones
            <v-btn flat to="/nuevaDireccion">
              <v-icon>account_circle</v-icon>
            </v-btn>
          </h2>
          <v-list>
            <v-list-tile v-for="(dir,i) in direcciones" :key="i">
              <v-list-tile-content>
                <v-list-tile-title>Calle: {{dir.calle}}, {{dir.numero}}</v-list-tile-title>
                <v-list-tile-sub-title>Direccion {{dir._id}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";

const apiService = new APIService();
export default {
  name: "verPerfil",
  computed: {
    ...mapGetters(["isLoggedIn", "myId", "tipoUser"])
  },
  data() {
    return {
      user: [],
      direcciones: []
    };
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
    document.getElementById("loader").style = "display:absolute;";
    if (this.tipoUser == "admin") {
      apiService
        .getAdmin(this.myId)
        .then(res => {
          const usr = res.data.admin;
          this.user = [
            { title: usr.username, sub: "Username", icn: "account_circle" },
            { title: usr.email, sub: "E-mail", icn: "alternate_email" }
          ];
          document.getElementById("loader").style = "display:none;";
        })
        .catch(err => {
          document.getElementById("loader").style = "display:none;";
          console.log(err);
        });
    } else {
      apiService
        .getUser(this.myId)
        .then(res => {
          document.getElementById("loader").style = "display:none;";
          const usr = res.data.user;
          this.user = [
            { title: usr.username, sub: "Username", icn: "account_circle" },
            { title: usr.email, sub: "E-mail", icn: "alternate_email" }
          ];
          this.direcciones = usr.direccion;
        })
        .catch(err => {
          document.getElementById("loader").style = "display:none;";
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
