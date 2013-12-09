var random = require('./random').random;
var getNewXSpeed = require('./random').getNewXSpeed;
var getNewYSpeed = require('./random').getNewYSpeed;

function ParticleUpdater(){
}

ParticleUpdater.prototype.stateUpperLeftCorner = function(particles){
	var xSpeedNew = -12;
	var ySpeedNew =  -45;
	for(i=0; i<particles.length; i++){
		var seriesCounter = i % 5;
		if(seriesCounter === 0) {
			xSpeedNew = getNewXSpeed();
			ySpeedNew = getNewYSpeed();
		}
		var p = particles[i];
		p.ySpeed = xSpeedNew + seriesCounter;
		p.xSpeed = ySpeedNew + seriesCounter;
		p.y = p.radie;
		p.x = p.radie;
	}
}

ParticleUpdater.prototype.stateUpperRightCorner = function(particles,areaWidth){
	var xSpeedNew = -12;
	var ySpeedNew =  -45;
	for(i=0; i<particles.length; i++){
		var seriesCounter = i % 5;
		if(seriesCounter === 0) {
			xSpeedNew = getNewXSpeed();
			ySpeedNew = getNewYSpeed();
		}
		var p = particles[i];
		p.ySpeed = xSpeedNew + seriesCounter;
		p.xSpeed = ySpeedNew + seriesCounter;
		p.y = p.radie;
		p.x = areaWidth - p.radie;
	}
}

ParticleUpdater.prototype.stateShiftRemove = function(particles){
	particles.shift();
}

ParticleUpdater.prototype.statePopRemove = function(particles){
	particles.pop();
}

module.exports.ParticleUpdater = ParticleUpdater;

