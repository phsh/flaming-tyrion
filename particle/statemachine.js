function StateMachine(){
	this.state = 0;
	this.previousState = -1;
}

StateMachine.prototype.getState = function(){
	return this.state;
}

getPreviousState = function(){
	return this.previousState;
}

StateMachine.prototype.setState = function(newState){
	this.previousState = this.state;
	this.state = newState;
}

module.exports.StateMachine = StateMachine;