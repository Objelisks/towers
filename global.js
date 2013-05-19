
/* Unique ID function */
var getId = function() {
	var _id = 1;
	return function() {
		return _id++;
	}
}();

Array.prototype.pickRandom = function() {
	return this[Math.floor(Math.random()*this.length)];
}

Function.prototype.extend = function(obj) {
	this.prototype = Object.create(obj.prototype);
	return this;
}

/* Global vars go here */