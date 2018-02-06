import React from 'react'

const Background = (props) => {
  return(
    <div id='gameBackground' onClick={props.onMiss}></div>
  )
}

export default Background
