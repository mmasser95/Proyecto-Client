<template>
  <div class="modificarPerfil">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="text-xs-center">Modificar Perfil</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-form v-model="form.valid" @submit.prevent="modificarPerfil">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model=""
                  label=""
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model=""
                  label=""
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model=""
                  label=""
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model=""
                  label=""
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn block dark color="teal">
                  <v-icon></v-icon>
                </v-btn>
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

export default {
  name: "modificarPerfil",
  computed: {
    ...mapGetters(["isLoggedIn", "tipoUser", "myId"])
  },
  data() {
    return {
      form:{
        valid:false
      }
    };
  },
  created: function() {},
  methods: {
    modificarPerfil(){
      
    }
  }
};
</script>

<style>
</style>
