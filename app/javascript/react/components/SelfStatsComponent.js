import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBullseye, faExpandArrowsAlt, faExpand, faTimesCircle, faCrosshairs, faAdjust, faClock, faPauseCircle } from '@fortawesome/fontawesome-free-solid'
import { Chart } from 'react-google-charts'
class SelfStats extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: null,
      chooseNumbersClass: 'selectedOption',
      chooseGraphsClass: 'unSelectedOption',
      user: false
    }
    this.getData = this.getData.bind(this)
    this.noUser = this.noUser.bind(this)
    this.yesUser = this.yesUser.bind(this)
    this.showNumbers = this.showNumbers.bind(this)
    this.showGraphs = this.showGraphs.bind(this)
    this.careerChartData = this.careerChartData.bind(this)
    this.baselineChartData = this.baselineChartData.bind(this)
    this.challengeChartData = this.challengeChartData.bind(this)
    this.showCareerGraph = this.showCareerGraph.bind(this)
    this.showBaselineGraph = this.showBaselineGraph.bind(this)
    this.showChallengeGraph = this.showChallengeGraph.bind(this)
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
      <div id='coreDisplayOverlay'>Please log in</div>
    )
    this.setState({
      content: content,
      user: false
    })
  }
  yesUser(){
    if (this.state.user){
      return(
      <div id='displaySwitchBox'>
        <div id='displaySwitchTitle'>
          Select Display
        </div>
        <div id='chooseNumbers' className={this.state.chooseNumbersClass} onClick={this.showNumbers}>
          Numbers
        </div>
        <div id='chooseGraphs' className={this.state.chooseGraphsClass} onClick={this.showGraphs}>
          Graphs
        </div>
      </div>
    )
    } else {
      return null
    }
  }
  showNumbers(){
    let content = (
      <div>
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
      </div>
    )
    this.setState({
      content: content,
      chooseNumbersClass: 'selectedOption',
      chooseGraphsClass: 'unSelectedOption'
    })
  }
  showCareerGraph(){
    return(
      <Chart
        chartType="LineChart"
          data={this.careerChartData()}
          options={
            {
              title: 'Career',
              curveType: 'function',
              legend: { position: 'bottom' },
              backgroundColor: '#C1CAD6'
            }
          }
          graph_id="globalLineChart"
          width="464px"
          height="136px"
      />
    )
  }
  showBaselineGraph(){
    return(
      <Chart
        chartType="LineChart"
          data={this.baselineChartData()}
          options={
            {
              title: 'Baseline',
              curveType: 'function',
              legend: { position: 'bottom' },
              backgroundColor: '#C1CAD6'
            }
          }
          graph_id="baselineLineChart"
          width="464px"
          height="136px"
      />
    )
  }
  showChallengeGraph(){
    return(
      <Chart
        chartType="LineChart"
          data={this.challengeChartData()}
          options={
            {
              title: 'Challenge',
              curveType: 'function',
              legend: { position: 'bottom' },
              backgroundColor: '#C1CAD6'
            }
          }
          graph_id="challengeLineChart"
          width="464px"
          height="136px"
      />
    )
  }
  showGraphs(){
    let careerChart, baselineChart, challengeChart
    if (this.state.careerChartData.accuracy.length < 4) {
      careerChart = 'Play ' + (4 - this.state.careerChartData.accuracy.length) + ' more games.'
    } else {
      careerChart = this.showCareerGraph()
    }
    if (this.state.baselineChartData.times.length < 2) {
      baselineChart = 'Play ' + (2 - this.state.baselineChartData.accuracy.length) + ' more baseline games.'
    } else {
      careerChart = this.showBaselineGraph()
    }
    if (this.state.challengeChartData.hits.length < 4) {
      challengeChart = 'Play ' + (2 - this.state.challengeChartData.accuracy.length) + ' more challenge games.'
    } else {
      challengeChart = this.showCareerGraph()
    }
    let content = (
      <div>
        <div id='globalLineChartBox'>
          {careerChart}
        </div>
        <div id='baselineLineChartBox'>
          {baselineChart}
        </div>
        <div id='challengeLineChartBox'>
          {challengeChart}
        </div>
    </div>
    )
    this.setState({
      content: content,
      chooseNumbersClass:'unSelectedOption',
      chooseGraphsClass: 'selectedOption'
    })
  }
  careerChartData(){
    let i = 0
    let formattedArray = this.state.careerChartData.accuracy.reverse().map(accuracy => {
      i = i + 1
      return(
        [i.toString(), accuracy]
      )
    })
    formattedArray.unshift(['Games', 'Accuracy'])
    return formattedArray
  }
  baselineChartData(){
    let i = 0
    let formattedArray = this.state.baselineChartData.times.reverse().map(time => {
      i = i + 1
      return(
        [i.toString(), parseInt(time)/1000]
      )
    })
    formattedArray.unshift(['Games', 'Time'])
    return formattedArray
  }
  challengeChartData(){
    let i = 0
    let formattedArray = this.state.challengeChartData.hits.reverse().map(hits => {
      i = i + 1
      return(
        [i.toString(), parseInt(hits)]
      )
    })
    formattedArray.unshift(['Games', 'Hits'])
    return formattedArray
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
        totalStats: data.totalStats,
        baselineStats: data.baselineStats,
        challengeStats: data.challengeStats,
        careerChartData: data.careerChartData,
        baselineChartData: data.baselineChartData,
        challengeChartData: data.challengeChartData,
        user: true
      })
      this.showNumbers()
    })
    .catch(error => {
      console.log(error)
    })
  }
  render(){
    return(
      <div>
      {this.state.content}
      {this.yesUser()}
    </div>
    )
  }
}

export default SelfStats