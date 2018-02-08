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
    }
    this.clock = this.clock.bind(this)
    this.targetPercentage = this.targetPercentage.bind(this)
    this.pause = this.pause.bind(this)
    this.t = null
  }
  componentDidMount(){
    this.t = setInterval(()=>{this.clock()}, 1000)
  }
  componentWillUnmount(){
    clearInterval(this.t)
  }
  componentWillUpdate(nextProps, nextState){
    // console.log(nextState.paused)
    // if (!nextState.paused) {
    //   this.t = setInterval(()=>{this.clock()}, 1000)
    // }
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
    if (this.props.count == 0){
      percentage = '---'
    } else {
      percentage = Math.round(((this.props.hit/(this.props.count)) * 100)*10)/10
    }
    return(percentage)
  }
  pause(){
    clearInterval(this.t)
    this.props.pauseGame()
  }
  render() {
    return(
        <div className='row' id='gameHud'>
          <div className='small-2 columns'>
            <FontAwesomeIcon icon={faBullseye} />
            {this.props.count}/ {this.props.totalTargets}
          </div>
          <div className='small-2 columns'>
            <FontAwesomeIcon icon={faTimesCircle} />{this.props.missed}
          </div>

          <div className='small-3 columns'>
            <FontAwesomeIcon icon={faAdjust} /> {this.targetPercentage()}%
          </div>
          <div className='small-3 columns'>
            <FontAwesomeIcon icon={faClock} />{this.state.time}
          </div>
          <div className='small-2 columns'>
            <FontAwesomeIcon icon={faPauseCircle} size="2x" onClick={this.pause}/>
          </div>
        </div>
    )
  }
}

export default GameHud
