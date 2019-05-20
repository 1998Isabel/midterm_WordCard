import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

const styles = theme => ({
  card: {
    width: '200px',
    height: '200px',
    margin: '20px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    borderRadius: '5px', /* 5px rounded corners */
  },
  pos: {
    padding: '20px',
  },
});

function SimpleCard(props) {
  const { classes } = props;
  const handleClick = () => {
    const key = props.key;
    props.onClick(key);
  }

  return (
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      style={{ width: '200px',
      height: '100px',
      margin: '20px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      transition: '0.3s',
      borderRadius: '5px', /* 5px rounded corners */}} /// these are optional style, it is not necessary
    >
      <FrontSide style={{ backgroundColor: '#d2e8f5',textAlign: 'center', lineHeight:100 }}>
        <Typography variant="h5" component="h2">
          {props.word}
        </Typography>
      </FrontSide>
      <BackSide style={{ backgroundColor: '#b6d4e6' }}>
        <Typography color="textSecondary">
          {props.type}
        </Typography>
        <Typography variant="h6" color="#f6f9faee">
          {props.body}
        </Typography>
      </BackSide>
    </Flippy >
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);