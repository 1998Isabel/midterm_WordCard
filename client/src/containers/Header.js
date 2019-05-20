import React from 'react';
import './Board.css';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header__search">Welcome to your Vocab Card !</div>
        <div className="header__avatar">Nobody</div>
      </header>
    );
  }
}

export default Header;
