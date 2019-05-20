import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import WordCard from '../components/WordCard';
import Flipcard from '../components/Flipcard';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class VocabList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { vocabs: [], flipped: false};
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

        const turnflip = (value) => {
            this.setState({ flipped: value})
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

        this.props.socket.on("toflip", () => {
            const flipvalue = true
            turnflip(flipvalue)
        })

        this.props.socket.on("unflip", () => {
            const flipvalue = false
            turnflip(flipvalue)
        })
    }

    handleClick = (key) => {
        const afterdelete = this.state.vocabs
        // console.log(key)
        const del = afterdelete.splice(key, 1)
        this.setState({ vocabs: afterdelete });
        this.props.socket.emit('delete', del[0].word);
    };

    render() {
        const { classes } = this.props;
        let showVocab;
        if (this.state.flipped) {
            showVocab = this.state.vocabs.map((item, index) => (
                <Grid container item xs>
                    <Flipcard word={item.word} type={item.type} body={item.body} times={item.times} ind={index}/>
                </Grid>
            ))
        }
        else{
            showVocab = this.state.vocabs.map((item, index) => (
                <Grid container item xs>
                    <WordCard word={item.word} type={item.type} body={item.body} times={item.times} ind={index} onClick={this.handleClick} />
                </Grid>
            ))
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    {showVocab}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(VocabList);