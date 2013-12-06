function WorldSettings(){
	this.areaHeight=600;
	this.areaWidth= 1200;
	this.ballSize = 35; 
	this.bounceIndex=0.75;
	this.gravity = 0.15;
	this.particleCount = 100;
	this.debug = true;
}

module.exports.WorldSettings = WorldSettings;