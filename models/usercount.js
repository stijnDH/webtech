var mongoose = require('mongoose');

module.exports = mongoose.model('UserCount',{
	username: String,
	discID: String
});