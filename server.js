const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Vocab = require('./models/vocab')

const app = express()
const http = require('http').Server(app)

// our localhost port
const port = process.env.PORT || 4001

// Socket.io serverSocket
const serverSocket = require('socket.io')(http)

// Start server listening process.
http.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})

// Connect to mongo
mongoose.connect('mongodb+srv://Isabel:Isabel0712@cluster0-eay7s.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})
db = mongoose.connection

// This is what the socket.io syntax is like, we will work this later
db.on('error', error => {
    console.log(error)
})
db.once('open', () => {
    console.log('MongoDB connected!')
    //define events
    serverSocket.on('connection', socket => {
        console.log('New client connected')

        const update = () => {
            Vocab.find()
            .limit(100)
            .sort({ times: -1 })
            .exec((err, res) => {
                if (err){
                    console.log('err happend in find (init)')
                }
                console.log('emitting init')
                console.log(res)
                socket.emit('init', res)
            })
        }

        update();

        socket.on('reinit', () => {
            update();
        })

        socket.on('input', (data) => {
            let newword = data.word
            let newtype = data.type
            let newbody = data.body
            Vocab.findOne({ word: newword }).select({times: 1, _id: 0}).exec((err, docs) => {
                // let oldtimes = docs.times
                if (err) console.log('err in findOne first.')
                if (docs) {
                    let oldtimes = docs.times + 1
                    console.log('oldtimes: ', oldtimes);
                    Vocab.updateOne({ word: newword }, { times: oldtimes }).exec((err, newdoc) => {
                        if (err) console.log(err);
                    })
                    data.times = oldtimes
                    serverSocket.emit('update', [data])
                }
                else {
                    console.log('Not finded')
                    let newtimes = 1
                    const newvocab = new Vocab({ word: newword, type: newtype, body: newbody, times: newtimes })
                    newvocab.save((err,doc) => {
                        if (err){
                            console.log('err happend in find (save)')
                            console.error(err)
                        }
                        console.log(doc)
                        // data.times = newtimes
                        serverSocket.emit('output', doc)
                    })
                }
            })
            // update();
        })

        socket.on('flip', () => {
            console.log('Turn to flip card')
            socket.emit('toflip')
        })

        socket.on('unflip', () => {
            console.log('Turn to unflip card')
            socket.emit('unflip')
        })

        socket.on('delete', (data) => {
            console.log('Delete one vocab...')
            console.log(data)
            // Remove all chats from collection
            Vocab.deleteOne({ word: data }, () => {
                // serverSocket.emit('cleared')
            })
        })

        socket.on('clear all', () => {
            console.log('Clearing all vocabs...')
            // Remove all chats from collection
            Vocab.deleteMany({}, () => {
                // Emit cleared
                // update();
                serverSocket.emit('cleared')
            })
        })

        // disconnect is fired when a client leaves the server
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
})