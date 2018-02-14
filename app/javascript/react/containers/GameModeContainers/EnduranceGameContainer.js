import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Target from '../../components/TargetComponent'
import Background from '../../components/BackgroundComponent'
import StatAggregator from '../../components/StatAggregatorComponent'
import GameHud from '../../components/GameHudComponent'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlayCircle, faTimesCircle, faRedoAlt } from '@fortawesome/fontawesome-free-solid'

class BaselineGame extends Component{
  constructor(props){
    super(props)
    this.state = {
      location: this.newLocation(),
      gameState: 'ready',
      targetCount: 1,
      targetMisses: 0,
      pause: false,
      pauseScreen: 'hide',
      gameDifficulty: 0,
      userName: 'test'
    }
    this.onHit = this.onHit.bind(this)
    this.onMiss = this.onMiss.bind(this)
    this.newLocation = this.newLocation.bind(this)
    this.startGame = this.startGame.bind(this)
    this.endGame = this.endGame.bind(this)
    this.pauseGame = this.pauseGame.bind(this)
    this.resumeGame = this.resumeGame.bind(this)
    this.restartGame = this.restartGame.bind(this)
    this.startGameTimer = this.startGameTimer.bind(this)
    this.stopGameTimer = this.stopGameTimer.bind(this)
    this.startTargetTimer = this.startTargetTimer.bind(this)
    this.stopTargetTimer = this.stopTargetTimer.bind(this)
    this.saveTargetTime = this.saveTargetTime.bind(this)
    this.setExpire = this.setExpire.bind(this)
    this.clearExpire = this.clearExpire.bind(this)
    this.expireTarget = this.expireTarget.bind(this)

    this.expire = null

    this.clickMisses = 0

    this.gameTimer = null
    this.gameTime = 0

    this.targetTimer = null
    this.targetTime = 0
    this.targetTimes = []
  }
  componentWillUnmount(){
    clearInterval(this.gameTimer)
    clearInterval(this.targetTimer)
    this.clearExpire()
  }
  startGameTimer(){
    this.gameTimer = setInterval(()=>{
       this.gameTime = this.gameTime + 1
    }, 1)
  }
  stopGameTimer(){
    clearInterval(this.gameTimer)
  }

  startTargetTimer(){
    this.targetTimer = setInterval(()=>{
       this.targetTime = this.targetTime + 1
    }, 1)
  }
  stopTargetTimer(){
    clearInterval(this.targetTimer)
    this.targetTime = 0
  }
  saveTargetTime(){
    clearInterval(this.targetTimer)
    this.targetTimes.push(this.targetTime)
    this.targetTime = 0
  }
  setExpire(){
    this.clearExpire()
    this.expireTimer = setTimeout(()=>{ this.expireTarget()}, 1000)
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
    this.setExpire()
  }

  newLocation(){
    let newX = Math.floor(Math.random() * 10)
    let newY = Math.floor(Math.random() * 10)
    let newTargetLocation = 'P' + newX.toString() + newY.toString()
    return newTargetLocation
  }

  onHit(event){
    event.preventDefault()
    this.saveTargetTime()
    this.setState({
      targetCount: this.state.targetCount + 1,
      location: this.newLocation()
    })
    this.startTargetTimer()
    this.setExpire()
  }
  onMiss(event){
    event.preventDefault()
    this.clickMisses = this.clickMisses + 1
  }

  startGame(){
    this.setState({gameState: 'running'})
    this.startGameTimer()
    this.startTargetTimer()
    this.setExpire()
  }
  pauseGame(){
    this.stopGameTimer()
    this.stopTargetTimer()
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
    this.startGameTimer()
    this.startTargetTimer()
    this.setExpire()
  }
  restartGame(){
    this.setState({
      gameState: 'ready',
      targetCount: 1,
      targetMisses: 0,
      pauseScreen: 'hide',
      pause: false,
      location: this.newLocation()
    })
    this.clickMisses = 0
    this.gameTime = 0
    this.targetTime = 0
    this.targetTimes = []
  }
  endGame(){
    this.saveTargetTime()
    this.setState({gameState: 'ended'})
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
          clickMisses={this.clickMisses}
          targetHits={(this.state.targetCount - this.state.targetMisses)}
          targetMisses={this.state.targetMisses}
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
          pause={this.state.pause}
          pauseGame={this.pauseGame}
          gameState={this.state.gameState}
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


{/* <div className='small-1 columns'>
  <FontAwesomeIcon icon={faCrosshairs} size="2x" /> {Math.round(((this.state.hitCount/this.state.count) * 100)*10)/10}
</div> */}