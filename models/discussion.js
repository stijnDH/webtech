var mongoose = require('mongoose');

module.exports = mongoose.model('Discussion',{
	discname: String,
	close: Number,
	coordinates: Array
});