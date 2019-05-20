import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import Board from './containers/Board';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Board />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
