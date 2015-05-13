var mongoose = require('mongoose');

module.exports = mongoose.model('Comment',{
	user: String,
	comment: String,
	questionID: String
});