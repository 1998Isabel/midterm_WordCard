const mongoose = require('mongoose')
const Schema = mongoose.Schema //database structure

// Creating a schema, sort of like working with an ORM
const VocabSchema = new Schema({
	word: {
		type: String,
		lowercase: true,
		required: [true, 'Word field is required.']
	},
	type: {
		type: String,
		required: [true, 'Parts of speech field is required.']
	},
	body: {
		type: String,
		required: [true, 'Meaning field is required.']
	},
	times: {
		type: Number,
		required: [true, 'Times field is required.']
	}
})

// Creating a table within database with the defined schema
const Vocab = mongoose.model('vocab', VocabSchema)

// Exporting table for querying and mutating
module.exports = Vocab
