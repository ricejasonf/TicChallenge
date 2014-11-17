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
	padding:0,

	initCanvas: GameUis.initCanvas,
	render: GameUis.render,
	_render: function(ctx)
	{
		for (var i = 0; i < 9; i++)
			this.renderInnerGame(i, ctx);
		this.renderGrid(ctx);
	},

	renderGrid: function(ctx)
	{
		var w = this.width / 3;
		var p = this.padding;
		var end = this.width - p;
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
	renderInnerGame: function(i, ctx)
	{
		var padding = this.padding * 1.5;
		var p = padding / 2;
		var gameUi = this.getInnerGameUi(i);
		var w = this.width / 3;
		var x = w * Math.floor(i % 3) + p;
		var y = w * Math.floor(i / 3) + p;

		//translate context
		ctx.save();
		ctx.translate(x, y);	
		ctx.scale(.3333, .3333);
		gameUi.render(ctx);
		ctx.restore();
	},

	click: function(x, y)
	{
		this.openGameByClick(x, y);
	},

	openGameByClick: function(x, y)
	{
		var gameUi = this.getInnerGameUiByPos(x, y);
		if (this.innerGameClick(gameUi, x, y))
			this.server.command('open', gameUi.game);
	},

	innerGameClick: function(gameUi, x, y)
	{
		if (!gameUi.click)
			return true;
		var padding = this.padding * 1.5;
		var p = padding / 2;
		var w = this.width / 3;
		//account for padding :[]
		if (x % w < p)
			return false;
		else if (x % w > w - p)
			return false;
		if (y % w < p)
			return false;
		else if (y % w > w - p)
			return false;
		x -= Math.floor(x / w) * w + p;
		y -= Math.floor(y / w) * w + p;
		x *= 3;
		y *= 3;
		gameUi.click(x, y);
		return true;
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
