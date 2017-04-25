var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	// the type is an object id that mongo assigns us
	// ref tells mongoose this field holds connection to another model
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}] // array bc we have multiple messages
});

schema.plugin(mongooseUniqueValidator); // for the unique: true 

// this creates a collection called users
module.exports = mongoose.model('User', schema);