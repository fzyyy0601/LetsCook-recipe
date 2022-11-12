import React,{Component} from 'react';
import './app.css';

// class APP extends Component{
//   constructor(props){
//     super(props)
//     this.state = {apiResponse:""};
//   }
//   callAPI(){
//     fetch("http://localhost:3100/testAPI").then(res =>res.text())
//     .then(res=>this.setState({apiResponse:res}))
//     .catch(err=>err)
//   }
//   componentDidMount(){
//     this.callAPI();
//   }
//   handleCheck(){
//     return  null;
//   }
//   render(){
//     return(
//       <div className='App'>
//         <header className='App-header'>
//         <h1>Welcome to Smart Recipe!</h1>
//     <button className='btn ramdon-recipe'>Don't know how to choose? Randomly get a recipe!</button>
//     <hr></hr>
//     <label>
//     <input type="checkbox" className="mat"/>tomato
//     </label>
//     <label>
//     <input type="checkbox" className="mat"/>egg
//     </label>
//     <label>
//     <input type="checkbox" className="mat"/>lettuce
//     </label>
//     <label>
//     <input type="checkbox" className="mat"/>saussage
//     </label> 
//         </header>
//         <p class='app-intro'>{this.state.apiResponse}</p>
//       </div>
//     )
//   }
// }

function App() {
  function handleCheck({mat, toggleMat}){
    toggleMat(mat.id)
  }

  function randomRecipe(){
    return 'recipe';
  }

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
}

export default App;
