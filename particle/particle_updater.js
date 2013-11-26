var random = require('./random').random;
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
		
		particles[i].ySpeed = xSpeedNew+index_i;
		particles[i].xSpeed = ySpeedNew+index_i;
		particles[i].y = particles[i].radie;
		particles[i].x = particles[i].radie;
	}
	console.log("DONE");
}
module.exports.ParticleUpdater = ParticleUpdater;

function getNewYSpeed(){
	return random(-55,-25);
}

function getNewXSpeed(){
	return random(-30,30);
}
