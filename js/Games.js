/*
 * Copyright 2014 Jason Rice
 */
(function() {

var Games = {
	command: function(server, command, value)
	{
		this._command(server, command, value);
		//notify listener
		this._commandListener.call(this, command, value);
	},
	setCommandListener: function(fn)
	{
		this._commandListener = fn;
	}
}

window.Games = Games;
})();
