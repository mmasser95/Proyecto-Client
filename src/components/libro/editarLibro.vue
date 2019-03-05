<template>
    <div class="editarLibro"></div>
</template>

<script>
import {mapGetters} from 'vuex';
import {APIService} from '@/APIService';
const apiService = new APIService();
export default {
    name:'editarLibro',
    props:['idLibro'],
    data:()=>{
        return{
            libro:{},
            form:{
                datos:{},
                rules:{}
            }
        }
    },
    methods:{},
    computed:{
        ...mapGetters(['isLoggedIn', 'tipoUser'])
    },
    created:function(){
        if(!this.isLoggedIn || this.tipoUser.tipo!='admin'){
            this.$router.push('/');
            return false;
        }
        apiService
            .getLibro(this.idLibro)
            .then((res) => {
                this.libro = res.data.libro;
            }).catch((err) => {
                this.$router.push('/');
            });

    }
}
</script>
