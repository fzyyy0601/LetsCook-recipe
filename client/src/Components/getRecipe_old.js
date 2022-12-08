import React, { Component } from 'react';
import axios from 'axios'
import CallAPI from './CallAPI';
const {URL, URLSearchParams} = require('url');
const food_api_id="8ec3fe8a";
const food_api_key='f9ed737d34092ca3e40cd93f1a799a1d'
const querystring  =require('querystring')

const api = 'http://localhost:5000' // backend address

var random_res = [];

class GetRecipe extends Component{
    
    constructor(props){
        super(props)
        this.state={
            list:[],
            random:[],
            url:null,
            label:null,
            ingredients:[],
            vegetables:new Set(),
            meat:new Set(),
            staple_food:new Set(),
            cuisineType:"",
            totalTime:"",
            image:""
        }
        //this.setState=this.setState.bind(this)
    }
    
    getData=()=>{
        // var url = `${api}/getRecipe`;
        // axios.get(url)
        // .then(response=>{
        //     console.log(response.data.hits[0].recipe.calories)
        //     console.log(response.data.hits[0].recipe.ingredientLines)
        //   //  console.log(response.data.hits.recipe.calories)
        //     this.setState({list:response.data.hits})
        // }).catch(err=>console.log(err))
        const url = "https://api.edamam.com/search?"
        var vege_str = "";
        var meat_str="";
        var staple_str="";
        for(var v of this.state.vegetables){
            vege_str = vege_str+"," + v;
        }
        for(var v of this.state.meat){
            meat_str = meat_str+"," + v;
        }
        for(var v of this.state.staple_food){
            staple_str = staple_str+"," + v;
        }
        console.log(vege_str.slice(1));
        console.log(vege_str.slice(3));
        const q1=(String)(vege_str.slice(1)+","+meat_str.slice(1)+","+staple_str.slice(1));
        console.log(q1);
        const params = querystring.stringify({
            q:q1,
            app_id: food_api_id,
            app_key:food_api_key,
            cuisineType:this.state.cuisine,
            time:`10-45`
        })
        const final_url = url + params;
        console.log(final_url);
        axios.get(final_url)
        .then(response=>{
            console.log(response);
            console.log(response.data.hits[0])
            if(response.data.hits.length === 0){
                this.setState({
                    vegetables:new Set(),
                    meat:new Set(),
                    staple_food:new Set()
                })
                alert("Please choose again");
            }
            this.setState({
                list:response.data.hits
             })
        })
        .then(error=>console.log(error))
    }
    loadData=()=>{
      console.log('check')
      console.log(this.state.random.recipe.calories)
      console.log(this.state.random.recipe.label)
      console.log("ingredient lines"+this.state.random.recipe.ingredientLines)
      console.log(this.state.label)
      console.log(this.state.list)
      console.log(this.state.url)
      console.log(random_res)
      console.log(this.state.ingredients)
      //console.log(random_res[0].calories)
      //console.log(random_res.calories)
      //console.log(this.random_res)
      //this.state.random.map((value, key)=>console.log(value.recipe.calories))
      //this.state.list.map((value, key)=>console.log(value.name))
      //this.state.list.map((value, key)=>console.log(value.value))
      
    }
    randomRecipe=()=>{
        
        var cuisine = new Array();
        cuisine[0] = 'chinese';
        cuisine[1] = 'indian';
        cuisine[2] = 'american';

        var vege = new Array();
        vege[0] = 'tomato';
        vege[1] = 'potato';
        vege[2] = 'lettuce';
        vege[3] = 'spinach';

        var meat=new Array();
        meat[0] = 'ham';
        meat[1] = 'pork';
        meat[2] = 'fish';
        meat[3] = 'egg';

        var index = Math.floor((Math.random()*vege.length)); 
        console.log(vege[index])

        var index2 =  Math.floor((Math.random()*meat.length)); 
        console.log(meat[index2])
        var index3 =  Math.floor((Math.random()*cuisine.length)); 
        console.log(cuisine[index3])
        const url = "https://api.edamam.com/search?"
        const q1=(String)(vege[index]+","+meat[index2]+",spinach");
        console.log(q1);
        const params = querystring.stringify({
            q:q1,
            app_id: food_api_id,
            app_key:food_api_key,
            cuisineType:(String)(cuisine[index3]),
           
        })
        const final_url = url + params;
        
    //const final_url = 'https://api.edamam.com/api/recipes/v2?type=public&q=egg%2Cspinach%20ham&app_id=8ec3fe8a&app_key=f9ed737d34092ca3e40cd93f1a799a1d';
        console.log(final_url);
        axios.get(final_url)
        .then(response=>{
            console.log(response);
            console.log(response.data.hits[0])
            console.log(response.data.hits.length)
            if(response.data.hits.length === 0){
                alert("Please random again");
                
            }
            //var rand = 3;
            const rand = Math.floor((Math.random()*response.data.hits.length))
            //console.log(response.data.hits[2].ingredientLines)
            this.setState({
                //random:response.data.hits[2],
                url:response.data.hits[rand].recipe.url,
                label:response.data.hits[rand].recipe.label,
                totalTime:response.data.hits[rand].recipe.totalTime,
                cuisineType:response.data.hits[rand].recipe.cuisineType,
                ingredients:response.data.hits[rand].recipe.ingredientLines,
                image:response.data.hits[rand].recipe.image
             })
            //this.random_res = response.data.hits[2];
            
        })
        .then(error=>console.log(error))  
}
    updateMeat(props){
        this.state.meat.add(props);
        console.log(this.state.meat)
    }
    updateStaple(props){
        this.state.staple_food.add(props);
        console.log(this.state.staple_food)
    }
    updateVege(props){
        this.state.vegetables.add(props);
        console.log(this.state.vegetables)
    }
    updateCuisine(props){
        this.state.cuisine = props;
        console.log(this.state.cuisine)
    }
    render(){
        return(
            <div> 
                <div className='btn-container-1'> 
                <button className="btn get_random" onClick={this.randomRecipe}>Don't know what to eat? Let's get one random recipe!</button>
                </div>
                <div className='btn-container'>     
                    <h3 className="material_title">Choose your cuisine type</h3>
                    <button className="btn choose" onClick={()=>this.updateCuisine("chinese")}>Chinese</button>
                    <button className="btn choose" onClick={()=>this.updateCuisine("indian")}>Indian</button>
                    <button className="btn choose" onClick={()=>this.updateCuisine("american")}>American</button>
                </div>
                <div className='btn-container'>  
                    <h3 className="material_title">Choose your vegetables</h3>
                    <button className="btn choose" onClick={()=>this.updateVege("tomato")}>Tomato</button>
                    <button className="btn choose" onClick={()=>this.updateVege("potato")}>Potato</button>
                    <button className="btn choose" onClick={()=>this.updateVege("lettuce")}>Lettuce</button>
                    <button className="btn choose" onClick={()=>this.updateVege("spinach")}>Spinach</button>
                </div>
                <div className='btn-container'>  
                    <h3 className="material_title">Choose your meat</h3>
                    <button className="btn choose" onClick={()=>this.updateMeat("pork")}>Pork</button>
                    <button className="btn choose" onClick={()=>this.updateMeat("ham")}>Ham</button>
                    <button className="btn choose" onClick={()=>this.updateMeat("chicken")}>Chicken</button>
                    <button className="btn choose" onClick={()=>this.updateMeat("egg")}>Egg</button>
                </div>
                <div className='btn-container'>  
                    <h3 className="material_title">Choose your staple food</h3>
                    <button className="btn choose" onClick={()=>this.updateStaple("rice")}>Rice</button>
                    <button className="btn choose" onClick={()=>this.updateStaple("noodle")}>Noodle</button>
                    <button className="btn choose" onClick={()=>this.updateStaple("pasta")}>Pasta</button>
                </div>
                <h2 className='get_title'>Get Recipe</h2>  
                <div className='btn-container-1'>
                <button className="btn get_recipe" onClick={this.getData}>Get Recipe!</button>
                </div>
                
                <div id="random">
                    <a href={this.state.url}>
                                    <img src={this.state.image}/>
                                    </a>
                                    <p>{(String)(this.state.label)}</p>
                                    <span>Total Time : {this.state.totalTime} Mins</span>
                                    <br></br>
                                    <span>Cuisine Type: {this.state.cuisineType}</span>
                    {/* <p>{this.state.url}</p>
                    <p>{this.state.label}</p> */}
                </div>
                {/* <ul>{this.state.ingredients.map((value, key)=>{
                    return <li key={key}>{(String)(value)}</li>
                 })}</ul> */}
                <div id="main">
                    <div className='item'>
                    <ul>
                     {this.state.list.map((value, key)=>{
                    return(
                        <li>
                            <div className='content'>
                                <a href={value.recipe.url}>
                                    <img src={value.recipe.image}/>
                                    </a>
                                    <p>{(String)(value.recipe.label)}</p>
                                    <span>Total Time : {(String)(value.recipe.totalTime)}</span>
                                    <br />
                                    <span>Cuisine Type: {(String)(value.recipe.cuisineType)}</span>
                                    {/* <span>{()=>{
                                        <ul>
                                            {value.recipe.ingredientLines.map((val,key1)=>{
                                                return<li key={key1}>{val}</li>
                                            })}
                                        </ul>
                                    }}</span> */}
                            </div>
                        </li>
                    )
                    })}
                {/* <li>
                    <div className='content'>
                        <a href="#">
                            <img src={`https://htmlcolorcodes.com/assets/images/colors/grass-green-color-solid-background-1920x1080.png`}/>
                        </a>
                            <p>Happy hour</p>
                            <span>&yen;188.0</span>
                        
                    </div>
                </li> */}
                    </ul>
                </div>
            </div>
        </div>

        )
    }
    
}

export default GetRecipe;
//import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
// var data = JSON.parse(JSON.stringify([
//     {
//       "companyName": "Demo1 Technologies",
//       "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
//       "url": "https://www.google.com/",
//       "roles": [
//         {
//           "title": "Full Stack Developer",
//           "description": "Built and updated various Chrome Extensions.",
//           "startDate": "2017-01-01",
//           "endDate": "2017-05-01",
//           "location": "New York, USA"
//         }
//       ]
//     }]));
//<FlatList
// data={data}
// renderItem={({ item }) => {
//   return (
//     <View>
//       <Text>{item.roles[0].title}</Text>
//     </View>
//   );
// }}
// />
// <p>{(String)(this.state.list.recipe.image)}</p>
{/* <ul>{this.state.random.map((value, key)=>{
            return <li key={key}>{(String)(value.recipe.image)}</li>
         })}</ul> */}