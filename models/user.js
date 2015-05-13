var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	fbid: String,
	name: String,
	email: String,
	firstName: String,
	lastName: String,
	token: String,
	image: String,
	role: String
});