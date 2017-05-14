var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', function(req, res, next) {
	Message.find() // find messages with mongoose model
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

router.post('/', function (req, res, next) {
	var message = new Message({
		content: req.body.content
	});
	message.save(function(err, result){
		if(err) {
			// we return here so that we send a res and the status(201) doesnt get sent aswell 
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		// func ends here, so dont return here bc the code after it wouldnt execute. it ends naturally 
		res.status(201).json({
			message: 'Saved message',
			// obj is the saved message from db
			obj: result
		});
	});
});

router.patch('/:id', function(req, res, next) {
	// find message based on ID
	Message.findById(req.params.id, function(err, message){
		if (err) {
			return res.status(500).json({
				title: 'An error occured',
				error: err
			}); 
		}
		if (!Message) {
			return res.status(500).json({
				title: 'No message found',
				error: {message: 'Message not found'}
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

module.exports = router;
