var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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

router.post('/signin', function(req, res, next) {
	// use mongoose model to find user by email, compare password from db to form
	User.findOne({email: req.body.email}, function(err, user){ // find entry where email is same email passed in req body
		if (err) {
			return res.status(500).json({
				title: 'An error occured',
				error: err
			}); 
		}
		if (!user) {
			return res.status(401).json({
				title: 'Log in Failed',
				error: {message: 'Invalid login credentials'}
			});
		}
		// compare passwords, password entered in login form compare to password stored in db
		if (!bcrypt.compareSync(req.body.password, user.password)) { // if password not same in db
			return res.status(401).json({
				title: 'Log in Failed',
				error: {message: 'Invalid login credentials'}
			}); 
		}
		// now we create token, client can use for future req to say they already logged in and are authenticated
		//json web token generate and sign a new token for us
		// payload-state our data, secret-ket, and expiresIn- how long will token be valid(in seconds)
		var token = jwt.sign({user: user},'secret', {expiresIn: 7200});
		res.status(200).json({
			message: 'Successfully logged in',
			token: token,
			userId: user._id
		});
	}); 
});

module.exports = router;
