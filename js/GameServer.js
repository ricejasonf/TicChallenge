/*
 * Copyright 2014 Jason Rice
 */
(function() {

var GameServer = function(options)
{
	this.game = options.game;	
	this.openGameFn = options.openGame;
	this.players = options.players 
		|| [ 'Player 1', 'Player 2'];
	this.callbacks = {
		finish: options.finish
	}
	this.gameIndex = [];
	this.createGameIndex(this.game);
}

GameServer.prototype = {
	currentPlayerIndex: 0,
	currentGame: null,
	gameExpectingAnswer: null,
	acceptingCommands: true, //for animations or net based multiplayer

	command: function(command, value, success)
	{
		if (!this.acceptingCommands)
			return;
		this.acceptingCommands = false;
		if (!this.expectingAnswer && command == 'open')		
			this.setCurrentGame(value);
		if (!this.currentGame)
			throw "GameServer command malformed";
		var self = this;
		var oldSuccess = success;
		var newSuccess = function() {
			self.acceptingCommands = true;
			if (success)
				success.call(self);
		}
		this.processGameCommand(command, value, newSuccess);
	},
	//intended as a template method
	processGameCommand: function(command, value, success)
	{
		//do not use call here
		this.currentGame._command(this, command, value);
		success.call(this);
	},

	expectAnswer: function()
	{
		this.expectingAnswer = true;
	},

	awardState: function()
	{
		this.currentGame.state = this.currentPlayerIndex;
		this.endTurn();
	},

	endTurn: function()
	{
		var state = this.game.checkState();
		if (state !== null)
			this.finish(state);
		this.expectingAnswer = null;
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) 
			% this.players.length;
		this.command('open', this.game);
	},

	finish: function(state)
	{
		var player = state != 'stalemate' ? this.players[state] : 'stalemate';
		options.finish.call(this, player);
	},

	createGameIndex: function(game)
	{
		this.gameIndex.push(game);
		if (!game.innerGames)
			return;
		for (var i = 0; i < game.innerGames.length; i++)
			this.createGameIndex(game.innerGames[i]);
	},

	setCurrentGame: function(game)
	{
		this.currentGame = game;
		this.openGameFn.call(this, game);
	}
}

})();
