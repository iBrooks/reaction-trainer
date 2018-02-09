import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Menu from './MenuContainer'
import Stats from './StatsContainer'
import GameSelection from './GameSelectionContainer'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return(
      <Router history={browserHistory}>
        {/* <Route path='/' component={Menu} />
        <Route path='/stats' component={Stats} /> */}
        <Route path='*' component={GameSelection} />
      </Router>
    )
  }
}

export default App