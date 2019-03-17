<template>
  <div class="verOferta"></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "verOferta",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  data: () => {
    return {};
  },
  created: function() {
    if (!this.isLoggedIn) {
      this.$router.push("/");
      return false;
    }
  }
};
</script>

<style>
</style>
