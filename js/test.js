(function () {
/*
 * Copyright 2014 Jason Rice
 */
var x = 0;
var y = 1;
var n = null;

var games = [];
games.push(new Games.BoardGame({}));
games.push(new Games.BoardGame({
	innerGames: [ x, x, x ]
	}));

games.push(new Games.BoardGame({
	innerGames: [	x, y, x, 
					n, y, n, 
					x, y, x]
	}));

games.push(new Games.BoardGame({
	innerGames: [	y, x, x, 
					n, n, n, 
					n, n, n]
	}));

games.push(new Games.BoardGame({
	innerGames: [	y, n, x, 
					n, y, x, 
					n, n, y]
	}));

games.push(new Games.BoardGame({
	innerGames: [	x, y, x, 
					n, y, x, 
					n, x, y]
	}));

games.push(new Games.BoardGame({
	innerGames: [	n, n, n, 
					n, n, n, 
					n, n, n]
	}));

var gameCanvas;
games.push(new Games.BoardGame({
	innerGames: [	n, games[0], games[1], 
					n, games[2], games[3], 
					games[6], games[4], games[5]]
	}));
var server = new GameServer({
	game: games[7],
	finish: function(result) 
	{
		if (result = 'stalemate')
			alert('DRAW');
		else 
			alert(result + ' wins!');
	},
	openGame: function()
	{
		gameCanvas.render();		
	}
});

var gameUis = new GameUis({
	server: server,
	width: 800
});
gameCanvas = new GameCanvas('my-canvas', server, gameUis); 


})();
