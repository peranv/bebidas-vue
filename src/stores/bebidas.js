import { ref, reactive, onMounted } from 'vue'
import { defineStore } from 'pinia' 
import APIService from '../services/APIService'



export const useBebidasStore = defineStore('bebidas', () =>{
   const categorias = ref([])
   const busqueda = reactive({
     nombre:'',
     categorias:''
   })

   onMounted(async() => {
    // se puede omitir .get proque es el metodo default
      const {data: { drinks}} = await APIService.obtenerCategorias()
      //console.log(data.data.drinks)
      
      categorias.value = drinks
      //console.log(categorias.value)
   })

   function obtenerRecetas(){
      console.log('Consultando API...')
   }

   return {
      categorias,
      busqueda,
      obtenerRecetas
   }
})