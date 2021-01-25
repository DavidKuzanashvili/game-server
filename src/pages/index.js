import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import About from './about'
import Games from './games'

import { ReactComponent as BellIcon } from '../icons/bell.svg'
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg'
import { ReactComponent as CaretIcon } from '../icons/caret.svg'
import { ReactComponent as PlusIcon } from '../icons/plus.svg'

import Navbar from '../components/Navigations/Navbar'
import NavItem from '../components/Navigations/NavItem'
import DropdownMenu from '../components/Dropdowns/DropdownMenu'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Router>
        <Navbar>
          <NavItem icon={<PlusIcon />} />
          <NavItem icon={<BellIcon />} />
          <NavItem icon={<MessengerIcon />} />

          <NavItem icon={<CaretIcon />}>
            <DropdownMenu />
          </NavItem>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. 
          */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/games">
            <Games />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default Home
