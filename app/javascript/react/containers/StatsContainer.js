import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import SelfStats from '../components/SelfStatsComponent'
import GlobalStats from '../components/GlobalStatsComponent'
import Graphs from '../components/GraphsComponent'

class Stats extends Component{
  constructor(props){
    super(props)
    this.state = {
      mode: 'self',
      coreContent: ''
    }
    this.chooseSelf = this.chooseSelf.bind(this)
    this.chooseGlobal = this.chooseGlobal.bind(this)
    this.chooseGraphs = this.chooseGraphs.bind(this)
  }
  componentWillMount(){
    this.chooseSelf()
  }
  chooseSelf(){
    let selfStats = (
      <SelfStats />
    )
    this.setState({
      mode: 'self',
      coreContent: selfStats
    })
  }
  chooseGlobal(){
    let globalStats = (
      <GlobalStats />
    )
    this.setState({
      mode: 'global',
      coreContent: globalStats
    })
  }
  chooseGraphs(){
    let graphs = (
      <Graphs />
    )
    this.setState({
      mode: 'graphs',
      coreContent: graphs
    })
  }
  render(){
    let baselineOptionClass, enduranceOptionClass, challengeOptionClass
    if (this.state.mode == 'self'){
      baselineOptionClass = 'selectedOption'
      challengeOptionClass = 'unSelectedOption'
      enduranceOptionClass = 'unSelectedOption'
    } else if (this.state.mode == 'global') {
      baselineOptionClass = 'unSelectedOption'
      challengeOptionClass = 'unSelectedOption'
      enduranceOptionClass = 'selectedOption'
    } else {
      baselineOptionClass = 'unSelectedOption'
      challengeOptionClass = 'selectedOption'
      enduranceOptionClass = 'unSelectedOption'
    }
    return(
        <div>
          <div id='lowerNavPanel'>
            <div id='lowerNavPanel'>
              <div id='chooseTitle'>Select Stats</div>
              <div id='baselineOption' onClick={this.chooseSelf} className={baselineOptionClass}>Self</div>
              <div id='enduranceOption' onClick={this.chooseGlobal} className={enduranceOptionClass}>Global</div>
              <div id='challengeOption' onClick={this.chooseGraphs} className={challengeOptionClass}>Graphs</div>
            </div>
          </div>
        <div id='coreDisplayPanel'>
          {this.state.coreContent}
        </div>
      </div>
    )
  }
}
export default Stats