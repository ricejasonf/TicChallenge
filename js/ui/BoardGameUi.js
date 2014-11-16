/*
 * Copyright 2014 Jason Rice
 */
(function(GameUis) {
	
var BoardGameUi = function(options)
{
	this.server = options.server;
	this.gameUiManager = options.gameUiManager;
	this.game = options.game;
	this.width = options.width;

	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.width;
	this.ctx = this.canvas.getContext('2d');
}
GameUis.BoardGame = BoardGameUi;

BoardGameUi.prototype = {

	render: GameUis.render,
	_render: function()
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
		ctx.stroke();
	},
	renderInnerGame: function(i)
	{
		var gameUi = this.getInnerGameUi(i);
		var w = Math.floor(this.width / 3);
		
		gameUi.render();
		this.ctx.drawImage(gameUi.canvas, 
				w * (i % 3), 
				w * Math.floor(i / 3), 
				w, w);	
	},

	click: function(x, y)
	{
		this.openGameByClick(x, y);
	},

	openGameByClick: function(x, y)
	{
		var gameUi = this.getInnerGameUiByPos(x, y);
		this.server.command('open', gameUi.game);
	},

	getInnerGameUiByPos: function(x, y)
	{
		var w = this.width;
		var i = Math.floor(y / w) * 30 
			+ Math.floor(x / w) * 10;
		if (i > 8)
			throw "Index is invalid... check your math.";
		return this.getInnerGameUi(i);
	},

	getInnerGameUi: function(i)
	{
		return this.gameUiManager.getGameUiByGame(this.game.games[i]);
	}
}

})(window.GameUis);
