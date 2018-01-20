import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import Menu from './MenuContainer'
import Game from './GameContainer'
import Stats from './StatsContainer'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return(
      <Router history={browserHistory}>
        <Route path='/' component={Menu} />
        <Route path='/stats' component={Stats} />
        <Route path='/play' component={Game} />
      </Router>
    )
  }
}

export default App