/*
 * Copyright 2014 Jason Rice
 */
(function() {

var Games = {
	command: (server, command, value)
	{
		this._command(server, command, value);
		//notify listener
		this._commandListener.call(this, command, value);
	},
	_setCommandListener: function(fn)
	{
		this._commandListener = fn;
	}
}

window.Games = Games;
});
