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

var stateMachine = new StateMachine();
var particles  = new Array();
var updater = new ParticleUpdater();
var timeDelayCounter = new TimeState();

var world = new WorldSettings();

var gameAreaHeight=600;
var gameAreaWidth= 1200;
var gameAreaZ = 100;
var ballSize = 35; 
var bounceIndex=0.75;
var gravity = 0.15;
var particleCount = 100;


var canvas = document.createElement('canvas');

var color  = get_random_color();
var xSpeed = getNewXSpeed();
var ySpeed = getNewYSpeed();

canvas.height=world.gameAreaHeight;
canvas.width=world.gameAreaWidth;
document.body.appendChild(canvas);

var context = canvas.getContext('2d');

function debugLine(count,debugLineValue,context){
	context.fillStyle="#FF0000";
	var whereAreTheBalls = (count/particleCount);
	context.fillRect(0,whereAreTheBalls,gameAreaWidth,1);
	context.fillStyle="#00FF00";
	context.fillRect(0,debugLineValue,gameAreaWidth,1);
}

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

function state52(){
	var xSpeedNew = -12;
	var ySpeedNew =  -45;
	var xStartNew = 100;
	var yStartNew = 100;
	for(i=0; i<particles.length; i++){
		if(i % 5 === 0) {
			xSpeedNew = getNewXSpeed();
			ySpeedNew = getNewYSpeed();
			xStartNew = random(world.ballSize*4,world.gameAreaWidth-(world.ballSize*4));
			yStartNew = random(world.ballSize*4,world.gameAreaHeight-(world.ballSize*4))
		}
		var index_i = i % 5;
		particles[i].ySpeed = xSpeedNew 
		particles[i].xSpeed = ySpeedNew - (gravity * index_i) ;
		particles[i].y = yStartNew - (xSpeed*index_i) ;
		particles[i].x = xStartNew - (ySpeed*index_i);
	}
	timeDelayCounter.reset();
	
	if(stateMachine.getState()===52) stateMachine.setState(4);
	if(stateMachine.getState()===18) stateMachine.setState(7);	
	
}

function removeParticles(doPop){
	if(timeDelayCounter.getCounter() % 4 === 0){
		(doPop) ? updater.statePopRemove( particles ) : updater.stateShiftRemove(particles);
	}
}

function state0(){
	if(timeDelayCounter.getCounter() % 8 == 0){
		
		if(particles.length % 5 === 0) {
			color = get_random_color();
		}
		if(particles.length % 20 === 0) xSpeed = getNewXSpeed();

		var p = new Particle( gameAreaWidth/2, gameAreaHeight-ballSize, xSpeed, ySpeed ,color, ballSize,gameAreaHeight,bounceIndex, gameAreaWidth,gravity);
		particles[particles.length] = p
		timeDelayCounter.reset();
	}
}

function resetStateCheck(baselineCount, debugLineValue){
	if(baselineCount > particles.length * debugLineValue){
		if(stateMachine.getState()===1){
			stateMachine.setState(2);
		}
		if(stateMachine.getState()===4){
			stateMachine.setState(18);
		}
		if(stateMachine.getState()===11){
			stateMachine.setState(8);
		}
	}
}

function checkStopCreatingParticles(){
	if(particleCount <= particles.length){
		if(stateMachine.getState()===0) stateMachine.setState(1);
		if(stateMachine.getState()===10) stateMachine.setState(11);
	}
}

function checkStopDeletingParticles(){
	if(particles.length < 1){
		if(stateMachine.getState()=== 7){
			stateMachine.setState(10);
		}
		if(stateMachine.getState()===8){
			stateMachine.setState(0);
		}
	}
}

function myTimer(){
	window.requestAnimationFrame(myTimer);
	context.clearRect(0,0,world.gameAreaWidth,world.gameAreaHeight);
	var baselineCount = updateParticles(context);
	
	timeDelayCounter.count();
	
	var debugLineValue = gameAreaHeight-1;
	if(timeDelayCounter.getCounter() > 100){
		debugLineValue = getBaselineValue();
	}	
	
	switch( stateMachine.getState() ){
		case 0: 
		case 10:
			state0();
			break;
		case 2:
			updater.stateUpperLeftCorner(particles);
			timeDelayCounter.reset();
			stateMachine.setState(7);
			break;
		case 52: 
		case 18:
			state52();
			break;
		case 7: case 8:
	  		var doPop = (stateMachine.getState() === 7);
	  		removeParticles(doPop);
	  		break;
		default:
	  		console.log("state = "+stateMachine.getState());
	}
	
	resetStateCheck(baselineCount, debugLineValue);
	checkStopCreatingParticles();
	checkStopDeletingParticles();
	if(world.debug) debugLine(baselineCount,debugLineValue,context);
}

myTimer();