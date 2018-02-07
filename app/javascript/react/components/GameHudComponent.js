import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBullseye, faExpandArrowsAlt, faExpand, faTimesCircle, faCrosshairs, faAdjust, faClock, faPauseCircle } from '@fortawesome/fontawesome-free-solid'
class GameHud extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: this.props.count,
      hit: this.props.hit,
      missed: this.props.missed
    }
  }
  render() {
    return(
        <div className='row' id='gameHud'>
          <div className='small-2 columns'>
            <FontAwesomeIcon icon={faBullseye} size="2x" />
            {this.props.count}/ {this.props.totalTargets}
          </div>
          <div className='small-2 columns'>
            <FontAwesomeIcon icon={faTimesCircle} size="2x" />{this.props.missed}
          </div>

          <div className='small-2 columns'>
            <FontAwesomeIcon icon={faAdjust} size="2x" /> {Math.round(((this.props.hit/(this.props.count)) * 100)*10)/10}%
          </div>
          <div className='small-2 columns'>
            {this.props.gameMode}
          </div>
          <div className='small-2 columns'>
            <FontAwesomeIcon icon={faClock} size="2x" />{this.props.elapsed}
          </div>
          <div className='small-2 columns'>
            <FontAwesomeIcon icon={faPauseCircle} size="2x" />
          </div>
        </div>
    )
  }
}

export default GameHud
