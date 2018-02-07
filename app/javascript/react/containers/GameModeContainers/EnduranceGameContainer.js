import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Target from '../../components/TargetComponent'
import Timer from '../../components/TimerComponent'
import Background from '../../components/BackgroundComponent'

class EnduranceGame extends Component{
  constructor(props){
    super(props)
    this.state = {
      location: this.newLocation(),
      update: false,
      gameState: 'ready',
      times: [],
      count: 0,
      missCount: 0,
      hitCount: 0
    }
    this.onHit = this.onHit.bind(this)
    this.onMiss = this.onMiss.bind(this)
    this.onTimerStop = this.onTimerStop.bind(this)
    this.newLocation = this.newLocation.bind(this)
    this.startGame = this.startGame.bind(this)
    this.endGame = this.endGame.bind(this)
    this.expireTarget = this.expireTarget.bind(this)
    this.expire = null
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.update
  }
  expireTarget(){
    console.log('target expired')
    this.setState({
      count: this.state.count + 1,
      location: this.newLocation(),
      update: true
    })
  }
  componentDidUpdate(){
    clearTimeout(this.expire)
    this.expire = setTimeout(()=>{ this.expireTarget()}, 1000)
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
    this.setState({
      count: this.state.count + 1,
      hitCount: this.state.hitCount + 1,
      location: this.newLocation(),
      update: true
    })
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

export default EnduranceGame