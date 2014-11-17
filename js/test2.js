(function () {
/*
 * Copyright 2014 Jason Rice
 */
var createGame = function() { return new Games.BoardGame({}) };
var createDeepGame = function(layers)
{
	if (layers > 3)
		layers = 3;
	if (layers < 1)
		return null;
	var f = layers > 0 
		? function() { return createDeepGame(layers - 1) }
		: createGame;
	return new Games.BoardGame({
		innerGames: [	f(), f(), f(), 
						f(), f(), f(), 
						f(), f(), f()]
	});
}
var server = new GameServer({
	game: createDeepGame(2),
	finish: function(result) 
	{
		if (result == 'stalemate')
			alert('DRAW');
		else 
			alert(result + ' wins!');
	},
	openGame: function(game)
	{
		gameCanvas.render();		
	}
});

var gameUis = new GameUis({
	server: server,
	width: 800
});
gameCanvas = new GameCanvas('my-canvas', server, gameUis); 
server.startGame();


})();
