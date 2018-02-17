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
      targetAccuracy: .102
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
            {this.state.targetAccuracy}
          </div>
          <div id='dataLabels'>
            <div className='dataLabel'>
              Games
            </div>
            <div className='dataLabel'>
              Targets hit
            </div>
            <div className='dataLabel'>
              Avg. Hit
            </div>
            <div className='dataLabel'>
              Clicks
            </div>
            <div className='dataLabel'>
              Accuracy
            </div>
          </div>
        </div>
        <div id='lowerLeftOverlay'>
          <div id='baselineStatTitle'>
            Baseline
          </div>
          <div id='baselineStatHolderBox'>
            <div className='baselineStatHolder'>26.467</div>
            <div className='baselineStatHolder'>.082</div>
            <div className='baselineStatHolder'>.113</div>
            <div className='baselineStatHolder'>81.7%</div>
          </div>
          <div id='baselineStatBox'>
            <div className='baselineStat'>
              Fastest run
            </div>
            <div className='baselineStat'>
              Fastest target hit
            </div>
            <div className='baselineStat'>
              Average target hit
            </div>
            <div className='baselineStat'>
              Click accuracy
            </div>
          </div>
        </div>
        <div id='lowerRightOverlay'>
          <div id='baselineStatTitle'>
            Challenge
          </div>
          <div id='baselineStatHolderBox'>
            <div className='baselineStatHolder'>2:33</div>
            <div className='baselineStatHolder'>146</div>
            <div className='baselineStatHolder'>.097</div>
            <div className='baselineStatHolder'>87.3%</div>
          </div>
          <div id='baselineStatBox'>
            <div className='baselineStat'>
              Longest run
            </div>
            <div className='baselineStat'>
              Most target hits
            </div>
            <div className='baselineStat'>
              Average target hit
            </div>
            <div className='baselineStat'>
              Click accuracy
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default SelfStats