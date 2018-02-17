import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBullseye, faExpandArrowsAlt, faExpand, faTimesCircle, faCrosshairs, faAdjust, faClock, faPauseCircle } from '@fortawesome/fontawesome-free-solid'
class GameHud extends Component {
  constructor(props){
    super(props)
    this.state = {
      pauseButtonClass: 'hide'
    }
    this.accuracy = this.accuracy.bind(this)
    this.pause = this.pause.bind(this)
  }
  componentWillReceiveProps(nextProps){
    if(this.props.pause == true && nextProps.pause == false && nextProps.gameState == 'running'){
      this.setState({ pauseButtonClass: 'show' })
    } else if (this.props.gameState == 'ready' && nextProps.gameState == 'running'){
      this.setState({ pauseButtonClass: 'show' })
    } else if (this.props.gameState == 'running' && nextProps.gameState == 'ended'){
      this.setState({ pauseButtonClass: 'hide' })
    }
  }
  accuracy(){
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
    this.setState({ pauseButtonClass: 'hide' })
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
            {this.accuracy()}%
          </div>
          <div id='gameClock'>
            <div className='gameHudLabel'>
              Target duration
            </div>
            {this.props.targetExpiration}ms
          </div>
          <div id='pauseButton' className={this.state.pauseButtonClass}>
            <FontAwesomeIcon icon={faPauseCircle} size="3x" onClick={this.pause} />
          </div>
        </div>
    )
  }
}

export default GameHud
