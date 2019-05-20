import React from 'react';
import './../Board.css';
import Card from './../../conpoments/Card'
import New from './../../conpoments/New'

export default class Works extends React.Component {
  render() {
    return (
      <main class="main">
        <div class="main-overview">
          <Card />
          <Card />
          <New />
        </div>
      </main>
    );
  }
}
