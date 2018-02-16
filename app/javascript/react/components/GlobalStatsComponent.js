import React, { Component } from 'react';

class GlobalStats extends Component {
  constructor(props){
    super(props)
    this.state = {
      upperRightContent: '',
      upperLeftContent: '',
      lowerLeftContent: '',
      lowerRightContent: ''
    }
  }

  render(){
    return(
      <div>
        <div id='globalStatsHolder'>
          <div id='globalStat1'>
            1,257
          <div className='globalStatLabel'>
            Total games played
          </div>
        </div>
          <div id='globalStat2'>
            2,341
          <div className='globalStatLabel'>
            Total targets hit
          </div>
        </div>
          <div id='globalStat3'>
            .147
          <div className='globalStatLabel'>
            Average target hit
          </div>
        </div>
          <div id='globalStat4'>
            76.4%
          <div className='globalStatLabel'>
            Global Accuracy
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default GlobalStats