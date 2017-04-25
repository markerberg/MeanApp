var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	content: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

// the first arg lets us use new Message and determine collection name(messages)
// second arg is the schema for how it looks
module.exports = mongoose.model('Message', schema);