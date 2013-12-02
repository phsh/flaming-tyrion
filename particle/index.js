	var random = require('./random').random;
	var randomInt = require('./random').randomInt;
	var get_random_color = require('./random').get_random_color;
	var getNewXSpeed = require('./random').getNewXSpeed;
	var getNewYSpeed = require('./random').getNewYSpeed;
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

	var canvas = document.createElement('canvas');

	canvas.height=world.gameAreaHeight;
	canvas.width=world.gameAreaWidth;
	document.body.appendChild(canvas);

	var context = canvas.getContext('2d');

	
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
		var debugLineValue = world.gameAreaHeight-1;
		if( stateMachine.getState()===1 || stateMachine.getState() === 4){
			debugLineValue = (world.gameAreaHeight-world.ballSize-10);
		}
		if( stateMachine.getState() === 11){
			debugLineValue = (world.gameAreaHeight/2);
		}
		return debugLineValue;
	}

	function removeParticles(doPop){
		if(timeDelayCounter.getCounter() % 4 === 0){
			(doPop) ? updater.statePopRemove( particles ) : updater.stateShiftRemove(particles);
		}
	}

	function seedFromPoint(particleSeed, x, y){
		particleSeed.xStart = x; 
		particleSeed.yStart = y;
	}

	function generateRandomColor(particleSeed){
		particleSeed.color = get_random_color();
	}

	function seedMiddleOfBottomline(particleSeed){
		generateRandomColor(particleSeed);
		particleSeed.xSpeed = getNewXSpeed();
		particleSeed.ySpeed = getNewYSpeed();
		seedFromPoint(particleSeed, ( world.gameAreaWidth / 2), world.gameAreaHeight);
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
				generateRandomColor(particleSeed);
			}
			if(particles.length % 20 === 0) particleSeed.xSpeed = getNewXSpeed();
			addParticle(particles);
			timeDelayCounter.reset();
		}
	}

	function createParticleAsRain(){
		if(timeDelayCounter.getCounter() % 8 == 0){
			particleSeed.ySpeed = 20;
			particleSeed.yStart = world.ballSize;
			particleSeed.xSpeed = 0;
			particleSeed.xStart = ((particles.length / world.particleCount) * (world.gameAreaWidth - 2 * world.ballSize)) + world.ballSize;
			if(particles.length % 5 === 0) {
				generateRandomColor(particleSeed);
			}
			addParticle(particles);
			timeDelayCounter.reset();
		}
	}

	function createParticleAsCircle(){
		var Speed = 40;
		particleSeed.xSpeed = Speed * Math.sin( toRadians( ( particles.length / world.particleCount) * 360 ) );
		particleSeed.ySpeed = Speed * Math.cos( toRadians( ( particles.length / world.particleCount) * 360 ) );			
		if(particles.length % 5 === 0) {
			generateRandomColor(particleSeed);
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
			createParticleAsRain();
			break;
		case 10:
			seedFromPoint( particleSeed, (world.gameAreaWidth / 2), (world.gameAreaHeight / 2) );
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
	window.requestAnimationFrame(animationFunction);
	context.clearRect(0,0,world.gameAreaWidth,world.gameAreaHeight);
	var baselineCount = updateParticles(context);
	timeDelayCounter.count();		
	var debugLineValue = world.gameAreaHeight-1;
	if(timeDelayCounter.getCounter() > 100){
		debugLineValue = getBaselineValue();
	}	
	checkState(stateMachine.getState());
	resetStateCheck(baselineCount, debugLineValue);
	checkForParticleLimit()
	if(world.debug) debug.displayDebugLine(baselineCount,debugLineValue,context,world);
}

seedMiddleOfBottomline(particleSeed);
animationFunction();