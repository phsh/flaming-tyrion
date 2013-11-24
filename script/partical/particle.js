var random = require('./random').random;
var randomInt = require('./random').randomInt;
var get_random_color = require('./random').get_random_color;
var gameAreaHeight=600;
var gameAreaWidth= 1200;
var gameAreaZ = 100;
var ballSize = 35; 
var bounceIndex=0.75;
var gravity = 0.20;
var canvas = document.createElement('canvas');
var bounce = false;
var enable_bounce = true;
var timeDelayCounter = 0;
var color  = get_random_color();
var xSpeed = getNewXSpeed();
var ySpeed = getNewYSpeed();
var particleCount = 30;
var particles  = new Array();
canvas.height=gameAreaHeight;
canvas.width=gameAreaWidth;
document.body.appendChild(canvas);

var context = canvas.getContext('2d');


function StateMachine(){
	this.state = 0;
}
StateMachine.prototype.getState = function(){
	return this.state;
}

StateMachine.prototype.setState = function(newState){
	this.state = newState;
}

var stateMachine = new StateMachine();

function Particle(init_x,init_y, xSpeed, ySpeed,color){
	this.x = init_x;
	this.y = init_y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.fillColor = color;
	this.radie = ballSize;
}

Particle.prototype.update = function(){
	this.x = this.x + this.xSpeed;
	this.y = this.y + this.ySpeed;
	this.ySpeed = this.ySpeed + gravity;
	if (this.y > (gameAreaHeight-this.radie ) ) {
		this.ySpeed = -this.ySpeed;
		this.ySpeed = bounceIndex * this.ySpeed;
		this.y = gameAreaHeight - this.radie;
	}
	if (this.y < this.radie) {
		if(this.ySpeed < 0) {
			this.ySpeed = -this.ySpeed;
			this.ySpeed = bounceIndex * this.ySpeed;
		}
	}
	if (this.x > (gameAreaWidth-this.radie)){
			this.xSpeed = -Math.abs(this.xSpeed);
	}
	
	if (this.x < this.radie){
		this.xSpeed = Math.abs(this.xSpeed);
	}
	
}

Particle.prototype.drawCircle = function(context){
	context.beginPath();
	context.arc(this.x, this.y, this.radie, 0, 2 * Math.PI, false);
	context.fillStyle = this.fillColor;
	context.fill();
	context.lineWidth =3;
	context.strokeStyle = '#000000';
	context.stroke();
	
}

function debugLine(count,debugLineValue,context){
	context.fillStyle="#FF0000";
	var whereAreTheBalls = (count/particleCount);
	context.fillRect(0,whereAreTheBalls,gameAreaWidth,1);
	context.fillStyle="#00FF00";
	context.fillRect(0,debugLineValue,gameAreaWidth,1);
}


function getNewYSpeed(){
	return random(-45,-25);
}
function getNewXSpeed(){
	return random(-15,15);
}

function myTimer(){
	window.requestAnimationFrame(myTimer);
	context.clearRect(0,0,gameAreaWidth,gameAreaHeight);
	var baselineCount = 0;
	timeDelayCounter++;

	for(i=0; i<particles.length; i++){
		baselineCount += particles[i].y;
		particles[i].drawCircle(context);
		particles[i].update();
		
	}
	var debugLineValue = (timeDelayCounter>10)?(gameAreaHeight-40):gameAreaHeight;
	
	if(baselineCount > particles.length*debugLineValue){
		if(stateMachine.getState()===4) stateMachine.setState(3);
		else stateMachine.setState(2);
	}
	console.log(stateMachine.state);
	
	if(stateMachine.getState() === 0){
		if(timeDelayCounter % 8 == 0){
			if(particles.length % 10 === 0) color = get_random_color();
			if(particles.length % 30 === 0) xSpeed = getNewXSpeed();
			var p = new Particle(gameAreaWidth/2, gameAreaHeight-ballSize, xSpeed, ySpeed ,color);
			particles[particles.length] = p
			if(particleCount===particles.length) bounce=true;
			timeDelayCounter=0;
		}
	}
	
	if(stateMachine.getState() === 3){
		timeDelayCounter=0;
		particles = new Array();
		color = get_random_color();
		ySpeed = getNewYSpeed();
		stateMachine.setState(0);
	}
	
	if(stateMachine.getState() === 2){
		for(i=0; i<particles.length; i++){
			particles[i].ySpeed = -45+ ((i/particles.length)*particles.length);
		}
		timeDelayCounter=0;
		stateMachine.setState(4);
	}
	
	if(particleCount <= particles.length){
		if(stateMachine.getState()===0)stateMachine.setState(1);
	}
	
	debugLine(baselineCount,debugLineValue,context);
}

myTimer();