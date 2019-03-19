<template>
  <div class="verPerfil"></div>
</template>

<script>
import { mapGetters } from "vuex";
import { APIService } from "@/APIService";
export default {
  name: "verPerfil",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  data: function() {
    return {};
  }
};
</script>

<style>
</style>
