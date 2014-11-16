/*
 * Copyright 2014 Jason Rice
 */
(function(Games) {

var BoardGame = function(options)
{
	this.initGame(options.innerGames
		|| [null, null, null,
			null, null, null,
			null, null, null]);
}
Games.BoardGame = BoardGame;

/*
 * LeafGame is just the default game where
 * the first player to open it wins
 */
var LeafGame = function(state)
{
	this.state = state;
}

BoardGame.prototype = {
	type: 'BoardGame',
	command: Games.command,
	setCommandListener: Games.setCommandListener,
	state:null,

	_command: function(server, command, value)
	{
		//do nothing??
	},

	createInnerGame: function(gameData)
	{
		if (gameData == null)
			return new LeafGame(gameData);
		return new BoardGame(gameData);
	},

	initGame: function(innerGames)
	{
		this.games = [];
		for (var i = 0; i < 9; i++)
		{
			this.games.push(this.createInnerGame(innerGames[i]));
		}	
		this.checkState();
	},

	checkState: function()
	{
		if (this.state != null)
			return this.state;
		var states = [];
		var nullCount = 0;
		for (var i = 0; i < 9; i++)
		{
			states.push(this.games[i].checkState());
			if (states[i] != null)
			{
				//lateral check
				if ((i % 3 == 2 && (states[i] == states[i - 1] 
					&& states[i] == states[i - 2])
					//diagonal from bottom right
					|| (i == 8
						&& states[8] == states[4]
						&& states[8] == states[0]))
					//up and down
					|| (i > 5 
						&& states[i] == states[i - 3]
						&& states[i] == states[i - 6])
					//diagonal from bottom left
					|| (i == 6
						&& states[6] == states[4]
						&& states[6] == states[2])
				   )
				{
					this.state = states[i];
					return this.state;
				} 
			}
			else nullCount++;
		}
		if (nullCount == 0)
			this.state = 'stalemate';

		return this.state;
	}
}

LeafGame.prototype = {
	type: 'LeafGame',
	command: Games.command,
	setCommandListener: Games.setCommandListener,
	state:null,

	checkState: function()
	{
		return this.state;
	},

	_command: function(server, command, value)
	{
		switch(command)
		{
			case 'open':
				server.awardState();
		}
	}
}

})(window.Games);
