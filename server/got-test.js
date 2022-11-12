const got = require('got') // for REST API call
//const JSON = require('JSON')
const querystring = require('querystring')
//import {food_api_id, food_api_key} from 'conf.js'
const food_api_id="8ec3fe8a";
const food_api_key='f9ed737d34092ca3e40cd93f1a799a1d'
// const food_api_id = conf.food_api_id;
// const food_api_key = conf.food_api_key;
//import { URLSearchParams } from 'url'
//const url = require('url')
//const URLSearchParams = new url.URLSearchParams()

const getData = async function (req, res){
    const url = "https://api.edamam.com/search?"
        
    try{
        //const res = await got.get('https://jsonplaceholder.typicode.com/posts/1').json();
        const params = querystring.stringify({
            
                q:'tomato,egg,spinach ',
                app_id: food_api_id,
                app_key:food_api_key,
                
            })
        
        const final_url = url + params;
        //const final_url = "https://api.edamam.com/api/recipes/v2?type=public&q=egg%2Cspinach%20ham&app_id=8ec3fe8a&app_key=f9ed737d34092ca3e40cd93f1a799a1d"
        console.log(final_url);
        res = await got.get(final_url).json();
        console.log(res.hits);
        return res;
    }catch(error){
        console.log(error);
   }
}

module.exports = getData;
//getData()