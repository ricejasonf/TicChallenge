/*
 * Copyright 2014 Jason Rice
 */
(function() {

var GameCanvas = function(canvasId, gameServer, gameUis)
{
	var self = this;
	this.gameServer = gameServer;
	this.gameUis = gameUis;
	this.canvas = document.getElementById(canvasId);
	this.canvas.addEventListener("mousedown", function(ev) {
		self.click(ev);
	});
	this.ctx = this.canvas.getContext('2d');
}
window.GameCanvas = GameCanvas;

GameCanvas.prototype = {
	render: function()
	{
		var ui = this.gameUis
			.getGameUiByGame(this.gameServer.currentGame);
		this.ctx.drawImage(ui.canvas, 0, 0);
	},

	click: function(ev)
	{
		var pos = this.getRelativeMousePosition(ev);
		var ui = this.gameUis
			.getGameUiByGame(this.gameServer.currentGame);
		ui.click(pos.x, pos.y);
	},

	getRelativeMousePosition: function(event)
	{
		var totalOffsetX = 0;
		var totalOffsetY = 0;
		var canvasX = 0;
		var canvasY = 0;
		var currentElement = this.canvas;

		do
		{
			totalOffsetX += currentElement.offsetLeft;
			totalOffsetY += currentElement.offsetTop;
		}
		while(currentElement = currentElement.offsetParent);

		canvasX = event.pageX - totalOffsetX;
		canvasY = event.pageY - totalOffsetY;

		return {
			x: canvasX,
			y: canvasY
		}

	}

}

})();
