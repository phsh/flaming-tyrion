var random = require('./random').random;
var randomInt = require('./random').randomInt;
console.log(window.innerWidth);
console.log(window.innerHeight);
var gameAreaHeight=600;
var gameAreaWidth= 1200;
var gameAreaZ = 100;
var canvas = document.createElement('canvas');
canvas.height=gameAreaHeight;
canvas.width=gameAreaWidth;
document.body.appendChild(canvas);

var particleCount = 5;

var context = canvas.getContext('2d');

function Particle(init_x,init_y, xSpeed, ySpeed){
	this.x = init_x;
	this.y = init_y;
	this.z = 50;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.zSpeed = random(-1,1);
	this.fillColor = get_random_color();
	this.radie = 28;
}

Particle.prototype.update = function(){
	this.x = this.x + this.xSpeed;
	this.y = this.y + this.ySpeed;
	this.z = this.z + this.zSpeed;
	this.ySpeed = this.ySpeed + 0.05;
	if (this.y > (gameAreaHeight-this.radie)) {
		this.ySpeed = -this.ySpeed;
		this.ySpeed = 0.65 * this.ySpeed;
		this.y = gameAreaHeight-this.radie;
	}
	
	if(this.z < 0) this.zSpeed = Math.abs(this.zSpeed);
	if(this.z > gameAreaZ) this.zSpeed = -Math.abs(this.zSpeed);
	
	if (this.y < 0) {
		if(this.ySpeed < 0) {
			this.ySpeed = -this.ySpeed;
			this.ySpeed = 0.65 * this.ySpeed;
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
	var size = (this.radie)*((gameAreaZ-this.z)/100) + 1;
	context.arc(this.x, this.y, size, 0, 2 * Math.PI, false);
	context.fillStyle = this.fillColor;
	context.fill();
	context.lineWidth = (3)*((gameAreaZ-this.z)/100) + 1;;
	context.strokeStyle = '#000000';
	context.stroke();
	
}

function drawReferenseLine(context){
	context.fillStyle="#000000";
	context.fillRect(101,gameAreaHeight-101,gameAreaWidth-202,1);
	context.fillRect(51,gameAreaHeigh-51,gameAreaWidth-102,1);
	context.fillRect(1,gameAreaHeigh-1,gameAreaWidth-2,1);
	
}

function debugLine(count,debugLineValue,context){
	context.fillStyle="#FF0000";
	var whereAreTheBalls = (count/particleCount);
	context.fillRect(0,whereAreTheBalls,gameAreaWidth,1);
	context.fillStyle="#00FF00";
	context.fillRect(0,debugLineValue,gameAreaWidth,1);
}

var particles  = {};
for(i=0; i<particleCount; i++){
	var p = new Particle(gameAreaWidth/2, gameAreaHeight, random(-10,10), random(-15,-5));
	particles[i] = p;
}

myTimer();


function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}



function myTimer(){
	window.requestAnimationFrame(myTimer);
	context.clearRect(0,0,gameAreaWidth,gameAreaHeight);
	var count = 0;
	for(i=0; i<particleCount; i++){
		count += particles[i].y;
		particles[i].drawCircle(canvas.getContext('2d'));
		particles[i].update();
		
	}
	var debugLineValue = (gameAreaHeight-30);
	if(count > particleCount*debugLineValue){
		
		for(i=0; i<particleCount; i++){
			particles[i].ySpeed = random(-15,-5);
		}
	}
	debugLine(count,debugLineValue,context);
	drawReferenseLine(context);
}
