var random = require('./random').random;
var randomInt = require('./random').randomInt;

var canvas = document.createElement('canvas');
var gameAreaHeight=400;
var gameAreaWidth= 1200;
canvas.height=gameAreaHeight;
canvas.width=gameAreaWidth;

document.body.appendChild(canvas);

var context = canvas.getContext('2d');

function Particle(init_x,init_y, xSpeed, ySpeed){
	this.x = init_x;
	this.y = init_y;
	this.weight = 100;
	this.xP = 10;
	this.yP = 10;
	
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.fillColor = 'rgba( 0 , 0, 255, 1.0 )';
	this.alpha = 1.0;
}

Particle.prototype.update = function(){
	this.x = this.x + this.xSpeed;
	this.y = this.y + this.ySpeed;
	this.ySpeed = this.ySpeed + 0.1;
	if (this.y > (gameAreaHeight-5)) {
		this.ySpeed = -this.ySpeed;
		this.ySpeed = 0.65 * this.ySpeed;
		this.y = gameAreaHeight-5;
	}
	
	if (this.y < 0) {
		this.ySpeed = -this.ySpeed;
		
	}
	if (this.x > canvas.width){
		this.xSpeed = -this.xSpeed;
		this.alpha = this.alpha - 0.1;
	}
	if (this.x < 0){
		this.xSpeed = -this.xSpeed;
		this.alpha = this.alpha - 0.1;
	}
	if(this.alpha < 0) this.alpha = 1.0;
	this.fillColor='rgba( 0 , 0, 255, '+this.alpha+' )';
}

Particle.prototype.drawCircle = function(context){
	context.beginPath();
	context.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
	context.fillStyle = this.fillColor;
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = '#FFFFFF';
	context.stroke();
	
}
function debugLine(count,debugLineValue,context){
	context.fillStyle="#FF0000";
	var whereAreTheBalls = (count/250);
	context.fillRect(0,whereAreTheBalls,gameAreaWidth,1);
	context.fillStyle="#00FF00";
	context.fillRect(0,debugLineValue,gameAreaWidth,1);
}

var particles  = {};
for(i=0; i<250; i++){
	var p = new Particle(gameAreaWidth/2, gameAreaHeight, random(-10,10), random(-15,-5));
	particles[i] = p;
	
}

myTimer();
var startColor = 1.0;

function myTimer(){
	window.requestAnimationFrame(myTimer);
	context.clearRect(0,0,gameAreaWidth,gameAreaHeight);
	var count = 0;
	for(i=0; i<250; i++){
		count += particles[i].y;
		particles[i].drawCircle(canvas.getContext('2d'));
		particles[i].update();
		
	}
	var debugLineValue = (gameAreaHeight-30);
	if(count > 250*debugLineValue){
		
		for(i=0; i<250; i++){
			particles[i].ySpeed = random(-15,-5);
		}
	}
	debugLine(count,debugLineValue,context);
}
