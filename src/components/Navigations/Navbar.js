import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Home</Link>
      </div>
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  )
}

Navbar.propTypes = {
  children: PropTypes.array.isRequired,
}

export default Navbar
