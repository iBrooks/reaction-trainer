import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Target from '../../components/TargetComponent'
import Background from '../../components/BackgroundComponent'
import StatAggregator from '../../components/StatAggregatorComponent'
import BaselineGameHud from '../../components/BaselineGameHudComponent'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlayCircle, faTimesCircle, faRedoAlt } from '@fortawesome/fontawesome-free-solid'

class BaselineGame extends Component{
  constructor(props){
    super(props)
    this.state = {
      location: this.newLocation(),
      targetTotal: 30,
      gameState: 'ready',
      targetCount: 1,
      clickMisses: 0,
      pause: false,
      pauseScreen: 'hide',
      gameDifficulty: 0,
      userName: 'test',
      time: '00:00',
      gameDuration: 0,
      fastestHit: 0,
      averageHit: 0
    }
    this.onHit = this.onHit.bind(this)
    this.onMiss = this.onMiss.bind(this)
    this.newLocation = this.newLocation.bind(this)
    this.startGame = this.startGame.bind(this)
    this.endGame = this.endGame.bind(this)
    this.pauseGame = this.pauseGame.bind(this)
    this.resumeGame = this.resumeGame.bind(this)
    this.restartGame = this.restartGame.bind(this)
    this.saveTargetTime = this.saveTargetTime.bind(this)
    this.newBest = this.newBest.bind(this)

    this.targetTimes = []

    this.targetStartTime = 0
    this.targetStopTime = 0
    this.gameStartTime = 0
    this.pauseStartTime = 0
    this.pauseDuration = 0
  }

  saveTargetTime(){
    let targetTime = this.targetStopTime - this.targetStartTime
    this.targetTimes.push(targetTime)
  }

  newLocation(){
    let newX = Math.floor(Math.random() * 10)
    let newY = Math.floor(Math.random() * 10)
    let newTargetLocation = 'P' + newX.toString() + newY.toString()
    return newTargetLocation
  }

  onHit(event){
    this.targetStopTime = Date.now()
    event.preventDefault()
    if (this.state.targetCount == this.state.targetTotal){
      this.saveTargetTime()
      this.endGame()
    } else {
      this.saveTargetTime()
      this.setState({
        targetCount: this.state.targetCount + 1,
        location: this.newLocation()
      })
      this.targetStartTime = Date.now()
    }
  }
  onMiss(event){
    event.preventDefault()
    this.setState({
      clickMisses: this.state.clickMisses + 1
    })
  }

  startGame(){
    this.setState({gameState: 'running'})
    this.targetStartTime = Date.now()
    this.gameStartTime = Date.now()
  }
  pauseGame(){
    this.pauseStartTime = Date.now()
    this.setState({
      pause: true,
      pauseScreen: 'show'
    })
  }
  resumeGame(){
    this.setState({
      pause: false,
      pauseScreen: 'hide',
      location: this.newLocation()
    })
    this.pauseDuration += Date.now() - this.pauseStartTime
    this.targetStartTime = Date.now()
  }
  restartGame(){
    this.setState({
      gameState: 'ready',
      targetCount: 1,
      pauseScreen: 'hide',
      clickMisses: 0,
      pause: false,
      location: this.newLocation()
    })
    this.pauseDuration = 0
    this.targetTimes = []
  }
  endGame(){
    let gameStopTime = Date.now()
    let gameDuration = gameStopTime - this.gameStartTime - this.pauseDuration
    let fastestHit = Math.min(...this.targetTimes)
    let averageHit = Math.round((this.targetTimes.reduce((a, b) => { return a + b }))/this.targetTimes.length)
    this.setState({
      gameDuration: gameDuration,
      gameState: 'ended',
      fastestHit: fastestHit,
      averageHit: averageHit,
      newBest: this.newBest(gameDuration)
    })
  }
  newBest(gameDuration){
    if (document.getElementById('userInfo')) {
    let oldBest = document.getElementById('baselineBest').innerHTML
      if (gameDuration < parseInt(oldBest) || parseInt(oldBest) == 0 ){
        return 'show'
      } else {
        return 'hide'
      }
    } else {
      return 'hide'
    }
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
    let overlayClass
    if (this.state.pause || this.state.gameState == 'ready' || this.state.gameState == 'ended'){
      overlayClass = 'show'
    } else {
      overlayClass = 'hide'
    }
    return(
      <div>
        <StatAggregator
          clickMisses={this.state.clickMisses}
          targetHits={this.state.targetCount}
          targetTotal={this.state.targetTotal}
          targetTimes={this.targetTimes}
          gameState={this.state.gameState}
          gameType={'Baseline'}
          gameDifficulty={this.state.gameDifficulty}
          gameTime={this.state.gameDuration}
        />
        <BaselineGameHud
          totalTargets={this.state.targetTotal}
          targetCount={this.state.targetCount}
          targetMisses={this.state.clickMisses}
          pause={this.state.pause}
          pauseGame={this.pauseGame}
          gameState={this.state.gameState}
        />
        <div id='coreDisplayPanel' className='container'>
          <div id='gameOverlay' className={overlayClass}>
            <div className={startScreenClass}>
              <div id='upperOverlay'>Baseline</div>
                <FontAwesomeIcon id='exitButton' icon={faTimesCircle} size='4x' onClick={this.props.exitGame}/>
                <FontAwesomeIcon id='playButton'  icon={faPlayCircle} size='8x' onClick={this.startGame}/>
            </div>
            <div className={this.state.pauseScreen}>
              <div id='upperOverlay'>Paused</div>
                <FontAwesomeIcon id='restartButton' icon={faRedoAlt} size='4x' onClick={this.restartGame}/>
                <FontAwesomeIcon id='playButton'  icon={faPlayCircle} size='8x' onClick={this.resumeGame}/>
                <FontAwesomeIcon id='exitButton' icon={faTimesCircle} size='4x' onClick={this.props.exitGame}/>
            </div>
            <div className={endScreenClass}>
              <div id='upperOverlay'>
                <div id='personalBest' className={this.state.newBest}>New Best!</div>
                <div id='endGameTime'>{this.state.gameDuration/1000}s</div>
                <div id='endGameFastestHit'>{this.state.fastestHit}ms</div>
                <div id='endGameAverageHit'>{this.state.averageHit}ms</div>
                <div id='endGameTimeLabel'>Game Time</div>
                <div id='endGameFastestHitLabel'>Fastest Hit</div>
                <div id='endGameAverageHitLabel'>Average Hit</div>
              </div>
                <FontAwesomeIcon id='exitButton' icon={faTimesCircle} size='4x' onClick={this.props.exitGame}/>
                <FontAwesomeIcon id='playButton'  icon={faRedoAlt} size='8x' onClick={this.restartGame}/>
            </div>
          </div>
          <Target
            pause={this.state.pause}
            gameState={this.state.gameState}
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