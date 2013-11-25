function TimeState(){
	this.timeCounter = 0;
}

TimeState.prototype.getCounter = function(){
	return this.timeCounter;
}

TimeState.prototype.reset = function(){
	this.timeCounter = 0;
}

TimeState.prototype.count = function(){
	this.timeCounter++;
}

module.exports.TimeState = TimeState;