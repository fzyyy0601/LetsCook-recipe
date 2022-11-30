import React from 'react'
import axios from 'axios'
const api = 'http://localhost:5000' // backend address
const food_api_id="8ec3fe8a";
const food_api_key='f9ed737d34092ca3e40cd93f1a799a1d'
var cuisine = new Array();
cuisine[0] = 'chinese'
cuisine[1] = 'indian'
cuisine[2] = 'american'

var vege = new Array();
vege[0] = 'tomato';
vege[1] = 'potato';
vege[2] = 'lettuce'

var meat=new Array();
meat[0] = 'ham';
meat[1] = 'pork'
meat[2] = 'fish'

var index = Math.floor((Math.random()*vege.length)); 


var index2 =  Math.floor((Math.random()*meat.length)); 

var index3 =  Math.floor((Math.random()*cuisine.length)); 


export default function GetRandomRecipe(){
    return axios.get(`${api}/random`)
}