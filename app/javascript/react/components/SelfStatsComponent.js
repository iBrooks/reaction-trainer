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
      targetAccuracy: .102,
      content: null
    }
    this.getData = this.getData.bind(this)
    this.noUser = this.noUser.bind(this)
    this.yesUser = this.yesUser.bind(this)
  }
  componentDidMount() {
    if (document.getElementById('userInfo')) {
      this.getData()
    } else {
      this.noUser()
    }
  }
  noUser(){
    let content = (
      <div></div>
    )
    this.setState({
      content: content
    })
  }
  yesUser(){
    this.setState({
      content: (<div>
      <div id='upperSection'>
        <div id='totalGamesSelf'>
          {this.state.totalStats.games}
        </div>
        <div id='totalClicksSelf'>
          {this.state.totalStats.clicks}
         </div>
        <div id='totalTargetHitsSelf'>
          {this.state.totalStats.hits}
        </div>
        <div id='totalClickAccuracySelf'>
          {this.state.totalStats.accuracy}%
        </div>
        <div id='totalTargetAccuracySelf'>
          {this.state.totalStats.averageHit}ms
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
          <div className='baselineStatHolder'>{this.state.baselineStats.fastest/1000}s</div>
          <div className='baselineStatHolder'>{this.state.baselineStats.fastestHit}ms</div>
          <div className='baselineStatHolder'>{this.state.baselineStats.averageHit}ms</div>
          <div className='baselineStatHolder'>{this.state.baselineStats.accuracy}%</div>
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
          <div className='baselineStatHolder'>{this.state.challengeStats.mostHits}</div>
          <div className='baselineStatHolder'>{this.state.challengeStats.averageHits}</div>
          <div className='baselineStatHolder'>{this.state.challengeStats.averageHit}ms</div>
          <div className='baselineStatHolder'>{this.state.challengeStats.accuracy}%</div>
        </div>
        <div id='baselineStatBox'>
          <div className='baselineStat'>
            Most targets hit
          </div>
          <div className='baselineStat'>
            Average targets hit
          </div>
          <div className='baselineStat'>
            Average target hit
          </div>
          <div className='baselineStat'>
            Click accuracy
          </div>
        </div>
      </div>
    </div>)
    })
  }
  getData(){
    fetch('/api/v1/games', {
     credentials: 'same-origin',
     method: 'get',
     headers: {
       'Content-Type': 'application/json',
       // 'X-Requested-With': 'XMLHttpRequest',
       // 'X-CSRF-Token': $('meta[name=csrf-token]').attr('content')
       }
    })
    .then(response => {
      if (!(response.ok || response.no_content)) {
        throw Error(response.statusText)
      }
      return response
    })
    .then(response => {
      return response.json()
    })
    .then(data => {

      this.setState({
        totalStats: {
          games: data.total_games,
          hits: data.total_hits,
          averageHit: data.average_hit,
          clicks: data.total_clicks,
          accuracy: data.total_accuracy
        },
        baselineStats: {
          fastest: data.fastest_baseline,
          fastestHit: data.fastest_baseline_hit,
          averageHit: data.average_baseline_hit,
          accuracy: data.baseline_accuracy
        },
        challengeStats: {
          mostHits: data.most_challenge_hits,
          averageHits: data.challenge_average_hit_count,
          averageHit: data.average_challenge_hit,
          accuracy: data.challenge_accuracy
        }
      })
      this.yesUser()
    })
    .catch(error => {
      console.log(error)
    })
  }
  render(){
    return(
        this.state.content
    )
  }
}

export default SelfStats