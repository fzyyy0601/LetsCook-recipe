import React, { Component } from 'react';
class Vege extends Component{
    constructor(){
        super();
        this.state={
            tomato:false,
            lettuce:false,
            potato:false
        }
    }
    getPotato=()=>{
        if(this.state.potato===false) this.setState({potato:true})
        else this.setState({potato:false})
        console.log('potato')
    }
    getLettuce=()=>{
        if(this.state.lettuce === false) this.setState({lettuce:true});
        else this.setState({lettuce:false})
        console.log('lettuce')
    }
    getTomato=()=>{
        if(this.state.tomato === false) this.setState({lettuce:true});
        else this.setState({tomato:false})
        console.log('tomato')
    }
    render(){
        return(
            <div>
                <h2>vegetables!</h2>
                <button  onClick={this.getTomato}>tomato</button>
                <hr></hr>
                <button onClick={this.getLettuce}>lettuce</button>
                
                <hr></hr>
                <button onClick={this.getPotato}>Potato</button>
                <ul>{(String)(this.state.potato)}</ul>
                <ul>{(String)(this.state.lettuce)}</ul>
                <ul>{(String)(this.state.tomato)}</ul>
            </div>
        )
    }
    
}
export default Vege;