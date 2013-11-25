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


module.exports.random = random;
module.exports.randomInt = randomInt;
module.exports.get_random_color = get_random_color;
