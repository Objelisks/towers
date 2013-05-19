/* Thing Module */
define(["physi", "thing"], function(P, Thing) {

var Player = function() {
	var geo = new THREE.CubeGeometry(1, 1, 1);
	var mat = new THREE.MeshLambertMaterial({color:0xFFFA80, shading:THREE.FlatShading});

	Thing.Actor.call(this, {geo: geo, mat: mat});
	this.ticks = 0;
	this.rotation.x = Math.PI / 4;
	this.rotation.z = Math.PI / 4;
	this.floating = 0;
	this.target = new THREE.Vector3();
	this.restTimer = Date.now();
	this.restingOffset = 0;
	this.speed = 6;

	this.add(new THREE.PointLight(0xFFFA80, 0.4, 5));
}
Player.prototype = Object.create(Thing.Actor.prototype);

Player.prototype.moveTo = function(point) {
	if(point.y > 1.0) return;

	this.target.x = point.x;
	this.target.y = point.y + 2;
	this.target.z = point.z;
	this.restingOffset = 2;
}

Player.prototype.update = function(delta) {
	this.ticks += delta;
	this.rotation.y += delta * this.restingOffset;
	this.rotation.x += delta * this.restingOffset;
	this.rotation.z += delta * this.restingOffset;

	var direction = this.target.clone().sub(this.position).normalize();
	var distance = this.target.distanceTo(this.position) / 5;
	if(distance > 0.5) {
		this.restTimer = Date.now();
	} else if((Date.now() - this.restTimer > 5000) && this.restingOffset > 0){
		this.target.y -= delta;
		this.restingOffset = Math.max(0, this.restingOffset - delta);
	}
	this.position.x += direction.x * this.speed * delta * Math.min(1, distance);
	this.position.y += direction.y * this.speed * delta * Math.min(1, distance);
	this.position.z += direction.z * this.speed * delta * Math.min(1, distance);
}

return {
	Player: Player
};

});

/*
mouse control
	needs to tell the world to click on it
	get back direction from world
	move in that direction
	pathfinding

remember to add touch control later

*/