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
            instructions:"",
            minTime:"",
            maxTime:""
        }
    }
    
    constructQuery_1=()=>{
        var q = []
        for(var v of this.state.vegetables){
            q.push(v)
        }
        for(var v of this.state.meat){
            q.push(v)
        }
        for(var v of this.state.staple_food){
            q.push(v)
        }
        return q;
    }

    getData=async()=>{
        var q = this.constructQuery_1()
        if(q.length === 0) alert("Please choose food material")
        var query;
        if(this.state.minTime > this.state.maxTime && this.state.minTime !== "" && this.state.maxTime !== ""){
            alert("Minimum time should be smaller than maximum time, please choose your time span again")
            this.setState({minTime:"", maxTime:""})
        }
        if(this.state.minTime !== "" && this.state.maxTime !== ""){
            query = {
                'material': q,
                'tag':this.state.cuisine,
                'minTime':this.state.minTime,
                'maxTime':this.state.maxTime
            }
        }else if(this.state.minTime !== ""){
            query = {
                'material': q,
                'tag':this.state.cuisine,
                'minTime':this.state.minTime
            }
        }else if(this.state.maxTime !== ""){
            query = {
                'material': q,
                'tag':this.state.cuisine,
                'maxTime':this.state.maxTime
            }
        }else {
            query = {
                'material': q,
                'tag':this.state.cuisine
            }
        }
        console.log(query)
        await api.getRecipe(query)
            .then(response=>{
                console.log(response)
                if(response.data.data.length === 0){
                    this.setState({
                        vegetables:new Set(),
                        meat:new Set(),
                        staple_food:new Set()
                    })
                    alert("Please choose again");
                }else if(response.data.error) alert(response.data.error);
                this.setState({
                    list:response.data.data
                })
            })
            .then(error=>console.log(error))
    }
    
    getStrictData = async()=>{
        var q = this.constructQuery_1()
        if(q.length === 0) alert("Please choose food material")
        var query;
        if(this.state.minTime > this.state.maxTime && this.state.minTime !== "" && this.state.maxTime !== ""){
            alert("Minimum time should be smaller than maximum time, please choose your time span again")
            this.setState({minTime:"", maxTime:""})
        }
        if(this.state.minTime !== "" && this.state.maxTime !== ""){
            query = {
                'material': q,
                'tag':this.state.cuisine,
                'minTime':this.state.minTime,
                'maxTime':this.state.maxTime
            }
        }else if(this.state.minTime !== ""){
            query = {
                'material': q,
                'tag':this.state.cuisine,
                'minTime':this.state.minTime
            }
        }else if(this.state.maxTime !== ""){
            query = {
                'material': q,
                'tag':this.state.cuisine,
                'maxTime':this.state.maxTime
            }
        }else {
            query = {
                'material': q,
                'tag':this.state.cuisine
            }
        }
        console.log(query)
        try{
            await api.getStrictRecipe(query)
            .then(response=>{
                console.log(response)
                console.log(response.data)
                console.log(response.data.data[0])
                if(response.data.data.length === 0){
                    this.setState({
                        vegetables:new Set(),
                        meat:new Set(),
                        staple_food:new Set()
                    })
                    alert("Please choose again");
                }else if(response.data.error) alert(response.data.error)
                else{
                    this.setState({
                      list:response.data.data
                     })
                     for(var c of this.state.list) console.log(c)
                }
            })
            .then(error=>{
                if(error === 'undefined') alert('Recipe found.')
                else if(error === 'AxiosError: Request failed with status code 400') alert('Recipe not found, please choose again')
            })
        }catch(e){
           console.error(e)
        }finally{
            console.log('Done')
        }
        
    }

    getRandom = async()=>{
        await api.randomRecipe()
        .then(response=>{
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
    showIngredients(){
        var str = "";
        for(var i = 0; i < this.state.ingredients.length; i++){
            str += this.state.ingredients[i] +"\n"
        }
        return str;
    }

    showRandom(){
        let res;
        if((this.state.totalTime) !== "" && (this.state.cuisineType) !== ""){
        res = 
            <div> 
                <a href={this.state.url}>
                    <img src={this.state.image} title={this.showIngredients()}/>
                </a>
                <p>{(String)(this.state.label)}</p>
                <span>Total Time : {(String)(this.state.totalTime)} Mins</span>
                <br></br>
                <span>Cuisine Type: {(String)(this.state.cuisineType)}</span>
            </div>
        }
        else if((this.state.cuisineType) !== ""){
            res = 
            <div> 
                <a href={this.state.url}>
                    <img src={this.state.image} title={this.showIngredients()}/>
                </a>
                <p>{(String)(this.state.label)}</p>
                <br></br>
                <span>Cuisine Type: {(String)(this.state.cuisineType)}</span>
            </div>
        }
        else if((this.state.totalTime !== "")){
            res = 
            <div> 
                <a href={this.state.url}>
                    <img src={this.state.image} title={this.showIngredients()}/>
                </a>
                <p>{(String)(this.state.label)}</p>
                <span>Total Time : {(String)(this.state.totalTime)} Mins</span>
                <br></br>
            </div>
        }
        else {
            res = ""
        }
        return res;
    }
    showIngredients_1(ingredients){
        var str ="";
        for(var i = 0; i < ingredients.length; i++){
            str += ingredients[i] + "\n";
        }
        return str;
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
                                    <img src={value.image} title={this.showIngredients_1(value.ingredients)}/>
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
    getLongestTimeRecipe = async()=>{
            await api.getLongestTimeRecipe()
            .then(response=>{
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
    updateMeat(props){
        this.state.meat.add(props);
    }
    updateStaple(props){
        this.state.staple_food.add(props);
    }
    updateVege(props){
        this.state.vegetables.add(props);
    }
    updateCuisine(props){
        this.setState({cuisine:props})
    }
    updateMinTime(props){
        this.setState({minTime:props})
        console.log(this.state.minTime)
    }
    updateMaxTime(props){
        this.setState({maxTime:props})
        console.log(this.state.maxTime)
    }
    render(){
        
        return(
            <div> 
                <div className="header">Welcome!</div>
                <div className='header'>🥙Let's start cooking!🥗</div>
                <div className='btn-container-1'> 
                <button className="btn get_random" onClick={this.getRandom}>Don't know what to eat? Let's get one random recipe!</button>
                {/* <button className="btn get_random" onClick={this.getLongestTimeRecipe}>Try the recipe that would cost you a whole week!</button>
                 */}
                </div>
                <div className='btn-container'>     
                    <h3 className="material_title">Choose your cuisine type</h3>
                    <button className="btn choose" onClick={()=>this.updateCuisine("chinese")}>Chinese</button>
                    <button className="btn choose" onClick={()=>this.updateCuisine("indian")}>Indian</button>
                    <button className="btn choose" onClick={()=>this.updateCuisine("american")}>American</button>
                    <button className="btn choose" onClick={()=>this.updateCuisine("thai")}>Thai</button>
                    <button className="btn choose" onClick={()=>this.updateCuisine("english")}>English</button>
                    <button className="btn choose" onClick={()=>this.updateCuisine("vietnamese")}>Vietnamese</button>
                    <button className="btn choose" onClick={()=>this.updateCuisine("french")}>French</button>
                    <button className="btn choose" onClick={()=>this.updateCuisine("japanese")}>Japanese</button>
                    <button className="btn choose" onClick={()=>this.updateCuisine("mexican")}>Mexican</button>
                </div>
                <div className='btn-container'>  
                    <h3 className="material_title">Choose your vegetables</h3>
                    <button className="btn choose" onClick={()=>this.updateVege("tomato")}>Tomato</button>
                    <button className="btn choose" onClick={()=>this.updateVege("potato")}>Potato</button>
                    <button className="btn choose" onClick={()=>this.updateVege("lettuce")}>Lettuce</button>
                    <button className="btn choose" onClick={()=>this.updateVege("spinach")}>Spinach</button>
                    <button className="btn choose" onClick={()=>this.updateVege("celery")}>Celery</button>
                    <button className="btn choose" onClick={()=>this.updateVege("soy")}>Soy</button>
                    <button className="btn choose" onClick={()=>this.updateVege("cucumber")}>Cucumber</button>
                    <button className="btn choose" onClick={()=>this.updateVege("cabbage")}>Cabbage</button>
                </div>
                <div className='btn-container'>  
                    <h3 className="material_title">Choose your meat</h3>
                    <button className="btn choose" onClick={()=>this.updateMeat("beaf")}>Beaf</button>
                    <button className="btn choose" onClick={()=>this.updateMeat("pork")}>Pork</button>
                    <button className="btn choose" onClick={()=>this.updateMeat("ham")}>Ham</button>
                    <button className="btn choose" onClick={()=>this.updateMeat("chicken")}>Chicken</button>
                    <button className="btn choose" onClick={()=>this.updateMeat("egg")}>Egg</button>
                    <button className="btn choose" onClick={()=>this.updateMeat("fish")}>Fish</button>
                </div>
                <div className='btn-container'>  
                    <h3 className="material_title">Choose your staple food</h3>
                    <button className="btn choose" onClick={()=>this.updateStaple("rice")}>Rice</button>
                    <button className="btn choose" onClick={()=>this.updateStaple("noodle")}>Noodle</button>
                    <button className="btn choose" onClick={()=>this.updateStaple("pasta")}>Pasta</button>
                    <button className="btn choose" onClick={()=>this.updateStaple("flour")}>Flour</button>
                </div>
                <div className='btn-container'>  
                    <h3 className="material_title">Choose the seasoning you want to use</h3>
                    <button className="btn choose" onClick={()=>this.updateVege("vinegar")}>Vinegar</button>
                    <button className="btn choose" onClick={()=>this.updateVege("curry")}>Curry</button>
                    <button className="btn choose" onClick={()=>this.updateVege("salt")}>Salt</button>
                    <button className="btn choose" onClick={()=>this.updateVege("pepper")}>Pepper</button>
                    <button className="btn choose" onClick={()=>this.updateVege("olive oil")}>Olive Oil</button>
                    <button className="btn choose" onClick={()=>this.updateVege("sugar")}>Sugar</button>
                </div>
                <div className='btn-container'>  
                    <h3 className="material_title">The minimum time you are willing to spend on cooking</h3>
                    <button className="btn choose" onClick={()=>this.updateMinTime("10")}>10 Mins</button>
                    <button className="btn choose" onClick={()=>this.updateMinTime("20")}>20 Mins</button>
                    <button className="btn choose" onClick={()=>this.updateMinTime("30")}>30 Mins</button>
                    <button className="btn choose" onClick={()=>this.updateMinTime("40")}>40 Mins</button>
                    <button className="btn choose" onClick={()=>this.updateMinTime("50")}>50 Mins</button>
                    <button className="btn choose" onClick={()=>this.updateMinTime("60")}>60 Mins</button>
                </div>
                <div className='btn-container'>  
                    <h3 className="material_title">And the maximum time you are willing to spend on cooking</h3>
                    <button className="btn choose" onClick={()=>this.updateMaxTime("10")}>10 Mins</button>
                    <button className="btn choose" onClick={()=>this.updateMaxTime("20")}>20 Mins</button>
                    <button className="btn choose" onClick={()=>this.updateMaxTime("30")}>30 Mins</button>
                    <button className="btn choose" onClick={()=>this.updateMaxTime("40")}>40 Mins</button>
                    <button className="btn choose" onClick={()=>this.updateMaxTime("50")}>50 Mins</button>
                    <button className="btn choose" onClick={()=>this.updateMaxTime("60")}>60 Mins</button>
                </div>
                <h2 className='get_title'>Get Recipe</h2>  
                <div className='btn-container-1'>
                <button className="btn get_recipe" onClick={this.getStrictData}>Get Recipe That contains all the food material</button>
                <button className="btn get_recipe" onClick={this.getData}>Get Recipe That contains some of the food material</button>
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
