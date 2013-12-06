function Debug(){

}


Debug.prototype.displayDebugLine = function (baselineCount,debugLineValue,context,world){
		context.fillStyle="#FF0000";
		var whereAreTheBalls = (baselineCount/world.particleCount);
		context.fillRect(0,whereAreTheBalls,world.areaWidth,1);
		context.fillStyle="#00FF00";
		context.fillRect(0,debugLineValue,world.areaWidth,1);
}

module.exports.Debug = Debug;