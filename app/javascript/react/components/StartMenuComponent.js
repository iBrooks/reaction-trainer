import React from 'react'
import Foundation from 'react-foundation';

const StartMenu = (props) => {
  let baselineOptionClass, enduranceOptionClass, challengeOptionClass
  if (props.mode == 'Baseline'){
    baselineOptionClass = 'selectedOption'
    challengeOptionClass = 'unSelectedOption'
    enduranceOptionClass = 'unSelectedOption'
  } else if (props.mode == 'Challenge') {
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
        <div id='chooseTitle'>Select Mode</div>
        <div id='baselineOption' onClick={props.chooseBaseline} className={baselineOptionClass}>Baseline</div>
        <div id='enduranceOption' onClick={props.chooseEndurance} className={enduranceOptionClass}>Challenge</div>
        <div id='challengeOption' onClick={props.chooseChallenge} className={challengeOptionClass}>Challenge</div>
      </div>
    <div id='coreDisplayPanel'>
      <div id='coreDisplayOverlay'>
        <div id='gameDescription'>
          {props.description}
        </div>
        <div id='startButton' onClick={props.startGame}>Start {props.mode}</div>
      </div>
    </div>
  </div>

  )
}
export default StartMenu