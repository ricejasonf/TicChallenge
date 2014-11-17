/*
 * Copyright 2014 Jason Rice
 */
(function() {
var playerSymbols = [
	'x',	
	'o'
];
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var GameUis = function(options)
{
	this.server = options.server;
	this.width = options.width;
	canvas.width = this.width;
	canvas.height = this.width;

	this.index = {};

}
window.GameUis = GameUis;

GameUis.initCanvas = function()
{
	this.canvas = canvas;
	this.ctx = ctx;
}

GameUis.render = function()
{
	this.ctx.save();
	this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	//this.ctx.clearRect(0, 0, this.width, this.width);
	if (this.game.state == null)
	{
		this._render();
		this.ctx.restore();
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
	this.ctx.restore();
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
