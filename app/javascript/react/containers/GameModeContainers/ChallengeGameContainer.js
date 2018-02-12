import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Target from '../../components/TargetComponent'
import Background from '../../components/BackgroundComponent'

class ChallengeGame extends Component{
  constructor(props){
    super(props)
    this.state = {
      location: this.newLocation(),
      update: true,
      gameState: 'ready',
      times: [],
      count: 0,
      missCount: 0
    }
    this.onHit = this.onHit.bind(this)
    this.onMiss = this.onMiss.bind(this)
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
    let newX = Math.floor(Math.random() * 10)
    let newY = Math.floor(Math.random() * 10)
    let newTargetLocation = 'P' + newX.toString() + newY.toString()
    return newTargetLocation
  }

  onHit(event){
    event.preventDefault()
    if (this.state.count == this.state.gameLength){
      this.endGame()
    } else {
      this.setState({
        count: this.state.count + 1,
        location: this.newLocation(),
        update: true
      })
      console.log(this.state.location)
    }
  }
  onMiss(event){
    event.preventDefault()
    console.log('Miss!')
    this.setState({
      missCount: this.state.missCount + 1,
      update: false
    })
  }

  startGame(){
    this.setState({gameState: 'running', update: true})
  }

  endGame(){
    this.setState({gameState: 'ended', update: true})
    this.saveGame()
  }
  render(){
    if (this.state.gameState == 'ready'){
      return(
        <div>
          <h1 onClick={this.startGame}>Start!</h1>
        </div>
      )
    } else if (this.state.gameState == 'running') {
      return(
        <div id='gameContainer' className='container'>
          <Target
            location={this.state.location}
            onHit={this.onHit}
          />
          <Background
            onMiss={this.onMiss}
          />
          <Timer
            count={this.state.count}
            onTimerStop={this.onTimerStop}
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

export default ChallengeGame