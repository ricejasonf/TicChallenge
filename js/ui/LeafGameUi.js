/*
 * Copyright 2014 Jason Rice
 */
window.GameUis = {};
(function() {

var LeafGameUi = function(options)
{
	this.server = options;
	this.game = options.game;
	this.width = options.width;
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.width;
	this.canvas.height = this.width;
	this.ctx = this.canvas.getContext('2d');
}
window.GameUis.LeafGame = LeafGameUi;

LeafGameUi.prototype = {
	render: GameUis.render,
	_render: function() { }
}

})();
