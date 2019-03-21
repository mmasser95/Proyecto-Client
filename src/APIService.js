import axios from 'axios';
import { store } from './store/';

const api = 'https://proyecto-final-api.herokuapp.com/api';
function getHeaders() {
  return {
    headers: { authorization: `Bearer ${store.getters.isLoggedIn}` },
  };
}
export class APIService {
  constructor() {}
  // Login
  signinUser(data) {
    const url = `${api}/user/signin`;
    return axios.post(url, data).then(res => res);
  }
  // Verificar Token
  verificarLogin(data) {
    const url = `${api}/user/verificar`;
    return axios.post(url, data).then(res => res);
  }
  verificarAdminLogin(data){
    const url = `${api}/admin/verificar`;
    return axios.post(url, data).then(res => res);
  }
  signinAdmin(data) {
    const url = `${api}/admin/signin`;
    return axios.post(url, data).then(res => res);
  }
  // Registro
  signUpUser(data) {
    const url = `${api}/user`;
    return axios.post(url, data).then(res => res);
  }
  // Libros
  getLibros() {
    const url = `${api}/libro`;
    return axios.get(url).then(res => res);
  }
  getLibro(ids) {
    const url = `${api}/libro/${ids}`;
    return axios.get(url).then(res => res);
  }
  getAutores() {
    const url = `${api}/autor`;
    return axios.get(url).then(res => res);
  }
  getOfertasLibro(ids) {
    const url = `${api}/oferta/libro/${ids}`;
    return axios.get(url).then(res => res);
  }
  getAutor(ids) {
    const url = `${api}/autor/${ids}`;
    return axios.get(url).then(res => res);
  }
  getAdmin(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/admin/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
    return false;
  }
  getUser(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/user/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
    return false;
  }
  getDirecciones() {
    if (store.getters.isLoggedIn) {
      const url = `${api}/user/${store.getters.myId.idd}/direccion`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  postLibro(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/libro`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
  }
  postAutor(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/autor`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
  }
  postOferta(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/oferta`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
  }
  putLibro(ids, update) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/libro/${ids}`;
      return axios.put(url, update, getHeaders()).then(res => res);
    }
  }
  deleteLibro(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/libro/${ids}`;
      return axios.delete(url, getHeaders()).then(res => res);
    }
  }
}
