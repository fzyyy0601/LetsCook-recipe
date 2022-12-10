import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5000/api',
})
export const randomRecipe =()=>api.get(`/random`)
export const getRecipe=payload=>api.post(`/getRecipe`,payload)
export const getLongestTimeRecipe=()=>api.get(`/getLongestTimeRecipe`)
const apis ={
    randomRecipe,
    getRecipe,
    getLongestTimeRecipe
}

export default apis
