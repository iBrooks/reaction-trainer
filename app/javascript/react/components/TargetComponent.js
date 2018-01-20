import React from 'react'

const Target = (props) => {
  let cssString = "" + props.location
  return(
    <div className={props.location}>
      <button onClick={props.onClick}>CATCH ME</button>
    </div>
  )
}

export default Target