import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBullseye, faExpandArrowsAlt, faExpand, faTimesCircle, faCrosshairs, faAdjust, faClock, faPauseCircle } from '@fortawesome/fontawesome-free-solid'
class GameHud extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: this.props.count,
      hit: this.props.hit,
      missed: this.props.missed,
      seconds: 0,
      minutes: 0,
      hours: 0,
      time: '00:00',
      pauseButtonClass: 'hide'
    }
    this.clock = this.clock.bind(this)
    this.targetPercentage = this.targetPercentage.bind(this)
    this.pause = this.pause.bind(this)
    this.t = null
  }
  componentWillUnmount(){
    clearInterval(this.t)
  }
  componentWillReceiveProps(nextProps){
    if(this.props.pause == true && nextProps.pause == false && nextProps.gameState == 'running'){
      this.t = setInterval(()=>{this.clock()}, 1000)
      this.setState({ pauseButtonClass: 'show'})
    } else if (this.props.gameState == 'ready' && nextProps.gameState == 'running'){
      this.t = setInterval(()=>{this.clock()}, 1000)
      this.setState({pauseButtonClass: 'show'})
    } else if (this.props.gameState == 'running' && nextProps.gameState == 'ended'){
      clearInterval(this.t)
      this.setState({pauseButtonClass: 'hide'})
    } else if ((this.props.gameState == 'ended' || this.props.gameState == 'running') && nextProps.gameState == 'ready'){
      this.setState({
        seconds: 0,
        minutes: 0,
        hours: 0,
        time: '00:00',
      })
    }
  }
  clock(){
    let secondsString, minutesString, time
    let newSec = this.state.seconds + 1
    let newMin = this.state.minutes
    let newHour = this.state.hours
    if (newSec < 10) {
      secondsString = '0' + newSec.toString()
    } else if (newSec < 60 && newSec > 9) {
      secondsString = newSec
    } else {
      newMin = this.state.minutes + 1
      newSec = 0
      secondsString = '00'
    }
    if (newMin < 10) {
      minutesString = '0' + newMin.toString()
    } else if (newMin < 60 && newMin > 9) {
      minutesString = newMin.toString()
    } else {
      newHour = this.state.hours + 1
      newMin = 0
      minutesString = '00'
    }
    if (newHour == 0) {
      time = minutesString + ':' + secondsString
    } else {
      time = newHour.toString() + ':' + minutesString + ':' + secondsString
    }
    this.setState({
      seconds: newSec,
      minutes: newMin,
      hours: newHour,
      time: time
    })
  }
  targetPercentage(){
    let percentage
    if ((this.props.targetCount == 1 && this.props.clickMisses == 0)){
      percentage = '---'
    } else if(this.props.targetHits == 0){
      percentage = '0'
    } else {
      percentage = Math.round((((this.props.targetHits)/(this.props.targetCount - 1 + this.props.clickMisses + this.props.targetMisses)) * 100)*10)/10
    }
    return(percentage)
  }
  pause(){
    clearInterval(this.t)
    this.props.pauseGame()
    this.setState({pauseButtonClass: 'hide'})
  }
  render() {
    return(
        <div id='lowerNavPanel'>
          <div id='targetCount'>
            <div className='gameHudLabel'>
              Target count
            </div>
            {this.props.targetCount}/{this.props.totalTargets}
          </div>
          <div id='targetMisses'>
            <div className='gameHudLabel'>
              Target misses
            </div>
            {this.props.targetMisses}
          </div>

          <div id='targetPercentage'>
            <div className='gameHudLabel'>
              Accuracy
            </div>
            {this.targetPercentage()}%
          </div>
          <div id='gameClock'>
            <div className='gameHudLabel'>
              Game time
            </div>
            {this.state.time}
          </div>
          <div id='pauseButton' className={this.state.pauseButtonClass}>
            <FontAwesomeIcon icon={faPauseCircle} size="3x" onClick={this.pause} />
          </div>
        </div>
    )
  }
}

export default GameHud
