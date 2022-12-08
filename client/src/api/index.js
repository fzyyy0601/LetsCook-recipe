import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5000/api',
})
export const randomRecipe =()=>api.get(`/random`)
export const getRecipe=payload=>api.post(`/getRecipe`,payload)

const apis ={
    randomRecipe,
    getRecipe,
}

export default apis
