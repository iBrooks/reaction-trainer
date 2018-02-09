import React from 'react'
import Foundation from 'react-foundation';

const StartMenu = (props) => {
  let baselineButton, enduranceButton, challengeButton
  if (props.mode == 'Baseline'){
    baselineButton = 'expand button selected'
    challengeButton = 'expand button unSelected'
    enduranceButton = 'expand button unSelected'
  } else if (props.mode == 'Endurance') {
    baselineButton = 'expand button unSelected'
    challengeButton = 'expand button unSelected'
    enduranceButton = 'expand button selected'
  } else {
    baselineButton = 'expand button unSelected'
    challengeButton = 'expand button selected'
    enduranceButton = 'expand button unSelected'
  }
  return(
    <div id='startMenu'>
      <div className='row'>
        <div>
          <a href="" onClick={props.chooseBaseline} className={baselineButton}>Baseline</a>
          <a href="" onClick={props.chooseEndurance} className={enduranceButton}>Endurance</a>
          <a href="" onClick={props.chooseChallenge} className={challengeButton}>Challenge</a>
        </div>
      </div>
      <div id='startButton'>
        <a href="" onClick={props.startGame} className="expand button start">Start {props.mode}</a>
      </div>
      <div className='row'>
        <div id='gameDescription' className='small-11 columns small-centered text-center'>
          {props.description}
        </div>
      </div>
    </div>
  )
}
export default StartMenu