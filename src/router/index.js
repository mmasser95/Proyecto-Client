import adminLogin from '@/components/admin';
import nuevoAutor from '@/components/autor/nuevoAutor';
import Home from '@/components/Home';
import buscarLibro from '@/components/libro/buscarLibro';
import editarLibro from '@/components/libro/editarLibro';
import nuevolibro from '@/components/libro/nuevoLibro';
import verLibro from '@/components/libro/verLibro';
import Login from '@/components/login';
import nuevaOferta from '@/components/oferta/nuevaOferta';
import Registro from '@/components/registro';
import verPerfil from '@/components/perfil/verPerfil';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/registro',
      component: Registro,
    },
    {
      path: '/buscarlibro',
      component: buscarLibro,
    },
    { path: '/admin', component: adminLogin },
    {
      path: '/nuevolibro',
      component: nuevolibro,
    },
    {
      path: '/nuevoAutor',
      component: nuevoAutor,
    },
    {
      path: '/verLibro/:libroID',
      component: verLibro,
      props: true,
    },
    {
      path: '/editarLibro/:idLibro',
      component: editarLibro,
      props: true,
    },
    {
      path: '/nuevaOferta/:libroId',
      component: nuevaOferta,
      props: true,
    },
    {
      path:'/verPerfil',
      component:verPerfil,
    },
    {
      path: '',
      component: Home,
    },
  ],
  linkActiveClass: 'active',
  mode: 'history',
});
