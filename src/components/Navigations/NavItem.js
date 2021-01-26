import React, { useState } from 'react'
import PropTypes from 'prop-types'

function NavItem(props) {
  const [open, setOpen] = useState(false)

  return (
    <li className="nav-item">
      <span className="icon-button btn" onClick={() => setOpen(!open)}>
        {props.icon}
      </span>
      {open && props.children}
    </li>
  )
}

NavItem.propTypes = {
  icon: PropTypes.object,
  children: PropTypes.object,
}

export default NavItem
