import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

class Stats extends Component{
  constructor(props){
    super(props)
    this.state = {
      mode: 'self',
      upperLeftContent: '',
      upperRightContent: '',
      lowerLeftContent: '',
      lowerRightContent: ''
    }
    this.chooseSelf = this.chooseSelf.bind(this)
    this.chooseGlobal = this.chooseGlobal.bind(this)
    this.chooseGraphs = this.chooseGraphs.bind(this)
  }
  chooseSelf(){
    this.setState({
      mode: 'self'
    })
  }
  chooseGlobal(){
    this.setState({
      mode: 'global'
    })
  }
  chooseGraphs(){
    this.setState({
      mode: 'graphs'
    })
  }
  // componentDidMount(){
  //   fetch('/api/v1/cereals.json')
  //   .then(response => {
  //     if (!response.ok) {
  //       throw Error(response.statusText)
  //     }
  //   return response
  //   })
  //   .then(response =>{
  //     let data = response.json()
  //     return data
  //   })
  //   .then(data =>{
  //   this.setState({cereals: data['cereals']})
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }
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
          <div id='upperLeftOverlay'>
            {this.state.upperRightContent}
          </div>
          <div id='upperRightOverlay'>
            {this.state.upperLeftContent}
          </div>
          <div id='lowerLeftOverlay'>
            {this.state.lowerLeftContent}
          </div>
          <div id='lowerRightOverlay'>
            {this.state.lowerRightContent}
          </div>
        </div>
      </div>
    )
  }
}
export default Stats