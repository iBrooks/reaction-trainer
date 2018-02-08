import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Target from '../../components/TargetComponent'
import Timer from '../../components/TimerComponent'
import Background from '../../components/BackgroundComponent'
import GameHud from '../../components/GameHudComponent'

class BaselineGame extends Component{
  constructor(props){
    super(props)
    this.state = {
      location: this.newLocation(),
      update: true,
      gameLength: 5,
      gameState: 'ready',
      times: [],
      count: 0,
      missCount: 0,
      pause: false,
      pauseScreen: 'hide'
    }
    this.onHit = this.onHit.bind(this)
    this.onMiss = this.onMiss.bind(this)
    this.onTimerStop = this.onTimerStop.bind(this)
    this.newLocation = this.newLocation.bind(this)
    this.startGame = this.startGame.bind(this)
    this.endGame = this.endGame.bind(this)
    this.pauseGame = this.pauseGame.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.update
  }

  onTimerStop(mSec){
    debugger
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
  pauseGame(){
    this.setState({
      pause: true,
      pauseScreen: 'show',
      update: true
    })
  }
  endGame(){
    this.setState({gameState: 'ended', update: true})
    this.saveGame()
  }
  saveGame() {
    let formPayload = {
      game: {
      target_hits: this.state.times
      }
    }
    fetch('/api/v1/games', {
     credentials: 'same-origin',
     method: 'post',
     body: JSON.stringify(formPayload),
     headers: {
       'Content-Type': 'application/json',
       // 'X-Requested-With': 'XMLHttpRequest',
       // 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content')
       }
    })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
    })
    .catch(error => {
      console.log(error)
    })
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
        <div id='gameContainer'>
          <Timer
            count={this.state.count}
            onTimerStop={this.onTimerStop}
            pause = {this.state.pause}
          />
          <GameHud
            totalTargets={this.state.gameLength}
            count={this.state.count}
            hit={this.state.count}
            missed={'N/A'}
            pauseGame={this.pauseGame}
          />
          <div id='gridContainer' className='container'>
            <div id='pauseScreen' className={this.state.pauseScreen}></div>
            <Target
              location={this.state.location}
              onHit={this.onHit}
            />
            <Background
              onMiss={this.onMiss}
            />
          </div>
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

export default BaselineGame


{/* <div className='small-1 columns'>
  <FontAwesomeIcon icon={faCrosshairs} size="2x" /> {Math.round(((this.state.hitCount/this.state.count) * 100)*10)/10}
</div> */}