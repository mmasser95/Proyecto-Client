import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/Home";
import buscarLibro from "@/components/libro/buscarLibro";
import Login from "@/components/login";
import Registro from "@/components/registro";
import adminLogin from "@/components/admin";
import nuevolibro from "@/components/libro/nuevoLibro";
import nuevoAutor from "@/components/autor/nuevoAutor";
import verLibro from "@/components/libro/verLibro";
import editarLibro from '@/components/libro/editarLibro';
import nuevaOferta from "@/components/oferta/nuevaOferta";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/registro",
      component: Registro
    },
    {
      path: "/buscarlibro",
      component: buscarLibro
    },
    { path: "/admin", component: adminLogin },
    {
      path: "/nuevolibro",
      component: nuevolibro
    },
    {
      path: "/nuevoAutor",
      component: nuevoAutor
    },
    {
      path: "/verLibro/:libroID",
      component: verLibro,
      props: true
    },
    {
      path: '/editarLibro/:idLibro',
      component: editarLibro,
      props: true
    },
    {
      path: "/nuevaOferta/:libroId",
      component: nuevaOferta,
      props: true
    }
  ],
  linkActiveClass: "active",
  mode: "history"
});
