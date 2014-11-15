/*
 * Copyright 2014 Jason Rice
 */
var x = 'x';
var y = 'o';

games.push(new Game({}));
games.push(new Game({
	innerGames: [ x, x, x ]
	}));

games.push(new Game({
	innerGames: [	x, y, x, 
					0, y, 0, 
					x, y, x]
	});

games.push(new Game({
	innerGames: [	y, x, x, 
					0, 0, 0, 
					0, 0, 0]
	}));

games.push(new Game({
	innerGames: [	y, 0, x, 
					0, y, x, 
					0, 0, y]
	}));

games.push(new Game({
	innerGames: [	x, y, x, 
					0, y, x, 
					0, x, y]
	});

games.push(new Game({
	innerGames: [	0, 0, 0, 
					0, 0, 0, 
					0, 0, 0]
	}));

games.push(new Game({
	innerGames: [	0, games[0], games[0], 
					0, games[1], games[2], 
					0, games[3], games[0]]
	}));
