<template>
  <div class="modificarPerfil"></div>
</template>

<script>
import { mapGetters } from 'vuex';
import { APIService } from '@/APIService';

export default {
  name: 'modificarPerfil',
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  data() {
    return {};
  },
};

</script>

<style>
</style>
