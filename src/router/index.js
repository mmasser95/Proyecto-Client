import adminLogin from '@/components/admin';
import buscarAutor from '@/components/autor/buscarAutor';
import nuevoAutor from '@/components/autor/nuevoAutor';
import verAutor from '@/components/autor/verAutor';
import editarAutor from '@/components/autor/editarAutor';
//import miBiblioteca from '@/components/biblioteca/miBiblioteca';
import verChart from '@/components/chart/verChart';
import Home from '@/components/Home';
import buscarLibro from '@/components/libro/buscarLibro';
import editarLibro from '@/components/libro/editarLibro';
import nuevolibro from '@/components/libro/nuevoLibro';
import verLibro from '@/components/libro/verLibro';
import Login from '@/components/login';
import editarOferta from '@/components/oferta/editarOferta';
import nuevaOferta from '@/components/oferta/nuevaOferta';
import verOferta from '@/components/oferta/verOferta';
import misOfertas from '@/components/oferta/misOfertas';
import nuevaDireccion from '@/components/perfil/direccion/nuevaDireccion';
import editarDireccion from '@/components/perfil/direccion/editarDireccion';
import verPerfil from '@/components/perfil/verPerfil';
import modificarPerfil from '@/components/perfil/modificarPerfil';
import verPedido from '@/components/pedido/verPedido';
import nuevaPeticionAutor from '@/components/peticion/nuevaPeticionAutor';
import nuevaPeticionLibro from '@/components/peticion/nuevaPeticionLibro';
import verPeticiones from '@/components/peticion/verPeticiones';
import misPedidos from '@/components/pedido/misPedidos';
import Registro from '@/components/registro';
import Vue from 'vue';
import Router from 'vue-router';

import misPeticiones from '@/components/peticion/misPeticiones';

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
      path: '/buscarAutor',
      component: buscarAutor,
    },
    {
      path: '/verAutor/:autorId',
      component: verAutor,
      props: true,
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
      path: '/verOferta/:ofertaId',
      component: verOferta,
      props: true,
    },{
      path:'/misOfertas',
      component:misOfertas
    },
    {
      path: '/verPerfil',
      component: verPerfil,
    },
    {
      path: '/nuevaPeticionAutor',
      component: nuevaPeticionAutor,
    },
    {
      path: '/nuevaPeticionLibro',
      component: nuevaPeticionLibro,
    },
    {
      path: '/verPeticiones',
      component: verPeticiones,
    },
    {
      path: '/nuevaDireccion',
      component: nuevaDireccion,
    },
    {
      path:'/editarDireccion/:direccionId',
      component:editarDireccion,
      props:true,
    },
    {
      path: '/editarOferta/:ofertaId',
      props: true,
      component: editarOferta,
    },
    {
      path: '/verChart',
      component: verChart,
    },
    {
      path: '/misPeticiones',
      component: misPeticiones,
    },
    {
      path:'/editarAutor/:autorId',
      component:editarAutor,
      props:true,
    },
    {
      path:'/modificarPerfil',
      component:modificarPerfil
    },
    /*{
      path:'/miBiblioteca',
      component:miBiblioteca,
    },*/
    {
      path:'/misPedidos',
      component:misPedidos
    },
    {
      path: '',
      component: Home,
    },
  ],
  linkActiveClass: 'active',
  mode: 'history',
});
