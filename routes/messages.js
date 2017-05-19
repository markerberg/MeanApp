var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Message = require('../models/message');

router.get('/', function(req, res, next) {
	Message.find() 
		.populate('user', 'firstName') // expand data we retrieve so each message will have user and first name
		.exec(function(err, messages) {
			if(err) {
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
			res.status(200).json({
				message: 'success',
				obj: messages
			});
		});
});

router.use('/', function(req, res, next) {
	// validate incoming token with jwt looking at query params
	jwt.verify(req.query.token, 'secret', function(err, decoded) {
		if (err) {
			return res.status(401).json({
				title: 'Not Authenticated',
				error: err
			});
		}
		next();
	})
});

router.post('/', function (req, res, next) {
	var decoded = jwt.decode(req.query.token); // fetch user with decoded token
	User.findById(decoded.user._id, function(err, user){
			if(err) {
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
			var message = new Message({
			content: req.body.content,
			user: user // set it to user we extract from db
		});
		message.save(function(err, result){
			if(err) {
				// we return here so that we send a res and the status(201) doesnt get sent aswell 
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
			// when saved, access message arr of user and push new message to array 
			user.messages.push(result);
			user.save();
			// func ends here, so dont return here bc the code after it wouldnt execute. it ends naturally 
			res.status(201).json({
				message: 'Saved message',
				// obj is the saved message from db
				obj: result
			});
		});
	});
});

router.patch('/:id', function(req, res, next) {
	var decoded = jwt.decode(req.query.token);
	// find message based on ID
	Message.findById(req.params.id, function(err, message){
		if (err) {
			return res.status(500).json({
				title: 'An error occured',
				error: err
			}); 
		}
		if (!message) { // if message not found
			return res.status(500).json({
				title: 'No message found',
				error: {message: 'Message not found'}
			});
		}
		if (message.user != decoded.user._id) { // make sure no other user can mofify the creator of this message
			return res.status(401).json({
				title: 'Not Authenticated',
				error: {message: 'Users do not match'}
			});
		}
		// update the message.content which is the field we're changing
		message.content = req.body.content;
		message.save(function(err, result){
		if(err) {
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		res.status(200).json({
			message: 'Updated message',
			obj: result
		});
	});
	});
});

router.delete('/:id', function(req, res, next) {
	var decoded = jwt.decode(req.query.token);
	Message.findById(req.params.id, function(err, message){
			if (err) {
				return res.status(500).json({
					title: 'An error occured',
					error: err
				}); 
			}
			if (!message) {
				return res.status(500).json({
					title: 'No message found',
					error: {message: 'Message not found'}
				});
			}
			if (message.user != decoded.user._id) { 
			return res.status(401).json({
				title: 'Not Authenticated',
				error: {message: 'Users do not match'}
			});
			}
			message.remove(function(err, result){
			if(err) {
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
			res.status(200).json({
				message: 'Deleted message',
				obj: result
			});
		});
	});
});
module.exports = router;
