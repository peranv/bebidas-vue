import { ref, reactive, onMounted, computed } from 'vue'
import { defineStore } from 'pinia' 
import APIService from '../services/APIService'
import { useModalStore } from './modal'



export const useBebidasStore = defineStore('bebidas', () =>{
   const modal = useModalStore()
   const categorias = ref([])
   const busqueda = reactive({
     nombre:'',
     categorias:''
   })
   const recetas = ref([])
   const receta = ref({})

   onMounted(async() => {
    // se puede omitir .get proque es el metodo default
      const {data: { drinks}} = await APIService.obtenerCategorias()
      //console.log(data.data.drinks)
      
      categorias.value = drinks
      //console.log(categorias.value)
   })

    async function  obtenerRecetas(){
     const {data: {drinks}} =  await APIService.buscarRecetas(busqueda)
     recetas.value = drinks
   }

    async function seleccionarBebida(id) {
     const {data: {drinks }} = await APIService.buscarReceta(id)
     receta.value = drinks[0]
     modal.handleClickModal()
   }

   const noRecetas = computed(()=> recetas.value.length ===0)

   return {
      categorias,
      busqueda,
      obtenerRecetas,
      recetas,
      seleccionarBebida,
      receta,
      noRecetas
   }
})