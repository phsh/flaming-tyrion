function Debug(){
}

Debug.prototype.displayDebugLine = function (baselineCount,debugLineValue,context,world){
	var averageBallLine = (baselineCount/world.particleCount);

	context.fillStyle="#FF0000";
	context.fillRect(0,averageBallLine,world.areaWidth,1);
	
	context.fillStyle="#00FF00";
	context.fillRect(0,debugLineValue,world.areaWidth,1);
}

module.exports.Debug = Debug;