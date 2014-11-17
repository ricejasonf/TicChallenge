/*
 * Copyright 2014 Jason Rice
 */
(function(GameUis) {

var LeafGameUi = function(options)
{
	this.server = options.server;
	this.game = options.game;
	this.width = options.width;
	this.initCanvas();
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.width;
	this.ctx = this.canvas.getContext('2d');
}
GameUis.LeafGame = LeafGameUi;

LeafGameUi.prototype = {
	initCanvas: GameUis.initCanvas,
	render: GameUis.render,
	_render: function(ctx) 
	{ 
	}
}

})(window.GameUis);
