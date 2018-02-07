import React, { Component } from 'react';
import Background from './BackgroundComponent'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBullseye, faExpandArrowsAlt, faExpand, faTimesCircle, faCrosshairs, faAdjust, faClock, faPauseCircle } from '@fortawesome/fontawesome-free-solid'
class GameHud extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: this.props.count,
      hitCount: this.props.hitCount,
      missCount: 0,

    }
    this.onMiss = this.onMiss.bind(this);
  }
  onMiss(event){
    event.preventDefault()
    this.setState({
      missCount: this.state.missCount + 1
    })
    this.props.onMiss()
  }
  render() {
    return(
      <div>
        <div className='row' id='gameHud'>
          <div className='small-1 columns'>
            <FontAwesomeIcon icon={faExpandArrowsAlt} size="2x" />
            {this.props.hits}
          </div>
          <div className='small-1 columns'>
            <FontAwesomeIcon icon={faExpand} size="2x" />
            {this.state.missCount}
          </div>
          <div className='small-2 columns'>
            <FontAwesomeIcon icon={faBullseye} size="2x" />
            {this.props.currentCount}/ {this.props.totalTargets}
          </div>
          <div className='small-1 columns'>
            <FontAwesomeIcon icon={faTimesCircle} size="2x" />{this.props.missed}
          </div>
          <div className='small-1 columns'>
            <FontAwesomeIcon icon={faCrosshairs} size="2x" /> {Math.round(((this.state.hitCount/this.state.count) * 100)*10)/10}
          </div>
          <div className='small-2 columns'>
            <FontAwesomeIcon icon={faAdjust} size="2x" /> {Math.round(((this.state.count/(this.state.count + this.state.missCount)) * 100)*10)/10}
          </div>
          <div className='small-2 columns'>
            {this.props.gameMode}
          </div>
          <div className='small-1 columns'>
            <FontAwesomeIcon icon={faClock} size="2x" />{this.props.elapsed}
          </div>
          <div className='small-1 columns'>
            <FontAwesomeIcon icon={faPauseCircle} size="2x" />
          </div>
        </div>
        <Background
          onMiss={this.onMiss}
        />
      </div>
    )
  }
}

export default GameHud
