import React from 'react'

const Target = (props) => {
  return(
      <div className={props.location} id='target' onClick={props.onHit}>
      </div>
  )
}

export default Target