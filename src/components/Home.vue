<template>
  <div class="home">
    <v-carousel>
      <v-carousel-item v-for="(img, i) in carouselItems" :key="i" :src="img.src"></v-carousel-item>
    </v-carousel>
    <div class="text-xs-center mt-5">
      <h1>WalaBook</h1>
      <h2 class="subheading">Intercambio de libros de segunda mano</h2>
    </div>
    <div class="text-xs-justify mt-5">
      <p>
        WalaBook es un portal donde se puede gestionar la libreria personal de
        cada usuario y poder comprar, vender e intercambiar libros de segunda
        mano.
      </p>
      <p>
        Cada usuario que se registre dispone de una biblioteca ilimitada de
        obras y añadir esas obras a su biblioteca personal.
      </p>
    </div>
    <div class="text-xs-center mt-5" v-if="!isLoggedIn">
      <h1>¿Quieres empezar ya?</h1>
      <h2 class="subheading mb-4">¡Registrate! Es gratis</h2>
      <v-btn dark color="teal" to="/registro">
        <v-icon dark>create</v-icon>Registro
      </v-btn>
    </div>
    <div class="text-xs-center mt-5" v-if="isLoggedIn">
      <h1>Primeros pasos</h1>
      <h2 class="subheading mb-4">¿Por dónde empezar?</h2>
      <v-btn dark color="teal" to="/buscarLibro">
        <v-icon dark>search</v-icon><pre> </pre>Buscar Libro
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  data: function() {
    return {
      carouselItems: [
        { src: "https://jooinn.com/images/book-of-guidance.jpg" },
        {
          src:
            "https://torange.biz/photofx/34/10/mirror-macro-blurring-top-bottom-book-old-clipart-34342.jpg"
        },
        { src: "https://torange.biz/photo/34/HD/book-wisdom-34903.jpg" }
      ]
    };
  }
};
</script>

<style></style>
