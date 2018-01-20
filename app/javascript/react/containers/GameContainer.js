import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Target from '../components/TargetComponent'

class Game extends Component{
  constructor(props){
    super(props)
    this.state = {
      location: 'left'
    }
    this.onClick = this.onClick.bind(this)
  }
  onClick(event){
    console.log(this.state.location)
    event.preventDefault()
    let newTargetLocation
    if (this.state.location = 'left') {
      newTargetLocation = 'right'
    } else {
      newTargetLocation = 'left'
    }
    this.setState({
      location: newTargetLocation
    })
  }
  render(){
    let onButtonClick = this.onClick
    return(
    <div className='container'>
      <Target
        location={this.state.location}
        onClick={onButtonClick}
      />
    </div>
  )
  }
}

export default Game