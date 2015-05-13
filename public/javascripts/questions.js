$(document).ready(function(){

var socket = io.connect('http://localhost:3000');
	
	$("#questionForm").submit(function(e){
		// 1 - fanta of cola
		//alert("woef");
		e.preventDefault();
		var question = $(".input__field").val();
		$(".input__field").val('');
		var discID = $(".discussionID").val();
		var user = $(".username").val();
		console.log(question);
		console.log(discID);
		console.log(user);
		var question = { "user": user, "question": question, "discID": discID};
		socket.emit('question', question);
		console.log(question);
	});

	socket.on('questionupdate', function (message) {
    	
    	console.log(message);

    	$(".questions__list").append('<li class="animatedLi fadeUp">' + message.question + ' <a href="http://localhost:3000/question/' + message._id + '">Bekijk de vraag!</a></li>')

  	});

	var testval = $(".discussionID").val();
	var user = $(".username").val();
	var test = {"discID": testval, "username": user};
  	socket.emit('questionlijst', test);

  	socket.on('usercountupdate', function (users) {	
  		$('.usercount__number').html(users.length);
    	console.log('HALLO');
    	console.log(users.length);
    	console.log(users);
    	$('.usercount__names').html('');
    	for(var i = 0; i < users.length; i++)
		{
			$('.usercount__names').append(users[i].username + ', ');
			console.log(users[i].username);
		}
  	});

  	socket.on('questionstart', function(questions){
  		console.log(questions);
		var length = questions.length;
		for(var i = 0; i < questions.length; i++)
		{
			$('.questions__list').append('<li class="animatedLi fadeUp">' + questions[i].question + ' <a href="http://localhost:3000/question/' + questions[i]._id + '">Bekijk de vraag!</a></li>');
		}
	})
});
