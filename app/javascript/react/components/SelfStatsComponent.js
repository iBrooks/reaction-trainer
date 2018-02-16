import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBullseye, faExpandArrowsAlt, faExpand, faTimesCircle, faCrosshairs, faAdjust, faClock, faPauseCircle } from '@fortawesome/fontawesome-free-solid'

class SelfStats extends Component {
  constructor(props){
    super(props)
    this.state = {
      totalGames: 47,
      totalClicks: 578,
      totalTargetHits: 407,
      clickAccuracy: 70.4,
      targetAccuracy: 87.3
    }
  }

  render(){
    return(
      <div>
        <div id='upperSection'>
          <div id='totalGamesSelf'>
            {this.state.totalGames}
          </div>
          <div id='totalClicksSelf'>
            {this.state.totalClicks}
           </div>
          <div id='totalTargetHitsSelf'>
            {this.state.totalTargetHits}
          </div>
          <div id='totalClickAccuracySelf'>
            {this.state.clickAccuracy}%
          </div>
          <div id='totalTargetAccuracySelf'>
            {this.state.targetAccuracy}%
          </div>
          <div id='dataLabels'>
            <div className='dataLabel'>
              Games
            </div>
            <div className='dataLabel'>
              Targets Hit
            </div>
            <div className='dataLabel'>
              Target %
            </div>
            <div className='dataLabel'>
              Clicks
            </div>
            <div className='dataLabel'>
              Accuracy
            </div>
          </div>
        </div>
          <div id='longestTargetStreak'></div>
          <div id='longestDayStreak'></div>
          <div id='longestTargetStreak'></div>
        {/* <div id='upperRightOverlay'>
          {this.state.upperRightContent}
        </div> */}
        <div id='lowerLeftOverlay'>
          <div id='baselineStatTitle'>
            Baseline Stats
          </div>
          <div>
          </div>
          <div className='baselineStat'>
            <div className='baselineStatHolder'></div>
          </div>
          <div className='baselineStat'>
            <div className='baselineStatHolder'></div>
          </div>
          <div className='baselineStat'>
            <div className='baselineStatHolder'></div>
          </div>
          <div className='baselineStat'>
            <div className='baselineStatHolder'></div>
          </div>
        </div>
        <div id='lowerRightOverlay'>
          {this.state.lowerRightContent}
        </div>
      </div>
    )
  }
}

export default SelfStats