function random(min, max) {
	return Math.random() * (max - min) + min;
}

function randomInt(min, max){
	return Math.floor( Math.random() * (max + min + 1) ) + min;
}
function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function getNewYSpeed(){
	return random(-55,-25);
}

function getNewXSpeed(){
	return random(-30,30);
}


module.exports.getNewXSpeed = getNewXSpeed;
module.exports.getNewYSpeed = getNewYSpeed;
module.exports.random = random;
module.exports.randomInt = randomInt;
module.exports.get_random_color = get_random_color;
