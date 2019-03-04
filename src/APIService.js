import axios from "axios";
import { store } from "./store/";
const api = "https://1qnrvynnnq.sse.codesandbox.io/api";

export class APIService {
  constructor() {}
  signinUser(data) {
    const url = `${api}/user/signin`;
    return axios.post(url, data).then(res => res);
  }

  signinAdmin(data) {
    const url = `${api}/admin/signin`;
    return axios.post(url, data).then(res => res);
  }
  signUpUser(data) {
    const url = `${api}/user`;
    return axios.post(url, data).then(res => res);
  }
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
      const config = {
        headers: { authorization: `Bearer ${store.getters.isLoggedIn.token}` }
      };
      return axios.get(url, config).then(res => res);
    }
    return false;
  }
  getUser(ids) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/user/${ids}`;
      const config = {
        headers: { authorization: `Bearer ${store.getters.isLoggedIn.token}` }
      };
      return axios.get(url, config).then(res => res);
    }
    return false;
  }
  getDirecciones() {
    if (store.getters.isLoggedIn) {
      const url = `${api}/user/${store.getters.myId.idd}/direccion`;
      const config = {
        headers: {
          authorization: `Bearer ${store.getters.isLoggedIn.token}`
        }
      };
      return axios.get(url, config).then(res => res);
    }
  }
  postLibro(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/libro`;
      const config = {
        headers: {
          authorization: `Bearer ${store.getters.isLoggedIn.token}`
        }
      };
      return axios.post(url, datos, config).then(res => res);
    }
  }
  postAutor(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/autor`;
      const config = {
        headers: {
          authorization: `Bearer ${store.getters.isLoggedIn.token}`
        }
      };
      return axios.post(url, datos, config).then(res => res);
    }
  }
  postOferta(datos) {
    if (store.getters.isLoggedIn) {
      const url = `${api}/oferta`;
      const config = {
        headers: {
          authorization: `Bearer ${store.getters.isLoggedIn.token}`
        }
      };
      return axios.post(url, datos, config).then(res => res);
    }
  }
}
