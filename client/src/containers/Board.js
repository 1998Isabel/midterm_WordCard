import React from 'react';
import { Route, Switch } from "react-router-dom"
import socketIOClient from "socket.io-client";
import './Board.css';
import Header from './Header'
import Footer from './Footer'
import Side from './Side'
import VocabList from './VocabList'
import Learn from './Learn';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:4001/"
    };
  }
  render() {
    const socket = socketIOClient(this.state.endpoint)
    return (
      <div class="grid-container">
        <Header class="header" />
        <Side class="sidenav" socket={socket} />
        <Switch>
          <Route
            exact path='/'
            render={(props) => <VocabList socket={socket} />}
          />
          <Route
            path='/learn'
            render={(props) => <Learn socket={socket} />}
          />
        </Switch>
        <Footer class="footer" />
      </div>
    );
  }
}

export default Board;
