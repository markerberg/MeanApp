var express = require('express');
var router = express.Router();

var Message = require('../models/message');

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

module.exports = router;
