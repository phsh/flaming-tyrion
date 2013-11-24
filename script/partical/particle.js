var random = require('./random').random;
var randomInt = require('./random').randomInt;
var get_random_color = require('./random').get_random_color;
var gameAreaHeight=600;
var gameAreaWidth= 1200;
var gameAreaZ = 100;
var ballSize = 35; 
var bounceIndex=0.75;
var gravity = 0.15;
var canvas = document.createElement('canvas');
var bounce = false;
var enable_bounce = true;
var timeDelayCounter = 0;
var color  = get_random_color();
var xSpeed = getNewXSpeed();
var xStart = (gameAreaWidth/4);
var ySpeed = getNewYSpeed();
var particleCount = 100;
var particles  = new Array();
canvas.height=gameAreaHeight;
canvas.width=gameAreaWidth;
document.body.appendChild(canvas);

var context = canvas.getContext('2d');

function StateMachine(){
	this.state = 0;
	this.previousState = -1;
}
StateMachine.prototype.getState = function(){
	return this.state;
}
StateMachine.prototype.getPreviousState = function(){
	return this.previousState;
}
StateMachine.prototype.setState = function(newState){
	this.previousState = this.state;
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
	return random(-55,-25);
}
function getNewXSpeed(){
	return random(-30,30);
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
	var debugLineValue = gameAreaHeight;
	if( stateMachine.getState()===1 || stateMachine.getState() === 4){
		debugLineValue = (gameAreaHeight-ballSize-10);
	}
	if( stateMachine.getState() === 11){
		debugLineValue = (gameAreaHeight/2);
	}
//	var debugLineValue = (timeDelayCounter>10)?(gameAreaHeight-ballSize-10):gameAreaHeight;
	
	if(baselineCount > particles.length*debugLineValue){
		if(stateMachine.getState()===1){
			stateMachine.setState(2);
		}
		if(stateMachine.getState()===4){
			stateMachine.setState(18);
		}
		if(stateMachine.getState()===11){
			stateMachine.setState(8);
		}
		
		
	}
	console.log(stateMachine.state);
	
	if(stateMachine.getState() === 0 || stateMachine.getState() === 10){
		if(timeDelayCounter % 8 == 0){
			
			if(particles.length % 5 === 0) {
				color = get_random_color();
				xStart += ballSize;
			}
			if(particles.length % 20 === 0) xSpeed = getNewXSpeed();
			
			var p = new Particle( gameAreaWidth/2, gameAreaHeight-ballSize, xSpeed, ySpeed ,color);
			particles[particles.length] = p
			timeDelayCounter=0;
		}
	}
	
	if(stateMachine.getState() === 123456){
		timeDelayCounter=0;
		particles = new Array();
		color = get_random_color();
		ySpeed = getNewYSpeed();
		stateMachine.setState(0);
	}
	
	if(stateMachine.getState() === 2 || stateMachine.getState() == 18){
		var xSpeedNew = -12;
		var ySpeedNew =  -45;
		var xStartNew = 100;
		var yStartNew = 100;
		for(i=0; i<particles.length; i++){
			if(i % 5 === 0) {
				xSpeedNew = getNewXSpeed();
				ySpeedNew = getNewYSpeed();
				xStartNew = random(ballSize*4,gameAreaWidth-(ballSize*4));
				yStartNew = random(ballSize*4,gameAreaHeight-(ballSize*4))
			}
			var index_i = i % 5;
			particles[i].ySpeed = xSpeedNew 
			particles[i].xSpeed = ySpeedNew - (gravity * index_i) ;
			particles[i].y = yStartNew - (xSpeed*index_i) ;
			particles[i].x = xStartNew - (ySpeed*index_i);
		}
		timeDelayCounter=0;
		
		if(stateMachine.getState()===2) stateMachine.setState(4);
		if(stateMachine.getState()===18) stateMachine.setState(7);
	}
	
	if(particleCount <= particles.length){
		if(stateMachine.getState()===0) stateMachine.setState(1);
		if(stateMachine.getState()===10) stateMachine.setState(11);
	}
	
	if(stateMachine.getState()===7){
		if(timeDelayCounter % 4 == 0){
			particles.pop();
		}
	}
	if(stateMachine.getState()===8){
		if(timeDelayCounter % 4 == 0){
			particles.shift();
		}
	}
	
	
	if(particles.length < 1){
		if(stateMachine.getState()=== 7){
			stateMachine.setState(10);
		}
		if(stateMachine.getState()===8){
			stateMachine.setState(0);
		}
		
		
	}
	debugLine(baselineCount,debugLineValue,context);
}

myTimer();