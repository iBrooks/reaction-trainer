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
      targetTotal: 2,
      gameState: 'ready',
      targetCount: 1,
      clickMisses: 0,
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

  newLocation(){
    let newX = Math.floor(Math.random() * 10)
    let newY = Math.floor(Math.random() * 10)
    let newTargetLocation = 'P' + newX.toString() + newY.toString()
    return newTargetLocation
  }

  onHit(event){
    event.preventDefault()
    if (this.state.targetCount == this.state.targetTotal){
      this.endGame()
    } else {
      this.saveTargetTime()
      this.setState({
        targetCount: this.state.targetCount + 1,
        location: this.newLocation()
      })
      this.startTargetTimer()
    }
  }
  onMiss(event){
    event.preventDefault()
    this.clickMisses = this.clickMisses + 1
  }

  startGame(){
    this.setState({gameState: 'running'})
    this.startGameTimer()
    this.startTargetTimer()
  }
  pauseGame(){
    this.stopGameTimer()
    this.stopTargetTimer()
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
  }
  restartGame(){
    this.setState({
      gameState: 'ready',
      targetCount: 1,
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
    return(
      <div id='gameContainer'>
        <StatAggregator
          clickMisses={this.clickMisses}
          targetHits={this.state.targetCount}
          targetMisses={0}
          targetTotal={this.state.targetTotal}
          targetTimes={this.targetTimes}
          gameState={this.state.gameState}
          gameType={'Baseline'}
          gameDifficulty={this.state.gameDifficulty}
          gameTime={this.gameTime}
          userName={this.state.userName}
        />
        <GameHud
          totalTargets={this.state.targetTotal}
          targetCount={this.state.targetCount}
          targetMisses={'N/A'}
          pause={this.state.pause}
          pauseGame={this.pauseGame}
          gameState={this.state.gameState}
          gameType={'Baseline'}
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
            <div id='exitButton'>
              <FontAwesomeIcon icon={faTimesCircle} size='4x' onClick={this.props.exitGame}/>
            </div>
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
  <FontAwesomeIcon icon={faCrosshairs} size="2x" /> {Math.round(((this.state.hitCount/this.state.targetCount) * 100)*10)/10}
</div> */}