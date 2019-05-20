import React from 'react';
import { NavLink } from "react-router-dom";
import './Board.css';
import TextFields from "../components/TextFields"
import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import DashboardIcon from '@material-ui/icons/DashboardRounded';

class Side extends React.Component {
  state = {
    checked: [],
  };
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      this.props.socket.emit('flip')
    } else {
      newChecked.splice(currentIndex, 1);
      this.props.socket.emit('unflip')
    }

    this.setState({
      checked: newChecked,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <aside className="sidenav">
        <br />
        <div>
          <img src="https://cdn4.iconfinder.com/data/icons/online-education-8/500/online-education-study_13-2-512.png" style={{ width: '175px', height: '175px' }} />
        </div>
        <br />
        <List
        component="nav"
        subheader={<ListSubheader component="h2" style={{fontSize: 20,}}>Enter your vocabs!</ListSubheader>}
        style={{width: '100%', maxWidth: 240,}}
      >
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Flip Cards" />
          <ListItemSecondaryAction>
            <Switch
              onChange={this.handleToggle('flip')}
              checked={this.state.checked.indexOf('flip') !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <TextFields socket={this.props.socket} />
      </List>
        
        
        {/* <ul className="sidenav__list">
          <li className="sidenav__list-item">
            <NavLink to="/learn" activeClassName="selected">Learn</NavLink>
          </li>
        </ul> */}
      </aside>
    );
  }
}

export default Side;
