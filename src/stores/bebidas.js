import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia' 
import axios from 'axios'


export const useBebidasStore = defineStore('bebidas', () =>{
   const categorias = ref([])

   onMounted(async() => {
    // se puede omitir .get proque es el metodo default
      const {data: { drinks}} = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      //console.log(data.data.drinks)
      
      categorias.value = drinks
      //console.log(categorias.value)
   })

   return {
      categorias
   }
})