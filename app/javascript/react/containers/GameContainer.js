import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Target from '../components/TargetComponent'
import Timer from '../components/TimerComponent'

class Game extends Component{
  constructor(props){
    super(props)
    this.state = {
      location: 'left',
      times: [],
      gameLength: 5,
      count: 0,
      gameState: 'ready',
      update: true
    }
    this.onClick = this.onClick.bind(this)
    this.onTimerStop = this.onTimerStop.bind(this)
    this.newLocation = this.newLocation.bind(this)
    this.startGame = this.startGame.bind(this)
    this.endGame = this.endGame.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.update
  }

  onTimerStop(mSec){
    this.state.times.push(mSec)
  }

  newLocation(){
    // planned: from random array of locations
    let newTargetLocation
    if (this.state.location == 'left') {
      newTargetLocation = 'right'
    } else {
      newTargetLocation = 'left'
    }
    return newTargetLocation
  }

  onClick(event){
    event.preventDefault()
    if (this.state.count == this.state.gameLength){
      this.endGame()
    } else {
      this.setState({
        count: this.state.count + 1,
        location: this.newLocation(),
        update: true
      })
    }
  }

  startGame(){
    this.setState({gameState: 'running', update: true})
  }

  endGame(){
    this.setState({gameState: 'ended', update: true})
  }

  render(){
    if (this.state.gameState == 'ready'){
      let onClick = this.startGame
      return(
        <div>
          <h1 onClick={onClick}>Start!</h1>
        </div>
      )
    } else if (this.state.gameState == 'running') {
      let onButtonClick = this.onClick
      return(
        <div className='container'>
          <Timer
            count={this.state.count}
            onTimerStop={this.onTimerStop}
          />
          <Target
            location={this.state.location}
            onClick={onButtonClick}
          />
        </div>
      )
    } else {
      return(
        <div>
          <h1>Complete!</h1>
          <h4>Raw times:</h4>
          <p>{this.state.times.join()}</p>
        </div>
      )
    }
  }
}

export default Game