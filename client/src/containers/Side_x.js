import React from 'react';
import { NavLink } from "react-router-dom";
import './Board.css';

class Side extends React.Component {
  render() {
    return (
      <aside className="sidenav">
        <div className="sidenav__close-icon">
          <i className="fas fa-times sidenav__brand-close"></i>
        </div>
        <ul className="sidenav__list">
          <li className="sidenav__list-item">
            <NavLink to="/all" exact activeStyle={{ color: '#ddd' }} >All</NavLink>
          </li>
          <li className="sidenav__list-item">
            <NavLink to="/work" exact activeStyle={{ color: '#ddd' }} >Work</NavLink>
          </li>
          <li className="sidenav__list-item">
            <NavLink to="/study" exact activeStyle={{ color: '#ddd' }} >Study</NavLink>
          </li>
          <li className="sidenav__list-item">
            <NavLink to="/house" exact activeStyle={{ color: '#ddd' }} >House</NavLink>
          </li>

        </ul>
      </aside>
    );
  }
}

export default Side;
