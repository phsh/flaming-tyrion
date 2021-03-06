var StateMachine = require('./statemachine').StateMachine;
var Particle = require('./particle').Particle;
var TimeState = require('./timestate').TimeState;
var ParticleUpdater = require('./particle_updater').ParticleUpdater;
var WorldSettings = require('./world').WorldSettings;
var ParticleSeeder = require('./particle').ParticleSeeder;
var Debug = require('./debug').Debug;

var stateMachine = new StateMachine();
var particles  = new Array();
var updater = new ParticleUpdater();
var timeDelayCounter = new TimeState();
var world = new WorldSettings();
var particleSeed = new ParticleSeeder();
var debug = new Debug();

function setUpWorld(){
	var canvas = document.createElement('canvas');
	canvas.height=world.areaHeight;
	canvas.width=world.areaWidth;
	document.body.appendChild(canvas);
	return canvas.getContext('2d')
}
	
var context = setUpWorld();

function updateParticles(context){
	var baselineCount = 0;
	for(i=0; i<particles.length; i++){
		baselineCount += particles[i].y;
		particles[i].drawCircle(context);
		particles[i].update();
	}
	return baselineCount;
}

function getBaselineValue(){
	var particlesInRestValue = world.areaHeight-1;
	if( stateMachine.getState()===1 || stateMachine.getState() === 4){
		particlesInRestValue = (world.areaHeight-world.ballSize-10);
	}
	if( stateMachine.getState() === 11){
		particlesInRestValue = (world.areaHeight/2);
	}
	return particlesInRestValue;
}

function removeParticles(doPop){
	if(timeDelayCounter.getCounter() % 4 === 0){
		(doPop) ? updater.statePopRemove( particles ) : updater.stateShiftRemove(particles);
	}
}

function seedFromPoint(particleSeed, x, y){
	particleSeed.x = x; 
	particleSeed.y = y;
}

function seedFromIndexPoints(particleSeed,number_of_points,count){
	var x = new Array();
	x[0] = 200;
	x[1] = 100;
	x[2] = world.areaWidth-400;
	x[3] = world.areaWidth-200;;
	var y = new Array();
	y[0] = 100;
	y[1] = world.areaHeight-200;
	y[2] = 100;
	y[3] = world.areaHeight-200;
	particleSeed.x=x[ count % 4];
	particleSeed.y=y[ count % 4];

}

function seedMiddleOfBottomline(particleSeed){
	particleSeed.randomColor();
	particleSeed.newRandomXSpeed();
	particleSeed.newRandomYSpeed();
	seedFromPoint(particleSeed, ( world.areaWidth / 2), world.areaHeight);
}

function addParticle(particles){
	var p = new Particle(world, particleSeed);
	particles[particles.length] = p;
}

function toRadians ( angle ) {
	return angle * ( Math.PI / 180);
}

function createParticleAsFontain(){
	if(timeDelayCounter.getCounter() % 8 == 0){
		if(particles.length % 5 === 0) {
			particleSeed.randomColor();
		}
		if(particles.length % 20 === 0) particleSeed.newRandomXSpeed();
		addParticle(particles);
		timeDelayCounter.reset();
	}
}

function createParticleAsRain(){
	if(timeDelayCounter.getCounter() % 8 == 0){
		particleSeed.newYSpeed(20);
		particleSeed.newXSpeed(0);
		particleSeed.y = world.ballSize;
		particleSeed.x = ((particles.length / world.particleCount) * (world.areaWidth - 2 * world.ballSize)) + world.ballSize;
		if(particles.length % 5 === 0) {
			particleSeed.randomColor();
		}
		addParticle(particles);
		timeDelayCounter.reset();
	}
}

function createParticleFromBox(){
	seedFromIndexPoints(particleSeed,4,particles.length);
	particleSeed.newXSpeed( particles.length % 4);
	particleSeed.newYSpeed( ( particles.length % 4) * -5);
	if(particles.length % 4 === 0) {
		particleSeed.randomColor();
	}
	addParticle(particles);	
}

function createParticleAsCircle(){
	var Speed = 40;
	particleSeed.newXSpeed( Speed * Math.sin( toRadians( ( particles.length / world.particleCount) * 360 ) ) );
	particleSeed.newYSpeed( Speed * Math.cos( toRadians( ( particles.length / world.particleCount) * 360 ) ) );			
	if(particles.length % 5 === 0) {
		particleSeed.randomColor();
	}			
	addParticle(particles);
}

function checkForParticleLimit(){
	if(world.particleCount <= particles.length){
		if(stateMachine.getState()===0) stateMachine.setState(1);
		if(stateMachine.getState()===10) stateMachine.setState(11);
	}
	if(particles.length < 1){
		if(stateMachine.getState()=== 7){
			stateMachine.setState(10);
		}
		if(stateMachine.getState()===8){
			seedMiddleOfBottomline(particleSeed);
			stateMachine.setState(0);
		}
	}
}

function checkState(state){
	switch( state ){
		case 20: 
			createParticleAsFontain();
			break;
		case 0:
			//createParticleAsRain();
			createParticleFromBox();
			break;
		case 10:
			seedFromPoint( particleSeed, (world.areaWidth / 2), (world.areaHeight / 2) );
			createParticleAsCircle();
			var doPop = true;
			removeParticles(doPop);
			break;
		case 2:
			updater.stateUpperLeftCorner(particles);
			timeDelayCounter.reset();
			stateMachine.setState(7);		
			break;
		case 7: case 8:
			var doPop = (stateMachine.getState() === 7);
			removeParticles(doPop);
			break;
		default:
			console.log("state = "+stateMachine.getState());
	}
}

function resetStateCheck(baselineCount, debugLineValue){
	if(baselineCount > particles.length * debugLineValue){
		if(stateMachine.getState()===1){
			stateMachine.setState(2);
		}
		if(stateMachine.getState()===11){
			stateMachine.setState(8);
		}
	}
}

function animationFunction(){
	context.clearRect(0,0,world.areaWidth,world.areaHeight);
	var baselineCount = updateParticles(context);
	timeDelayCounter.count();		
	var particlesInRestValue = world.areaHeight-1;
	if(timeDelayCounter.getCounter() > 100){
		particlesInRestValue = getBaselineValue();
	}	
	checkState(stateMachine.getState());
	resetStateCheck(baselineCount, particlesInRestValue);
	checkForParticleLimit()
	if(world.debug) debug.displayDebugLine(baselineCount,particlesInRestValue,context,world);
	window.requestAnimationFrame(animationFunction);
	
}

seedMiddleOfBottomline(particleSeed);
animationFunction();