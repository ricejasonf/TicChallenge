/*
 * Copyright 2014 Jason Rice
 */
window.GameUis = {};
(function() {

var playerSymbols = [
	'x',	
	'o'
];
	
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

	render: function()
	{

	},

	click: function(x, y)
	{
		if (this.currentInnerGameUi)
			this.currentInnerGameUi.click(x, y);
		else
			this.openGameByClick(x, y);
	}
}

})();
