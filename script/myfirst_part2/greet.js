var document = require('global/document');

function greet(name){
	var p = document.createElement('p');
	p.innerHTML = 'heloo ' + name;
	p.id ='hello';
	console.log("setting "+p.innerHTML);
	document.body.appendChild(p);
}

module.exports = greet;