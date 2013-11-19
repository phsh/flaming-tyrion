var random = require('./random').random;
var randomInt = require('./random').randomInt;

var canvas = document.createElement('canvas');
canvas.height=500;
canvas.width=1000;

document.body.appendChild(canvas);

var context = canvas.getContext('2d');

//context.beginPath();
//context.rect(100,100,50,50);
//context.fillStyle=0x000000;
//context.closePath();
//context.fill();



function Particle(init_x,init_y, xSpeed, ySpeed){
	this.x = init_x;
	this.y = init_y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.fillColor = 'rgb( 0 , 0, 255 )';
}

Particle.prototype.update = function(){
	this.x = this.x + this.xSpeed;
	this.y = this.y + this.ySpeed;
	this.ySpeed = this.ySpeed + 0.1;
	if (this.y > 500) {
		this.ySpeed = -this.ySpeed;
		this.ySpeed = 0.65 * this.ySpeed;
	}
	if (this.x > canvas.width){
		this.xSpeed = -this.xSpeed;
	//	this.startColor = this.startColor - 10;
	}
	if (this.x < 0){
		this.xSpeed = -this.xSpeed;
	//	this.startColor = this.startColor - 10;
	}
	//if(this.startColor < 1) this.startColor = 127;
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

var particles  = {};

for(i=0; i<250; i++){
	var p = new Particle(random(490,510), 500, random(-5,5), random(-15,-5));
	particles[i] = p;
	if((i % 3)===0){
		particles[i].fillColor = 'rgb( 0 , 255, 0 )';
	}
	if((i % 3)===1){
		particles[i].fillColor = 'rgb( 255 , 0, 0 )';
	}
	if((i % 3)===2){
		particles[i].fillColor = 'rgb( 0 , 0, 255 )';
	}
}

myTimer();
var startColor = 255;


function myTimer(){
	window.requestAnimationFrame(myTimer);
	context.clearRect(0,0,1000,500);
	var count = 0;
	for(i=0; i<250; i++){
		particles[i].drawCircle(canvas.getContext('2d'));
		particles[i].update();
		count += particles[i].y;
	}
	if(count > 245*500){
		for(i=0; i<250; i++){
			particles[i].ySpeed = random(-15,-5);
			if((i % 3)===0){
				particles[i].fillColor = 'rgb( 0 , ' + startColor + ', 0 )';
			}
			if((i % 3)===1){
				particles[i].fillColor = 'rgb( ' + startColor + ' , 0, 0 )';
			}
			if((i % 3)===2){
				particles[i].fillColor = 'rgb( 0 , 0, ' + startColor + ' )';
			}
			startColor = startColor - 5;
			if(startColor < 5) startColor = 255;
		}
	}
}

//var myVar=setInterval(function(){myTimer()},200);