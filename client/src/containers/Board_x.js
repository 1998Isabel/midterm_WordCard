import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import socketIOClient from "socket.io-client";
import './Board.css';
import Header from './Header'
import Footer from './Footer'
import Side from './Side'
import Allcards from './CardType/Allcards'
import Works from './CardType/Works'
import Studies from './CardType/Studies';
import Houses from './CardType/Houses'
import MyGrid from './../conpoments/MyGrid'
import { appendFile } from 'fs';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      endpoint: "http://localhost:4001/",
      status: "OK!"
    };
  }
  render() {
    const socket = socketIOClient(this.state.endpoint)
    let newword = {word: "apple", body: "a kind of fruit", times: 1}
    let newword2 = {word: "banna", body: "a kind of fruit", times: 1}
    socket.emit("input", newword2)
    socket.on("output", data => {
      console.log(data)
    })
    socket.on("init", data => {
      console.log('words in db from init')
      console.log(data)
    })
    return (
      <div class="grid-container">
        <Header class="header" />
        <Side class="sidenav" />
        <Switch>
          <Route exact path="/" component={MyGrid} />
          <Route path="/work" component={Works} />
          <Route path="/study" component={Studies} />
          <Route path="/house" component={Houses} />
          <Redirect from="/all" to="/" />
        </Switch>
        <Footer class="footer" />
      </div>
    );
  }
}

export default Board;
