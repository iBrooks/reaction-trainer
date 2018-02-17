import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Target from '../../components/TargetComponent'
import Background from '../../components/BackgroundComponent'
import StatAggregator from '../../components/StatAggregatorComponent'
import GameHud from '../../components/GameHudComponent'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlayCircle, faTimesCircle, faRedoAlt } from '@fortawesome/fontawesome-free-solid'

class EnduranceGame extends Component{
  constructor(props){
    super(props)
    this.state = {
      location: this.newLocation(),
      gameState: 'ready',
      targetCount: 1,
      targetMisses: 0,
      targetHits: 0,
      clickMisses: 0,
      pause: false,
      pauseScreen: 'hide',
      gameDifficulty: 0,
      userName: 'test',
      time: '00:00',
      targetExpiration: 1000
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
    this.setExpire = this.setExpire.bind(this)
    this.clearExpire = this.clearExpire.bind(this)
    this.expireTarget = this.expireTarget.bind(this)
    this.convertMS = this.convertMS.bind(this)

    this.expire = null

    this.targetTimes = []

    this.targetStartTime = 0
    this.targetStopTime = 0
    this.gameStartTime = 0
    this.pauseStartTime = 0
    this.pauseDuration = 0
  }
  componentWillUnmount(){
    this.clearExpire()
  }
  saveTargetTime(){
    let targetTime = this.targetStopTime - this.targetStartTime
    this.targetTimes.push(targetTime)
  }
  setExpire(){
    this.clearExpire()
    this.expireTimer = setTimeout(()=>{ this.expireTarget()}, this.state.targetExpiration)
  }
  clearExpire(){
    clearTimeout(this.expireTimer)
  }
  expireTarget(){
    this.setState({
      targetCount: this.state.targetCount + 1,
      targetMisses: this.state.targetMisses+ 1,
      location: this.newLocation()
    })
    this.targetStartTime = Date.now()
    this.setExpire()
    if (this.state.targetMisses == 10) {
      this.gameStopTime = Date.now()
      this.clearExpire()
      this.endGame()
    }
  }

  newLocation(){
    let newX = Math.floor(Math.random() * 10)
    let newY = Math.floor(Math.random() * 10)
    let newTargetLocation = 'P' + newX.toString() + newY.toString()
    return newTargetLocation
  }

  onHit(event){
    event.preventDefault()
    this.targetStopTime = Date.now()
    this.saveTargetTime()
    this.setState({
      targetCount: this.state.targetCount + 1,
      targetHits: this.state.targetHits + 1,
      location: this.newLocation(),
      targetExpiration: this.state.targetExpiration - 2
    })
    this.targetStartTime = Date.now()
    this.setExpire()
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
    this.setExpire()
  }
  pauseGame(){
    this.pauseStartTime = Date.now()
    this.clearExpire()
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
    this.setExpire()
  }
  restartGame(){
    this.setState({
      gameState: 'ready',
      targetCount: 1,
      targetMisses: 0,
      targetHits: 0,
      clickMisses: 0,
      pauseScreen: 'hide',
      targetExpiration: 1000,
      pause: false,
      location: this.newLocation()
    })
    this.pauseDuration = 0
    this.targetTimes = []
  }
  endGame(){
    let gameStopTime = Date.now()
    let gameDuration = gameStopTime - this.gameStartTime - this.pauseDuration

    this.setState({gameState: 'ended'})
  }
  convertMS() {
    let milliseconds
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return (
      minute.toString() + ':' + seconds.toString()
    );
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
          targetHits={this.state.targetHits}
          targetTotal={this.state.targetCount}
          targetTimes={this.targetTimes}
          gameState={this.state.gameState}
          gameType={'Endurance'}
          gameDifficulty={this.state.gameDifficulty}
          gameTime={this.gameTime}
          userName={this.state.userName}
        />
        <GameHud
          totalTargets={'∞'}
          targetCount={this.state.targetCount}
          targetMisses={this.state.targetMisses}
          targetHits={this.state.targetHits}
          pause={this.state.pause}
          pauseGame={this.pauseGame}
          gameState={this.state.gameState}
          clickMisses={this.state.clickMisses}
          targetExpiration={this.state.targetExpiration}
        />
        <div id='coreDisplayPanel' className='container'>
          <div id='coreDisplayOverlay' className={overlayClass}>
            <div className={startScreenClass}>
                <FontAwesomeIcon id='exitButton' icon={faTimesCircle} size='4x' onClick={this.props.exitGame}/>
                <FontAwesomeIcon id='playButton'  icon={faPlayCircle} size='8x' onClick={this.startGame}/>
            </div>
            <div className={this.state.pauseScreen}>
                <FontAwesomeIcon id='restartButton' icon={faRedoAlt} size='4x' onClick={this.restartGame}/>
                <FontAwesomeIcon id='playButton'  icon={faPlayCircle} size='8x' onClick={this.resumeGame}/>
                <FontAwesomeIcon id='exitButton' icon={faTimesCircle} size='4x' onClick={this.props.exitGame}/>
            </div>
            <div className={endScreenClass}>
                <div id='endGameTime'>{this.state.time}</div>
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

export default EnduranceGame