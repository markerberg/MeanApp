var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
	content: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

//mongoose middleware execute when something happens to message
schema.post('remove', function(message){
	// for message we remove, find its user
	User.findById(message.user, function(err, user){
		user.messages.pull(message); // pull this message from user array
		user.save();
	});
});

// the first arg lets us use new Message and determine collection name(messages)
// second arg is the schema for how it looks
module.exports = mongoose.model('Message', schema);