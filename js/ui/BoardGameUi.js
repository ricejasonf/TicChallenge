/*
 * Copyright 2014 Jason Rice
 */
window.GameUis = {};
(function() {
	
var BoardGameUi = function(options)
{
	this.server = options;
	this.game = options.game;
	this.width = options.width;
	this.innerGameUis = [	null, null, null,
							null, null, null,
							null, null, null];
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.width;
	this.ctx = this.canvas.getContext('2d');
}
window.GameUis.BoardGame = BoardGameUi;

BoardGameUi.prototype = {

	render: function()
	{
		this.renderGrid();
		for (var i = 0; i < 9; i++)
			this.renderInnerGame(i);
	},

	renderGrid: function()
	{
		var w = Math.floor(this.width / 3);
		var end = this.width - 5;
		var ctx = this.ctx;
		ctx.beginPath();
		ctx.moveTo(w, 5);
		ctx.lineTo(w, end);
		ctx.moveTo(w*2, 5);
		ctx.lineTo(w*2, end);
		ctx.moveTo(5, w);
		ctx.lineTo(end, w);
		ctx.moveTo(5, w*2);
		ctx.lineTo(end, w*2);
		ctx.ctx.stroke();
	},
	renderInnerGame: function(i)
	{
		var gameUi = this.getInnerGameUi(i);
		var w = Math.floor(this.width / 3);
		gameUi.render();
		this.ctx.drawImage(gameUi.canvas, x, y, w, h);	
	},

	click: function(x, y)
	{
		if (this.currentInnerGameUi)
			this.currentInnerGameUi.click(x, y);
		else
			this.openGameByClick(x, y);
	},

	openGameByClick: function(x, y)
	{
		var gameUi = this.getInnerGameUiByPos(x, y);
		this.currentInnerGameUi = gameUi;
		this.server.command('open', gameUi.game);
	},

	getInnerGameUiByPos: function(x, y)
	{
		var w = this.width * 10;
		var i = Math.floor(w / y) * 3 
			+ Math.floor(w / x);
		return this.getInnerGameUi(i);
	},

	getInnerGameUi: function(i)
	{
		if (!this.innerGameUis[i])
		{
			this.innerGameUis[i] 
				= this.createGameUi(this.game.innerGames[i]);
		}
		return this.innerGameUis[i];
	},

	createInnerGameUi: function(game)
	{
		var options = {};
		options.server = this.server;
		options.game = this.game;
		options.width = this.width;
		return window.GameUis[game.type](options);
	}
}

})();
