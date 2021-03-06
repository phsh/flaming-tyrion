var get_random_color = require('./random').get_random_color;
var getNewXSpeed = require('./random').getNewXSpeed;
var getNewYSpeed = require('./random').getNewYSpeed;
function Particle( world , particleSeeder ){
	this.x = particleSeeder.x;
	this.y = particleSeeder.y;
	this.xSpeed = particleSeeder.xSpeed;
	this.ySpeed = particleSeeder.ySpeed;
	this.lineWidth = particleSeeder.lineWidth;
	this.color = particleSeeder.color;
	this.radie = world.ballSize;
	this.bounceIndex = world.bounceIndex;
	this.areaHeight = world.areaHeight;
	this.areaWidth = world.areaWidth;
	this.gravity = world.gravity;
}

Particle.prototype.update = function(){
	this.x = this.x + this.xSpeed;
	this.y = this.y + this.ySpeed;
	this.ySpeed = this.ySpeed + this.gravity;
	if (this.y > (this.areaHeight-this.radie ) ) {
		this.ySpeed = -this.ySpeed;
		this.ySpeed = this.bounceIndex * this.ySpeed;
		this.y = this.areaHeight - this.radie;
	}
	if (this.y < this.radie) {
		if(this.ySpeed < 0) {
			this.ySpeed = -this.ySpeed;
			this.ySpeed = this.bounceIndex * this.ySpeed;
		}
	}
	if (this.x > (this.areaWidth-this.radie)){
			this.xSpeed = -Math.abs(this.xSpeed);
	}
	if (this.x < this.radie){
		this.xSpeed = Math.abs(this.xSpeed);
	}
}

function ParticleSeeder(){
	this.color = "blue";
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.x = 0;
	this.y = 0;
	this.lineWidth = 3;
}

ParticleSeeder.prototype.randomColor = function(){
	this.color = get_random_color();
}

ParticleSeeder.prototype.newRandomXSpeed = function(){
	this.xSpeed = getNewXSpeed();
}

ParticleSeeder.prototype.newXSpeed = function(xSpeed){
	this.xSpeed = xSpeed;
}

ParticleSeeder.prototype.newRandomYSpeed = function(){
	this.ySpeed = getNewYSpeed();
}

ParticleSeeder.prototype.newYSpeed = function(ySpeed){
	this.ySpeed = ySpeed;
}


Particle.prototype.drawCircle = function(context){
	context.beginPath();
	context.arc(this.x, this.y, this.radie, 0, 2 * Math.PI, false);
	context.fillStyle = this.color;
	context.fill();
	context.lineWidth = this.lineWidth;
	context.strokeStyle = '#000000';
	context.stroke();
}

module.exports.ParticleSeeder = ParticleSeeder;
module.exports.Particle = Particle;