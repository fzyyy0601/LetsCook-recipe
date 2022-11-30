import axios from 'axios'
const api = 'http://localhost:5000' // backend address

class CallAPI{
    getRecipe(){
        return axios.get(`${api}/getRecipe`)
    }
    getSomething(){
        return axios.get(`${api}/data/random`)
    }
    sendSomething(body){
        return axios.post(`${api}/hello`,body)
    }
}
export default new CallAPI();