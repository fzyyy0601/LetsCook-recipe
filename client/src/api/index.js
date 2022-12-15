import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5000/api',
})
export const randomRecipe =()=>api.get(`/random`)
export const getLongestTimeRecipe=()=>api.get(`/getLongestTimeRecipe`)
export const getRecipe=payload=>api.post(`/getRecipe`,payload)
export const getStrictRecipe=payload=>api.post(`/getStrictRecipe`,payload)
const apis ={
    randomRecipe,
    getRecipe,
    getLongestTimeRecipe,
    getStrictRecipe
}

export default apis
