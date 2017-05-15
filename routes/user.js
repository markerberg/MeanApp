var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/user');

router.post('/', function (req, res, next) {
	var user = new User({ // we retrieve all this info from body of request
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: bcrypt.hashSync(req.body.password, 10), // use third party lib for encrypting password
		email: req.body.email
	});
	user.save(function(err, result){
		if (err) {
			return res.status(500).json({
				title: 'An error occured',
				error: err
			}); 
		}
		res.status(201).json({
			message: 'User Created',
			obj: result
		});
	});
});

module.exports = router;
