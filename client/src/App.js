import React from 'react';
import ReactDOM from 'react-dom/client';
import './app.css';
import GetRandomRecipe from './Components/RandomRecipe';
import Page from './Components/Page';
import GetRecipe from './Components/getRecipe';
import Vege from './Components/Vege'
function App() {
  
  return(
    <>
    <div className="header">Welcome!</div>
    <div className='header'>🥙Let's start cooking!🥗</div>
    
    <br></br>
    <GetRecipe />
    </>
  )
  
}
export default App;
//module.exports = APP;
/*
<Vege />
<Page />
return (
    <>
    <h1 class='header'>Welcome to Smart Recipe!</h1>
    <button class='btn-random-recipe' onClick={randomRecipe}>Don't know how to choose? Randomly get a recipe!</button>
    <h2 class='header sub-header'>What type of food you wanna do?</h2>
    <span class='container'>
      <label>
      <input type="checkbox" class="mat" onChange={handleCheck} />Indian
      </label>
      <label>
      <input type="checkbox" class="mat" onChange={handleCheck} />Chinese
      </label>
      
      <input type="checkbox" class="mat" onChange={handleCheck} />Japanese
      <input type="checkbox" class="mat" onChange={handleCheck} />Itailan
    </span>
    <h2 class='header sub-header'>Choose some staple food</h2>
    <span class='container'>
      <label>
      <input type="checkbox" class="mat" onChange={handleCheck} />rice
      </label>
      <label>
      <input type="checkbox" class="mat" onChange={handleCheck} />noodles
      </label>
    </span>
    <h2 class='header sub-header'>Choose some vegetables</h2>
    <span class='container'>
      <label>
      <input type="checkbox" class="mat" onChange={handleCheck} />egg
      </label>
      <label>
      <input type="checkbox" class="mat" onChange={handleCheck} />tomato
      </label>
      
      <input type="checkbox" class="mat" onChange={handleCheck} />lettuce
      <input type="checkbox" class="mat" onChange={handleCheck} />spinach
    </span>
    <h2 class='header sub-header'>Choose some meat</h2>
    <span class='container'>
      <label>
      <input type="checkbox" class="mat" onChange={handleCheck} />saussage
      </label>
      <label>
      <input type="checkbox" class="mat" onChange={handleCheck} />pork
      </label>
    </span>
    <label>
      <button class='btn btn-search'>Let's get the recipe!</button>
    </label>
    </>
  )
*/