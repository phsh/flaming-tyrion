var random = require('./random').random;
var getNewXSpeed = require('./random').getNewXSpeed;
var getNewYSpeed = require('./random').getNewYSpeed;

function ParticleUpdater(){
}

ParticleUpdater.prototype.stateUpperLeftCorner = function(particles){
	var xSpeedNew = -12;
	var ySpeedNew =  -45;
	var xStartNew = 100;
	var yStartNew = 100;
	for(i=0; i<particles.length; i++){
		var index_i = i % 5;
		if(index_i === 0) {
			xSpeedNew = getNewXSpeed();
			ySpeedNew = getNewYSpeed();
		}
		var p = particles[i];
		p.ySpeed = xSpeedNew+index_i;
		p.xSpeed = ySpeedNew+index_i;
		p.y = p.radie;
		p.x = p.radie;
	}
	console.log("DONE");
}
module.exports.ParticleUpdater = ParticleUpdater;

