var express = require('express');
var router = express.Router();

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isLoggedIn, function(req, res){
		Discussion = require('../models/discussion');
		Discussion.find(function(err, discussions){
	        res.render('home', { user: req.user, discussion: discussions });
	    });
	});

	router.get('/test', isLoggedIn, function(req, res){
		res.render('test', { user: req.user });
	});

	router.get('/profile', isLoggedIn, function(req, res){
		res.render('profile', { user: req.user });
	})

	router.get('/newdisc', isLoggedIn, function(req, res){
		res.render('newdisc', { user: req.user });
	});

	router.post('/newdisc', function(req, res){
	    Discussion = require('../models/discussion');

		var d = new Discussion({ 
		    discname: req.body.discname,
		    close: req.body.close,
		    coordinates: [req.body.latitude, req.body.longitude]
		  }).save(function (err, d) {
		    if (err) return console.error(err);
		    console.log(d);
		    var id = d._id;
			res.redirect('/discussion/' + id);
		});
	});

	router.get('/discussion/:id', isLoggedIn, function(req, res){
		var id = req.params.id;
		Discussion.findOne({_id: id }).exec(function(err, discussions){
	        res.render('discussion', { user: req.user, discussion: discussions});
	    });
	});

	router.get('/discussion/:id/closed', isLoggedIn, function(req, res){
		var id = req.params.id;
		if (req.user.role == 1) {
			Discussion.update({_id: id}, {close: "1"}, function(err) {
				Discussion.findOne({_id: id}).exec(function(err, discussions){
		        	res.render('discussion', { user: req.user, discussion: discussions});
		    	});
			});	
		}
		else
		{
			Discussion.findOne({_id: id}).exec(function(err, discussions){
		        res.render('discussion', { user: req.user, discussion: discussions});
		    });
		};
	});

	router.get('/discussion/:id/open', isLoggedIn, function(req, res){
		var id = req.params.id;
		if (req.user.role == 1) {
			Discussion.update({_id: id}, {close: "0"}, function(err) {
				Discussion.findOne({_id: id}).exec(function(err, discussions){
		        	res.render('discussion', { user: req.user, discussion: discussions});
		    	});
			});	
		}
		else
		{
			Discussion.findOne({_id: id}).exec(function(err, discussions){
		        res.render('discussion', { user: req.user, discussion: discussions});
		    });
		};
	});

	router.get('/question/:id', isLoggedIn, function(req, res){
		Question = require('../models/question');
		var id = req.params.id;
		Question.findOne({_id: id }).exec(function(err, questions){
			Discussion.findOne({_id: questions.discID}).exec(function(err, discussion){
				res.render('question', { user: req.user, question: questions, discussions: discussion});
			})
	    });
	});

	router.get('/question/:id/delete',isLoggedIn, function(req, res){
		var id = req.params.id;
		Question.findOne({_id: id }).exec(function(err, questions){
		    Question.remove({_id: req.params.id}, function(err){
				if(err) res.json(err);
				else	res.redirect('/discussion/' + questions.discID);
			});
	    });
	});
	router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email', ] }));

    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/home',
            failureRedirect : '/'
        }));

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/');
	}

	return router;
}





