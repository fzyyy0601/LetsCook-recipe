import React, { Component } from 'react';
export class ButtonControl extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state = {isClick: false}
    }
    handleClick(){
        this.setState({isClick: !this.state.isClick})
    }
    UserGreeting(){
        if(this.state.isClick) return <h1>Click!</h1>
        else return <h1>Unclick!</h1>
    }
    render(){
        let button;
        button = <button onClick={this.handleClick}>IM a button</button>
        return(
            <div>
                <p>{this.UserGreeting}</p>
                {button}
            </div>
        )
    }
    
}