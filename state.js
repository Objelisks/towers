define(["require", "physi", "terrain", "player"], function(require) {
var Physijs = require("physi");
var Env = require("terrain");
var Char = require("player");

var State = function() {
	Physijs.Scene.call(this);

	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	this.camera.position.x = 25;
	this.camera.position.y = 25;
	this.camera.position.z = 25;
	this.camera.lookAt(new THREE.Vector3(0,0,0));
}
State.prototype = Object.create(Physijs.Scene.prototype);

State.prototype.render = function(renderer) {
	renderer.render(this, this.camera);
}

State.prototype.update = function(delta) {
	// add an update listener if anything requires physics calculations first
	this.simulate(); // Physijs simulation

	// Need a better way of updating things.
	// TODO: Event system, some kind of asynchronous thing
	// But then we lose the delta: OR DO WE
	
	// TODO: Standalone camera controller
}

var GameState = function() {
	State.call(this);

	var light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.position.y = 1;
	this.add(light);

	var point = new THREE.PointLight(0xaaaaaa, 0.2);
	point.position.y = 10;
	//this.add(point);

	this.add(new THREE.AmbientLight(0x555555));

	// Initialize the scene here
	var terrain = new Env.Terrain();
	this.add(terrain);

	var player = new Char.Player();
	player.position.y = 0.5;
	this.add(player);

	// Enable for generic mouse clicks
	//window.addEventListener("mousedown", this.mousedown.bind(this), false);
}
GameState.prototype = Object.create(State.prototype);

GameState.prototype.mousedown = function(e) {
	// Mouse picking
	/*
	var select = new THREE.Vector3((e.clientX-window.innerWidth/2)/(window.innerWidth/2), (e.clientY-window.innerHeight/2)/(-window.innerHeight/2), 0);
	var ray = this.projector.pickingRay(select, this.camera);
	var hits = ray.intersectObjects([]); // Put objects here
	if(hits.length > 0) {
		var point = hits[0].point;
		
	}*/
}

return {
	State: State
};

});