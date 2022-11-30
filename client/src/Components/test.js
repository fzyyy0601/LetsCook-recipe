// const querystring  =require('querystring')
// const num=[45,3,2]
// let txt=""
// num.forEach(myFunc)

// function myFunc(value){
//     txt += value +"<br>"
// }
// let txt2 = "";
// const numbers2 = num.map(myFunc2)

// function myFunc2(value, index, array){
//     value *= 2;
//     txt2 += value+'//'+index+'*'
// }
// console.log(txt);

// console.log(txt2)

// var cuisine = new Array();
//         cuisine[0] = 'chinese';
//         cuisine[1] = 'indian';
//         cuisine[2] = 'american';

//         var vege = new Array();
//         vege[0] = 'tomato';
//         vege[1] = 'potato';
//         vege[2] = 'lettuce';

//         var meat=new Array();
//         meat[0] = 'ham';
//         meat[1] = 'pork';
//         meat[2] = 'fish';

//         var index = Math.floor((Math.random()*vege.length)); 
//         console.log(vege[index])

//         var index2 =  Math.floor((Math.random()*meat.length)); 
//         console.log(meat[index2])
//         var index3 =  Math.floor((Math.random()*cuisine.length)); 
//         console.log(cuisine[index3])
//        // const url = new URL("https://api.edamam.com/search?");
// const q1=(String)(vege[index]+","+meat[index2]);
// console.log(q1)
// const food_api_id="8ec3fe8a";
// const food_api_key='f9ed737d34092ca3e40cd93f1a799a1d'
// const url = "https://api.edamam.com/search?"


// const params = querystring.stringify({
//             q:q1,
//             app_id: food_api_id,
//             app_key:food_api_key,
//             cuisineType:(String)(cuisine[index3]),
//             //time:10
//         })

//         const final_url = url + params;
//         console.log(final_url)

var recipe;
var test2 = {"label":"","url":""};
const fs = require('fs')
fs.readFile('./v2.json','utf-8',(err, jsonStr)=>{
    if(err){
        console.log('Error reading file from disk', err);
        return;
    }try{
        recipe = JSON.parse(jsonStr).hits
        console.log("the file inside",recipe[0].recipe.url)
        console.log("the file inside",recipe[0].recipe.ingredientLines)
        test2.label = recipe[0].recipe.label;
        test2.url = recipe[0].recipe.url;
        then(console.log(test2))
    }catch(err){
    console.log(err);
}})
recipe = JSON.parse(fs.readFileSync('./v2.json')).hits
console.log(typeof recipe)
console.log(typeof test2);
console.log(test2["label"])
console.log("***********")
console.log(test2.label)
//console.log(test2)

//console.log(recipe)
console.log('******')
console.log(recipe['recipe']) // undefined
//console.log(recipe.recipe) undefined
//console.log(recipe.hits)
//console.log(recipe.hits.recipe)
// for(var p in recipe){
//   //  recipe[p] = recipe.hits[p]
//     console.log('test')
//     console.log(recipe[p].recipe.label)
//     console.log(recipe[p].recipe.ingredients)
//     console.log(recipe[p].recipe.image)
// }
//import v2 from 'C:/Users/冯ziyue/Desktop\html_tutorial/images/v2.json'
console.log('test')
var tes = [2,3,4,5]
for(var k in tes){
    console.log(k)
}