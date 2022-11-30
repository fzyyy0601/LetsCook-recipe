import React,{useEffect, useState} from 'react';

import CallAPI from './CallAPI';

export default function Page(){
    const [content, setContent] = useState("")
    const [greeting, setGreeting] = useState("")
   // const[recipes, setRecipe] = useState([])

    function getContent(){
        CallAPI.getSomething()
        .then(response =>{
            console.log(response.data)
            setContent(response.data)
        })
    }
    useEffect(()=>{getContent()},[]);
    console.log(content);

    function handleClick(){
        CallAPI.sendSomething({"name":"Monday"})
        .then(response=>{
            console.log(response.data)
            setGreeting(response.data)
        })
    }
    function handleRandom(){
        CallAPI.getSomething()
        .then(response=>{
            console.log(response.data)
            setGreeting(response.data)
        })
    }
    
    
    return(
        <>
        <h2>  Here is the Recipe we got for you</h2>
        <button onClick={handleClick} >Monday!</button>
        <button onClick ={handleRandom}>Random!!</button>
        <div>
        {content}
        </div>
        <div>{greeting}</div>
       {/* <button onClick={handleRecipe}>Let's start cooking!</button>
        {recipes} */}
        
        </>
    )
}
//{recipes.map(recipe=><div>{recipe.name}</div>)}
// <p>{JSON.stringify(recipes)}</p>