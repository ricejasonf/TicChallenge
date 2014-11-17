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
	this.initCanvas();

}
GameUis.BoardGame = BoardGameUi;

BoardGameUi.prototype = {
	padding:25,

	initCanvas: GameUis.initCanvas,
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
		var p = this.padding;
		var end = this.width - p;
		var ctx = this.ctx;
		ctx.save();
		ctx.lineWidth = 10;
		ctx.lineCap = 'round';
		ctx.beginPath();
		ctx.moveTo(w, p);
		ctx.lineTo(w, end);
		ctx.moveTo(w*2, p);
		ctx.lineTo(w*2, end);
		ctx.moveTo(p, w);
		ctx.lineTo(end, w);
		ctx.moveTo(p, w*2);
		ctx.lineTo(end, w*2);
		ctx.stroke();
		ctx.restore();
	},
	renderInnerGame: function(i)
	{
		var padding = Math.floor(this.padding * 1.5);
		var p = Math.floor(padding / 2);
		var gameUi = this.getInnerGameUi(i);
		var w = Math.floor(this.width / 3);
		var x = w * (i % 3) + p;
		var y = w * Math.floor(i / 3) + p
		w -= padding;
		
		gameUi.render();
		this.ctx.drawImage(gameUi.canvas, 
				x, y,
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
		var i = Math.floor(3 * (y / w)) * 3
			+ Math.floor(3 * (x / w));
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
