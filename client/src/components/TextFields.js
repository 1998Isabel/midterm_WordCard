import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit*2.5,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginLeft: theme.spacing.unit*2.5,
    margin: theme.spacing.unit,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const wordtypes = [
  { value: 'noun' },
  { value: 'verb' },
  { value: 'adjective' },
  { value: 'adverb' },
  { value: 'preposition' },
  { value: 'conjunction' }
];

class TextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = { word: '', type: 'noun', body: 'meaning' };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(this.state.word)
  };

  handleAdd = () => {
    const newword = { word: this.state.word, type: this.state.type, body: this.state.body }
    // const socket = socketIOClient("http://localhost:4001/");
    this.props.socket.emit('input', newword)
  }

  handleClear = () => {
    // const socket = socketIOClient("http://localhost:4001/");
    this.props.socket.emit('clear all')
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          // id="standard-password-input"
          label="Word"
          className={classes.textField}
          onChange={this.handleChange('word')}
          margin="normal"
        />

        <TextField
          id="standard-select-currency-native"
          select label="Parts of speech"
          className={classes.textField}
          onChange={this.handleChange('type')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {wordtypes.map(option => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </TextField>

        <TextField
          id="standard-multiline-flexible"
          label="Meaning"
          multiline
          rowsMax="4"
          rows="2"
          placeholder="The meaning of the word..."
          onChange={this.handleChange('body')}
          className={classes.textField}
          margin="normal"
        />

        <Button variant="outlined"
          className={classes.button}
          onClick={this.handleAdd}
        >
          Add Word
        </Button>

        <Button variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleClear}
        >
          Delete All
        <DeleteIcon className={classes.rightIcon} />
        </Button>
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);