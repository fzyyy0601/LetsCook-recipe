import React from 'react';
import ReactDOM from 'react-dom/client';
import './app.css';
import {BrowserRouter as Router, Routes, Route} from'react-router-dom' 
import { Navbar } from './Components/Navbar';
import {About} from './Components/About'
import GetRecipe from './Components/getRecipe';

function App() {
  
  return(
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<GetRecipe />}/>
          <Route path="/about" element ={<About />}/>
        </Routes>
      </Router>
      
    
    </div>
  )
  
}
export default App;