const express = require('express');
const bodyParser = require('body-parser')
const querystring = require('querystring')
const app = express();
const db = require('./db')
const cors = require('cors');
const {URL, URLSearchParams} = require('url');
const got = require('got')
const {food_api_id, food_api_key}= require('./api-key')

const RecipeRouter = require('./routes/recipe-router')

// var corsOptions = {
//     credentials:true,
//     origin:'http://localhost:3000',
//     optionsSuccessStatus:200
//   };

//app.use(cors(corsOptions));
app.use(cors());
app.use(express.urlencoded({extended: true})); // 必须要加
app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json()); // 必须要加

db.on('error',console.error.bind(console,'MongoDB connection error:'))




app.get('/getRecipe',async function (req, res){
    const url = new URL("https://api.edamam.com/search?");
    const params = querystring.stringify({
            
        q:'tomato,egg,spinach',
        app_id: food_api_id,
        app_key:food_api_key,
        cuisineType:"chinese",
        //time:10
    })

    const final_url = url + params;
   
   let v;
    try{
        //const res = await got.get('https://jsonplaceholder.typicode.com/posts/1').json();
        //console.log(res);
        
        //const final_url = 'https://api.edamam.com/api/recipes/v2?type=public&q=egg%2Cspinach%20ham&app_id=8ec3fe8a&app_key=f9ed737d34092ca3e40cd93f1a799a1d';
        console.log(final_url);
        v = await got.get(final_url).json();
        console.log('receiving data...');
        res.send(v);
        console.log('recipe displaying');
    }catch(error){
        console.log(error);
   }
   //return v.hits;
}
)
app.get('/',(req, res) =>{
    res.send('Welcome!!')
})


app.use('/api',RecipeRouter)

app.listen(5000, ()=>{
    console.log('Your server is workint in port 5000.')
});

module.exports=app;