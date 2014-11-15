/*
 * Copyright 2014 Jason Rice
 */
(function() {

var GameServer = function(options)
{
	this.games = options.game;	
	this.players = options.players;
	this.callbacks = {
		finish: options.finish
	}
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
			this.currentGame = value;
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

	awardState: function(game)
	{
		this.currentGame.state = this.currentPlayerIndex;

		var state = this.game.checkState();
		if (state !== null)
			this.finish(state);
		else
			this.endTurn();
	},

	endTurn: function()
	{
		this.expectingAnswer = null;
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) 
			% this.players.length;
		this.command('open', this.game);
	},

	finish: function(state)
	{
		var player = state != 'stalemate' ? this.players[state] : 'stalemate';
		options.finish.call(this, player);
	}
	
}

})();
