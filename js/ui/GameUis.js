/*
 * Copyright 2014 Jason Rice
 */
(function() {
var playerSymbols = [
	'x',	
	'o'
];
var playerColors = [
	"#009987",
	"#990012"
];

var GameUis = function(options)
{
	this.server = options.server;
	this.width = options.width;

	this.index = {};

}
window.GameUis = GameUis;

GameUis.initCanvas = function()
{

}

GameUis.render = function(ctx)
{
	ctx.save();
	ctx.clearRect(0, 0, this.width, this.width);
	if (this.game.state == null)
	{
		this._render(ctx);
		ctx.restore();
		return;
	}
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	var text;
	if (this.game.state == 'stalemate')
	{
		ctx.font = Math.floor(this.width / 4) + "px Helvetica";
		text = 'DRAW';
	}
	else
	{
		ctx.fillStyle=playerColors[this.game.state];
		text = playerSymbols[this.game.state]; 
		ctx.font = Math.floor(this.width) + "px Helvetica";
	}

	ctx.fillText(text, this.width / 2, this.width / 2);
	ctx.restore();
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
