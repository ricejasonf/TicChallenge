/*
 * Copyright 2014 Jason Rice
 */
(function() {

var GameCanvas = function(canvasId, gameServer)
{
	this.gameServer = gameServer;
	this.canvas = document.getElementById(canvasId);
	this.canvas.addEventListener("mousedown", function(ev) {
		self.click(ev);
	});
	this.buildGameRefs();
}
window.GameCanvas = GameCanvas;

GameCanvas.prototype = {
	click: function(ev)
	{
		var pos = this.getRelativeMousePosition(ev);
		if (this.gameServer.currentGame)
			this.gameServer.currentGame.click(pos.x, pos.y);
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
