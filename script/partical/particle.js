var random = require('./random').random;
var randomInt = require('./random').randomInt;
console.log(window.innerWidth);
console.log(window.innerHeight);
var gameAreaHeight=600;
var gameAreaWidth= 1200;
var gameAreaZ = 100;
var ballSize = 35; 
var bounceIndex=0.85;
var gravity = 0.10;
var canvas = document.createElement('canvas');
canvas.height=gameAreaHeight;
canvas.width=gameAreaWidth;
document.body.appendChild(canvas);

var particleCount = 100;

var context = canvas.getContext('2d');

function Particle(init_x,init_y, xSpeed, ySpeed,color){
	this.x = init_x;
	this.y = init_y;
	this.z = 50;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.zSpeed = random(-1,1);
	this.fillColor = color;
	this.radie = ballSize;
}

Particle.prototype.update = function(){
	this.x = this.x + this.xSpeed;
	this.y = this.y + this.ySpeed;
	this.z = this.z + this.zSpeed;
	this.ySpeed = this.ySpeed + gravity;
	var zIndex = (gameAreaZ -this.z);
	if (this.y > (gameAreaHeight-this.radie ) ) {
		this.ySpeed = -this.ySpeed;
		this.ySpeed = bounceIndex * this.ySpeed;
		this.y = gameAreaHeight-this.radie;
	}
	
	if(this.z < 0) this.zSpeed = Math.abs(this.zSpeed);
	if(this.z > gameAreaZ) this.zSpeed = - Math.abs(this.zSpeed);
	
	if (this.y < this.radie) {
		if(this.ySpeed < 0) {
			this.ySpeed = -this.ySpeed;
			this.ySpeed = bounceIndex * this.ySpeed;
		}
	}
	if (this.x > (canvas.width-this.radie)){
			this.xSpeed = -Math.abs(this.xSpeed);
	}
	
	if (this.x < this.radie){
		this.xSpeed = Math.abs(this.xSpeed);
	}
	
}

Particle.prototype.drawCircle = function(context){
	context.beginPath();
	var zIndex = ((gameAreaZ-this.z));
	//var size = (this.radie)*(zIndex/100) + 1;
	var size = this.radie;
	context.arc(this.x, this.y, size, 0, 2 * Math.PI, false);
	context.fillStyle = this.fillColor;
	context.fill();
	context.lineWidth =3;// (3)*((gameAreaZ-this.z)/100) + 1;
	context.strokeStyle = '#000000';
	context.stroke();
	
}

function drawReferenseLine(context){
	context.fillStyle="#000000";
	context.fillRect(101,gameAreaHeight-101,gameAreaWidth-202,1);
	for(var i = 101; i < gameAreaHeight-101; i++){
		context.fillRect(101,i,1,1);
		context.fillRect(gameAreaWidth-101,i,1,1);
	}
	context.fillRect(101,gameAreaHeight-101,gameAreaWidth-202,1);
	context.fillRect(101,101,gameAreaWidth-202,1);
	context.fillRect(51,gameAreaHeight-51,gameAreaWidth-102,1);
	context.fillRect(51,51,gameAreaWidth-102,1);
	context.fillRect(1,gameAreaHeight-1,gameAreaWidth-2,1);
	context.fillRect(1,1,gameAreaWidth-2,1);
	
}

function debugLine(count,debugLineValue,context){
	context.fillStyle="#FF0000";
	var whereAreTheBalls = (count/particleCount);
	context.fillRect(0,whereAreTheBalls,gameAreaWidth,1);
	context.fillStyle="#00FF00";
	context.fillRect(0,debugLineValue,gameAreaWidth,1);
}

var particles  = new Array();
//for(i=0; i<particleCount; i++){
//	var p = new Particle(gameAreaWidth/2, gameAreaHeight, random(-10,10), random(-15,-5));
//	particles[i] = p;
//}



function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

var bounce = false;
var enable_bounce = true;
var frames = 0;
var color = get_random_color();
var xSpeed = random(-15,15);
var ySpeed =  getNewYSpeed();
myTimer();
function getNewYSpeed(){
	return random(-45,-25);
}
function myTimer(){
	window.requestAnimationFrame(myTimer);
	context.clearRect(0,0,gameAreaWidth,gameAreaHeight);
	var count = 0;
	frames++;
	if(particleCount>particles.length && (frames % 6 == 0)){
		if(particles.length % 10 === 0) color = get_random_color();
		var p = new Particle(gameAreaWidth/2, gameAreaHeight, xSpeed, ySpeed ,color);
			particles[particles.length] = p
		if(particleCount===particles.length) bounce=true;
	}
	
	
	for(i=0; i<particles.length; i++){
		count += particles[i].y;
		particles[i].drawCircle(context);
		particles[i].update();
		
	}
	var debugLineValue = (frames>10)?(gameAreaHeight-40):gameAreaHeight;
	
	if(count > particles.length*debugLineValue){
		if(bounce){
		for(i=0; i<particleCount; i++){
			particles[i].ySpeed = getNewYSpeed();
			particles[i].xSpeed = random(-15,15);
		}
		bounce=false;
		frames=0;
		}else{
			particles = new Array();
			color = get_random_color();
			xSpeed= random(-15,15);
			ySpeed = getNewYSpeed();
			bounce = true;
		}
	}
	
	
	debugLine(count,debugLineValue,context);
//	drawReferenseLine(context);
}
