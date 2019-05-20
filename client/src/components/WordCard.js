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

const styles = theme => ({
  card: {
    minWidth: 200,
    minHeight: 100,
    margin: '20px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    margintop: 12,
    marginBottom: 12,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function SimpleCard(props) {
  const { classes } = props;
  const handleClick = () => {
    const key = props.ind;
    // console.log('The delete key = ')
    // console.log(key)
    props.onClick(key);
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.word}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.type}
        </Typography>
        <Typography component="p">
          {props.body}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Delete" className={classes.margin} onClick={handleClick}>
          <DeleteIcon fontSize="medium" />
        </IconButton>
        <Typography component="p">
          Times appeared: {props.times}
        </Typography>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);