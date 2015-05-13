$(document).ready(function(){

var socket = io.connect('http://localhost:3000');
	
	$("#commentForm").submit(function(e){
		e.preventDefault();
		var comment = $(".input__field").val();
		$(".input__field").val('');
		var questionID = $(".questionID").val();
		var user = $(".username").val();
		var time = $(".time").val();
		var comment = { "user": user, "comment": comment, "questionID": questionID, "time": time};
		socket.emit('comment', comment);
		console.log(comment);
	});

	socket.on('commentupdate', function (message) {
    	
    	console.log(message);
    	var newHTML  = replaceWithImgLinks(message.comment);

		function replaceWithImgLinks(txt) {
		    var linkRegex = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(?:jpg|jpeg|gif|png))/gi;
		        
		    var replacement = '<a href="$1" target="_blank"><img class="sml" src="$1" /></a><br />';
		    return txt.replace(linkRegex , replacement);
		}

    	$(".comments__list").append('<li class="animatedLi fadeUp"><h2>' + message.user + ': </h2><br><p>' + newHTML + '</p></li>')

  	});

	var qID = $(".questionID").val();
	var discID = $(".discussionID").val();
	var user = $(".username").val();
	var quID = {"questionID": qID, "username": user, "discID": discID};
  	socket.emit('commentlijst', quID);
  	console.log(quID);

  	socket.on('commentstart', function(comments){
  		console.log(comments);
		for(var i = 0; i < comments.length; i++)
		{

			var newHTML  = replaceWithImgLinks(comments[i].comment);

			function replaceWithImgLinks(txt) {
			    var linkRegex = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(?:jpg|jpeg|gif|png))/gi;
			        
			    var replacement = '<a href="$1" target="_blank"><img class="sml" src="$1" /></a><br />';
			    return txt.replace(linkRegex , replacement);
			}

			$('.comments__list').append('<li class="animatedLi fadeUp"><h2>' + comments[i].user + ': </h2><br><p>' + newHTML +'</p></li>');
		}
	})
});
