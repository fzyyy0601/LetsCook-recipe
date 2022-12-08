import React, { Component ,useState} from 'react';
import api from '../api'

class GetRecipe extends Component{

    constructor(props){
        super(props)
        this.state={
            cuisine:"",
            list:[],
            random:[],
            url:"",
            label:"",
            ingredients:[],
            vegetables:new Set(),
            meat:new Set(),
            staple_food:new Set(),
            cuisineType:"",
            totalTime:"",
            image:"",
            instructions:""
        }
    }
    
    getData=()=>{
        var q =[]
        for(var v of this.state.vegetables){
            q.push(v)
        }
        for(var v of this.state.meat){
            q.push(v)
        }
        for(var v of this.state.staple_food){
            q.push(v)
        }
        console.log(q);
        var query = {
            'material': q,
            'tag':this.state.cuisine,
            'minTime':20,
            'maxTime':35
        }
        
        api.getRecipe(query)
        .then(response=>{
            // console.log(response);
            // console.log(response.data.data[0])
            if(response.data.data.length === 0){
                this.setState({
                    vegetables:new Set(),
                    meat:new Set(),
                    staple_food:new Set()
                })
                alert("Please choose again");
            }
            this.setState({
                list:response.data.data
             })
        })
        .then(error=>console.log(error))
    }
    
    getRandom = async()=>{
        await api.randomRecipe()
        .then(response=>{
            console.log(response);
            console.log(response.data.data)
            console.log(response.data.data[0])
            console.log(response.data.data[0].ingredients)
            this.setState({
                _id:response.data.data[0]._id,
                url:response.data.data[0].url,
                label:response.data.data[0].title,
                totalTime:response.data.data[0].totaltime,
                cuisineType:response.data.data[0].tag,
                ingredients:response.data.data[0].ingredients,
                image:response.data.data[0].image,
                instructions: response.data.data[0].instructions
             })
        })
        .then(error=>console.log(error)) 
    }
    showRandom(){
        let res;
        if((this.state.totalTime) !== "" && (this.state.cuisineType) !== ""){
        res = 
            <div> 
                <a href={this.state.url}>
                    <img src={this.state.image}/>
                </a>
                <p>{(String)(this.state.label)}</p>
                <span>Total Time : {(String)(this.state.totalTime)} Mins</span>
                <br></br>
                <span>Cuisine Type: {(String)(this.state.cuisineType)}</span>
                <p>{(String)(this.state.instructions)}</p>
            </div>
        }
        else if((this.state.cuisineType) !== ""){
            res = 
            <div> 
                <a href={this.state.url}>
                    <img src={this.state.image}/>
                </a>
                <p>{(String)(this.state.label)}</p>
                <br></br>
                <span>Cuisine Type: {(String)(this.state.cuisineType)}</span>
                <p>{(String)(this.state.instructions)}</p>
            </div>
        }
        else if((this.state.totalTime !== "")){
            res = 
            <div> 
                <a href={this.state.url}>
                    <img src={this.state.image}/>
                </a>
                <p>{(String)(this.state.label)}</p>
                <span>Total Time : {(String)(this.state.totalTime)} Mins</span>
                <br></br>
                <p>{(String)(this.state.instructions)}</p>
            </div>
        }
        else {
            res = ""
        }
        console.log(this.state.totalTime)
        console.log(this.state.cuisineType)
        return res;
    }
    showRecipe(){
        return(
                <div className='item'>
                    <ul>
                     {this.state.list.map((value, key)=>{
                    return(
                        <li>
                            <div key={value._id} className='content'>
                                <a href={value.url}>
                                    <img src={value.image}/>
                                </a>
                                <p>{(String)(value.title)}</p>
                                <span>Total Time : {(String)(value.totaltime)}</span>
                                <br />
                                <span>Cuisine Type: {(String)(value.tag)}</span>
                            </div>
                        </li>
                    )
                    })}
                    </ul>
                </div>
        )
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
                <div className="header">Welcome!</div>
                <div className='header'>🥙Let's start cooking!🥗</div>
                <div className='btn-container-1'> 
                <button className="btn get_random" onClick={this.getRandom}>Don't know what to eat? Let's get one random recipe!</button>
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
                    {this.showRandom()}
                </div>
                
                <div id="main">
                    {this.showRecipe()}
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