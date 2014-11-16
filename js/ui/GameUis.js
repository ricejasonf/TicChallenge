/*
 * Copyright 2014 Jason Rice
 */
(function() {
var playerSymbols = [
	'x',	
	'o'
];

var GameUis = function(options)
{
	this.server = options.server;
	this.width = options.width;

	this.index = {};
}
window.GameUis = GameUis;

GameUis.render = function()
{
	this.ctx.save();
	this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	this.ctx.clearRect(0, 0, this.width, this.width);
	this.ctx.restore();
	if (this.game.state == null)
	{
		this._render();
		return;
	}
	this.ctx.textAlign = 'center';
	this.ctx.textBaseline = 'middle';
	var text;
	if (this.game.state == 'stalemate')
	{
		this.ctx.font = Math.floor(this.width / 2) + "px Helvetica";
		text = 'DRAW';
	}
	else
	{
		text = playerSymbols[this.game.state]; 
		this.ctx.font = Math.floor(this.width) + "px Helvetica";
	}

	this.ctx.fillText(text, this.width / 2, this.width / 2);

}

GameUis.prototype = {
	getGameUiByGame: function(game)
	{
		var i = this.server.gameIndex.indexOf(game);
		if (!this.index[i])
			this.index[i] = this.createGameUi(game);
		return this.index[i];
	},

	createGameUi: function(game)
	{
		var options = {};
		options.server = this.server;
		options.width = this.width;
		options.game = game;
		options.gameUiManager = this;
		return new GameUis[game.type](options);
	}
}

})();
