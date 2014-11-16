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
window.GameServer = GameServer;

GameServer.prototype = {
	currentPlayerIndex: 0,
	currentGame: null,
	gameExpectingAnswer: null,
	acceptingCommands: true, //for animations or net based multiplayer

	startGame: function()
	{
		this.command('open', this.game);
	},

	command: function(command, value, success)
	{
		if (!this.acceptingCommands)
			return;
		if (command == 'open' && value.state != null)
			return;
		this.acceptingCommands = false;
		if (!this.expectingAnswer && command == 'open')		
			this.setCurrentGame(value);
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
		this.acceptingCommands = true;
		this.expectingAnswer = null;
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) 
			% this.players.length;
		this.command('open', this.game);
	},

	finish: function(state)
	{
		var player = state != 'stalemate' ? this.players[state] : 'stalemate';
		this.callbacks.finish.call(this, player);
	},

	createGameIndex: function(game)
	{
		this.gameIndex.push(game);
		if (!game.games)
			return;
		for (var i = 0; i < game.games.length; i++)
			this.createGameIndex(game.games[i]);
	},

	setCurrentGame: function(game)
	{
		this.currentGame = game;
		this.openGameFn.call(this, game);
	}
}

})();
