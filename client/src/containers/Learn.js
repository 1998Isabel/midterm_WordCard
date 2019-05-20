import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import WordCard from '../components/WordCard'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class LearnCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = { vocabs: [] };
    }

    componentDidMount() {
        const initvocab = vocablist => {
            console.log('vocabs in db from init')
            this.setState({ vocabs: vocablist })
        }

        const newvocab = newword => {
            if (newword.word) {
                console.log('newdata')
                let newlist = this.state.vocabs
                newlist.push(newword)
                this.setState({ vocabs: newlist })
            }
        }

        const clearall = () => {
            console.log('cleared all')
            this.setState({ vocabs: [] })
        }

        this.props.socket.on("init", data => {
            initvocab(data);
        })

        this.props.socket.on("cleared", () => {
            clearall();
        })

        this.props.socket.on("output", newdata => {
            newvocab(newdata);
        })

        this.props.socket.on("update", data => {
            console.log('To be update: ')
            console.log(data)
            this.props.socket.emit("reinit")
        })
    }

    handleClick = (key) => {
        const afterdelete = this.state.vocabs
        const del = afterdelete.splice(key, 1)
        this.setState({ vocabs: afterdelete });
        this.props.socket.emit('delete', del[0].word);
    };

    render() {
        const { classes } = this.props;
        const showVocab = this.state.vocabs.map((item, key) => (
            <Grid container item xs>
                <WordCard word={item.word} type={item.type} body={item.body} times={item.times} key={key} onClick={this.handleClick} />
            </Grid>
        ))

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {showVocab}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(LearnCards);