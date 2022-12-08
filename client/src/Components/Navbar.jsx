import React from 'react'
import {Link} from 'react-router-dom'
import {HouseLine,GithubLogo} from 'phosphor-react'
import "./navbar.css"

export const Navbar =()=>{
    return(
        <div className = "navbar">
            <div className ="links">
                <Link to="/"><HouseLine size={32} /></Link>
                <Link to="/about">ABOUT</Link>
                <a href="https://github.com/fzyyy0601/smart-recipe"><GithubLogo size={32} /></a>
            </div>
        </div>
    )
}