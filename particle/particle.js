function Particle(init_x,init_y, xSpeed, ySpeed,color, ballSize,gameAreaHeight,bounceIndex, gameAreaWidth,gravity){
	this.x = init_x;
	this.y = init_y;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.fillColor = color;
	this.radie = ballSize;
	this.gameAreaHeight = gameAreaHeight
	this.bounceIndex = bounceIndex;
	this.gameAreaWidth  = gameAreaWidth
	this.gravity = gravity;
}

function ParticleA( world , particleSeeder ){
	this.x = particleSeeder.xStart;
	this.y = particleSeeder.yStart;
	this.xSpeed = particleSeeder.xSpeed;
	this.ySpeed = particleSeeder.ySpeed;
	this.radie = world.ballSize;
	this.bounceIndex = world.bounceIndex;
	this.gameAreaHeight = world.gameAreaHeight;
	this.gameAreaWidth = world.gameAreaWidth;
	this.gravity = world.gravity;
}

Particle.prototype.update = function(){
	this.x = this.x + this.xSpeed;
	this.y = this.y + this.ySpeed;
	this.ySpeed = this.ySpeed + this.gravity;
	if (this.y > (this.gameAreaHeight-this.radie ) ) {
		this.ySpeed = -this.ySpeed;
		this.ySpeed = this.bounceIndex * this.ySpeed;
		this.y = this.gameAreaHeight - this.radie;
	}
	if (this.y < this.radie) {
		if(this.ySpeed < 0) {
			this.ySpeed = -this.ySpeed;
			this.ySpeed = this.bounceIndex * this.ySpeed;
		}
	}
	if (this.x > (this.gameAreaWidth-this.radie)){
			this.xSpeed = -Math.abs(this.xSpeed);
	}
	
	if (this.x < this.radie){
		this.xSpeed = Math.abs(this.xSpeed);
	}
	
}

function ParticleSeeder(){
	this.color = get_random_color();
	this.xSpeed = getNewXSpeed();
	this.ySpeed = getNewYSpeed();
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

module.exports.Particle = Particle;