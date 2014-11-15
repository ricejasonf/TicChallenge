/*
 * Copyright 2014 Jason Rice
 */
(function(Games) {

var Arithmetic = function(options)
{
	this.state = options.state;
	this.problem = options.problem;	
}
Games.Arithmetic = Arithmetic;

Arithmetic.prototype = {
	type: 'Arithmetic',
	command: Games.command,
	setCommandListener: Games.setCommandListener,

	checkState: function()
	{
		return this.state;
	},

	_command: function(server, command, value)
	{
		switch(command)
		{
			case 'open': 
				//the user is locked in to answering
				server.expectAnswer();
				break;
			case 'answer':
				if (value == this.answer(value))
					this.state = server.awardState();
				else
					server.endTurn();
				break;
			default:
				server.endTurn();
		}
	},

	answer: function(value)
	{
		var expectOp = false;
		var answer = this.getNum(0);
		for (var i = 1; i < this.problem.length; i++)
		{
			answer = this.performOp(answer, this.problem[i], this.getNum(i + 1));
		}
		return answer;
	},

	getNum: function(i)
	{
		if (parseInt(this.problem[i]) != this.problem[i])
			throw "Arithmetic problem malformed (not int)";
		return this.problem[i];
	},

	performOp: function(v1, op, v2)
	{
		switch(op)
		{
			case '+':
				return v1 + v2;
			case '-':
				return v1 - v2;
			case '*':
				return v1 * v2;
			case '/':
				return v1 / v2;
			case '%':
				return v1 % v2;
			case '+':
				return v1 + v2;
		}
		throw "Arithmetic problem malformed (invalid op)";
	}
}

})(window.Games);
