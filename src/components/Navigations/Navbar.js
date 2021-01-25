import React from 'react'
import PropTypes from 'prop-types'

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  )
}

Navbar.propTypes = {
  children: PropTypes.array.isRequired,
}

export default Navbar
