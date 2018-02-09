import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Target from '../../components/TargetComponent'
import Timer from '../../components/TimerComponent'
import Background from '../../components/BackgroundComponent'
import GameHud from '../../components/GameHudComponent'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlayCircle, faTimesCircle, faRedoAlt } from '@fortawesome/fontawesome-free-solid'

class BaselineGame extends Component{
  constructor(props){
    super(props)
    this.state = {
      location: this.newLocation(),
      update: true,
      gameLength: 30,
      gameState: 'ready',
      times: [],
      count: 1,
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
    this.resumeGame = this.resumeGame.bind(this)
    this.restartGame = this.restartGame.bind(this)
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
  pauseGame(){
    this.setState({
      pause: true,
      pauseScreen: 'show',
      update: true
    })
  }
  resumeGame(){
    this.setState({
      pause: false,
      pauseScreen: 'hide',
      update: true
    })
  }
  restartGame(){
    this.setState({
      gameState: 'ready',
      update: true,
      count: 1,
      pauseScreen: 'hide',
      pause: false,
      location: this.newLocation()
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
    let startScreenClass, endScreenClass
    if (this.state.gameState == 'ready'){
      startScreenClass='show'
      endScreenClass='hide'
    } else if (this.state.gameState == 'running') {
      startScreenClass='hide'
      endScreenClass='hide'
    } else {
      startScreenClass='hide'
      endScreenClass='show'
    }
    return(
      <div id='gameContainer'>
        <Timer
          count={this.state.count}
          onTimerStop={this.onTimerStop}
          pause={this.state.pause}
          gameState={this.state.gameState}
        />
        <GameHud
          totalTargets={this.state.gameLength}
          count={this.state.count}
          hit={this.state.count}
          missed={'N/A'}
          pause={this.state.pause}
          pauseGame={this.pauseGame}
          gameState={this.state.gameState}
        />
        <div id='gridContainer' className='container'>
          <div id='pauseScreen' className={this.state.pauseScreen}>
            <div className='row'>
              <div className='small-2 columns right'>
                <FontAwesomeIcon icon={faRedoAlt} size='4x' onClick={this.restartGame}/>
              </div>
              <div id='playButton'>
                <FontAwesomeIcon icon={faPlayCircle} size='8x' onClick={this.resumeGame}/>
              </div>
              <div id='exitButton'>
                <FontAwesomeIcon icon={faTimesCircle} size='4x' onClick={this.props.exitGame}/>
              </div>
            </div>
          </div>
          <div id='startScreenBody' className={startScreenClass}>
            <div id='playButton'>
            <FontAwesomeIcon icon={faPlayCircle} size='8x' onClick={this.startGame}/>
          </div>
          </div>
          <div id='endScreenBody' className={endScreenClass}>
            <div id='exitButton'>
              <FontAwesomeIcon icon={faTimesCircle} size='4x' onClick={this.props.exitGame}/>
            </div>
            <div id='playButton'>
            <FontAwesomeIcon icon={faRedoAlt} size='8x' onClick={this.restartGame}/>
          </div>
          </div>
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
  }
}

export default BaselineGame


{/* <div className='small-1 columns'>
  <FontAwesomeIcon icon={faCrosshairs} size="2x" /> {Math.round(((this.state.hitCount/this.state.count) * 100)*10)/10}
</div> */}