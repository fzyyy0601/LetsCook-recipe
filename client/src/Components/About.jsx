import React from 'react'
import './about.css'
var img = require('./img/Cooking-conversion-chart.jpg')

export const About=()=>{
    return(
        <div> 
        <div className="about-section">
        <h1 className="about-header">About</h1>
        <h1 className='about-title'>&#127789;Let's cook!&#10024;</h1>
        <p>This is a recipe website, users click on different buttons to choose their options.</p>
        <p> The aim of this recipe is to help people find suitable recipe with less time and more fun.</p>
        <p>After choising, click on <strong>Get Recipe</strong> button to get the search result.</p>
        </div>
        <div className="about-section">
        <h1 className='about-title'>Here is a convertion chart that may be helpful for you. </h1>
        <img src={img} title="click to see more about cooing conversion"/>
        <p className='about-text'>Picture from
        <a href="https://annainthekitchen.com/cooking-conversion-chart/">
         Anna in the Kitchen
            </a>
            </p>
        </div>
        </div>
    )

}