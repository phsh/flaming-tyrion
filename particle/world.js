function WorldSettings(){
	this.gameAreaHeight=600;
	this.gameAreaWidth= 1200;
	this.ballSize = 35; 
	this.bounceIndex=0.75;
	this.gravity = 0.15;
	this.particleCount = 100;
	this.debug = true;
}

module.exports.WorldSettings = WorldSettings;