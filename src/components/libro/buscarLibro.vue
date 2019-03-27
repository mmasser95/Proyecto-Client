<template>
  <div class="buscarLibro">
    <!--<v-data-table :headers="tabla.headers" :items="tabla.libros" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.ISBN }}</td>
        <td>{{ props.item.Titulo }}</td>
        <td>{{ props.item.Editorial }}</td>
        <td>{{ props.item.Edicion }}</td>
        <td>{{ props.item.Autor }}</td>
        <td>
          <v-btn :to="props.item.Ver" color="teal" dark>
            <v-icon>remove_red_eye</v-icon>
          </v-btn>
        </td>
        <td>
          <v-btn color="teal" dark :to="props.item.Oferta">
            <v-icon>remove_red_eye</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>-->
    <v-container fluid grid-list-md>
      <v-data-iterator :items="tabla.libros" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" row wrap content-tag="v-layout">
        <template v-slot:item="props">
          <v-flex xs12 sm6 md4 lg3>
            <v-card>
              <v-card-title primary-title>
                <div>
                <div class="headline">{{props.item.Titulo}}</div>
                <span class="grey--text">{{props.item.Autor}}</span>
                </div>
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{props.item.ISBN}}</v-list-tile-title>
                      <v-list-tile-sub-title>ISBN</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{props.item.Editorial}}</v-list-tile-title>
                      <v-list-tile-sub-title>Editorial</v-list-tile-sub-title>
                    </v-list-tile-content>  
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{props.item.Edicion}}</v-list-tile-title>
                      <v-list-tile-sub-title>Edición</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="teal" :to="props.item.Ver"><v-icon>remove_red_eye</v-icon></v-btn>
                <v-btn flat color="teal" :to="props.item.Oferta"><v-icon>shopping_cart</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { APIService } from '@/APIService';

const apiService = new APIService();
export default {
  name: 'buscarLibro',
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  data: () => ({
    autores: [],
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    },
    tabla: {
      libros: [],
      headers: [
        { text: 'ISBN', value: 'ISBN' },
        { text: 'Titulo', value: 'Edicion' },
        { text: 'Editorial', value: 'Editorial' },
        { text: 'Edicion', value: 'Titulo' },
        { text: 'Autor', value: 'Autor' },
        { text: 'Ver', value: 'Ver' },
        { text: 'Oferta', value: 'Oferta' },
      ],
    },
  }),
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push('/');
      return false;
    }
    document.getElementById('loader').style='display:absolute;'
    apiService
      .getAutores()
      .then((res) => {
        this.autores = res.data.autores;
        apiService
          .getLibros()
          .then((res) => {
            const libros = res.data.libros;
            for (let libro of libros) {
              if (libro.Autor) {
                const autor = this.autores
                  .map(e => e._id)
                  .indexOf(libro.Autor);
                if (autor) {
                  libro.Autor = `${this.autores[autor].Nombre} ${this.autores[autor].Apellidos}`;
                }
              }
              libro.Ver = `/verLibro/${libro._id}`;
              libro.Oferta = `/nuevaOferta/${libro._id}`;
            }
            this.tabla.libros = libros;
            document.getElementById('loader').style='display:none;'
          })
          .catch((err) => {
            document.getElementById('loader').style='display:none;'
            console.log(err);
          });
      })
      .catch((err) => {
        document.getElementById('loader').style='display:none;'
        console.log(`Error ${err}`);
      });
  },
};
</script>

<style></style>
