import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import New from './WordCard'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function FormRow(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid item xs>
        {/* <Paper className={classes.paper}>item</Paper> */}
        <New word="newword" type="noun" body="meaning"/>
      </Grid>
      <Grid item xs>
        {/* <Paper className={classes.paper}>item</Paper> */}
        <New />
      </Grid>
      <Grid item xs>
        {/* <Paper className={classes.paper}>item</Paper> */}
        <New />
      </Grid>
    </React.Fragment>
  );
}

FormRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

function NestedGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid container item xs={12} spacing={24}>
          <FormRow classes={classes} />
        </Grid>
        <Grid container item xs={12} spacing={24}>
          <FormRow classes={classes} />
        </Grid>
        <Grid container item xs={12} spacing={24}>
          <FormRow classes={classes} />
        </Grid>
      </Grid>
    </div>
  );
}

NestedGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedGrid);