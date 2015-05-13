var mongoose = require('mongoose');

module.exports = mongoose.model('Question',{
	user: String,
	question: String,
	discID: String
});