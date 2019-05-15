import axios from 'axios';
import { store } from './store/';

// const api = 'https://proyecto-final-api.herokuapp.com/api';
// const api = 'http://www.walabook.com/api';
const api = 'http://localhost:3000/api';
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
  verificarAdminLogin(data) {
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
    if (store.getters.isLoggedIn) {
      const url = `${api}/oferta/libro/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  getOferta(ids) {
    const url = `${api}/oferta/${ids}`;
    return axios.get(url).then(res => res);
  }
  getMyOfertas() {
    if (store.getters.isLoggedIn) {
      const url = `${api}/my/oferta`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  getAutor(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/autor/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
    return false;
  }
  getLibrosAutor(ids) {
    const url = `${api}/libro/autor/${ids}`;
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
  getMyUser() {
    if (store.getters.isLoggedIn) {
      const url = `${api}/my/user`;
      return axios.get(url, getHeaders()).then(res => res);
    }
    return false;
  }
  getOferta(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/oferta/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
    return false;
  }
  getDirecciones() {
    if (store.getters.isLoggedIn) {
      const url = `${api}/my/user/direccion`;
      return axios.get(url, getHeaders()).then(res => res);
    }
    return false;
  }
  getDireccion(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/my/user/direccion/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  postLibro(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/libro`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
    return false;
  }
  postAutor(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/autor`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
    return false;
  }
  postOferta(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/oferta`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
    return false;
  }
  postDireccion(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/user/direccion`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
    return false;
  }
  putLibro(ids, update) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/libro/${ids}`;
      return axios.put(url, update, getHeaders()).then(res => res);
    }
    return false;
  }
  putAutor(ids, update) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/autor/${ids}`;
      return axios.put(url, update, getHeaders()).then(res => res);
    }
  }
  putOferta(ids, update) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/oferta/${ids}`;
      return axios.put(url, update, getHeaders()).then(res => res);
    }
  }
  putOfertaImagen(ids, update) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/oferta/imagen/${ids}`;
      return axios.put(url, update, getHeaders()).then(res => res);
    }
  }
  putAutorImagen(ids, update) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/autor/imagen/${ids}`;
      return axios.put(url, update, getHeaders()).then(res => res);
    }
  }
  putLibroImagen(ids, update) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/libro/imagen/${ids}`;
      return axios.put(url, update, getHeaders()).then(res => res);
    }
  }
  modificarUserDireccion(ids, update) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/my/user/direccion/${ids}`;
      return axios.put(url, update, getHeaders()).then(res => res);
    }
  }
  deleteLibro(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/libro/${ids}`;
      return axios.delete(url, getHeaders()).then(res => res);
    }
  }
  deleteLibroAutor(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/libro/autor/${ids}`;
      return axios.delete(url, getHeaders()).then(res => res);
    }
  }
  deleteAutor(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/autor/${ids}`;
      return axios.delete(url, getHeaders()).then(res => res);
    }
  }
  getPeticionesAutor() {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/autor`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  getMyPeticionesAutor() {
    if (store.getters.isLoggedIn) {
      const url = `${api}/my/peticion/autor`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  postPeticionAutor(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/autor`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
  }
  aceptarPeticionAutor(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/autor/a/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  denegarPeticionAutor(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/autor/d/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  deletePeticionAutor(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/autor/${ids}`;
      return axios.delete({ url, config: getHeaders() }).then(res => res);
    }
  }
  putPeticionAutor(ids, datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/autor/${ids}`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
  }
  getPeticionesLibro() {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/libro`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  getMyPeticionesLibro() {
    if (store.getters.isLoggedIn) {
      const url = `${api}/my/peticion/libro`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  postPeticionLibro(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/libro`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
  }
  aceptarPeticionLibro(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/libro/a/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  denegarPeticionLibro(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/libro/d/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  deletePeticionLibro(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/libro/${ids}`;
      return axios.delete(url, getHeaders()).then(res => res);
    }
  }
  putPeticionLibro(ids, datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/peticion/libro/${ids}`;
      return axios.put(url, datos, getHeaders()).then(res => res);
    }
  }
  postPedido(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/pedido`;
      return axios.post(url, datos, getHeaders()).then(res => res);
    }
  }
  getMyBiblioteca() {
    if (store.getters.isLoggedIn) {
      const url = `${api}/biblioteca`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  putMyBiblioteca(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/biblioteca`;
      return axios.put(url, datos, getHeaders()).then(res => res);
    }
  }
  putMyUser(datos){
    if (store.getters.isLoggedIn) {
      const url = `${api}/my/user`;
      return axios.put(url, datos, getHeaders()).then(res => res);
    }
  }
  putLibroMyBiblioteca(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/biblioteca/libro/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
  deleteLibroMyBiblioteca(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/biblioteca/libro/${ids}`;
      return axios.get(url, getHeaders()).then(res => res);
    }
  }
}
