import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

class Game extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return(
    <h1>Hello from Game</h1>
  )
  }
}

export default Game