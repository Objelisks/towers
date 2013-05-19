/* Thing Module */
define(["physi"], function(P) {

var Actor = function(data) {
	if(data === undefined) data = {};

	// Grab the mesh data
	var geo = data.geo ? data.geo : new THREE.CubeGeometry(1, 1, 1);
	var mat = data.mat ? data.mat : new THREE.MeshLambertMaterial({color:0xFF0000, shading:THREE.FlatShading});
	mat.shading = THREE.FlatShading;
	THREE.Mesh.call(this, geo, mat);

	// Do any initialization stuff
	if(data.init) {
		data.init.call(this);
		this.init = data.init;
	}

	// Actor functions
	if(data.update) {
		this.update = data.update;
	}

	// Default cast shadows
	//this.castShadow = true;
	this.receiveShadow = true;
}
Actor.prototype = Object.create(THREE.Mesh.prototype);

var MorphThing = function(data) {
	// Data things
	this.keyframes = data.keyframes ? data.keyframes : 31;
	this.duration = data.duration ? data.duration : 1000;

	// New things
	this.startTime = 0;
	this.currentKeyframe = 0;
	this.lastKeyframe = 0;
	this.playing = true;
	this.looping = true;
	this.animationFinish = null;

	Actor.call(this, data);

	// Modify things
	this.material.morphTargets = true;
}
MorphThing.prototype = Object.create(Actor.prototype);

MorphThing.prototype.play = function(reset, loop, callback) {
	if(reset) {
		this.currentKeyFrame = 0;
		this.lastKeyframe = 0;
	}
	if(callback) this.animationFinish = callback;
	this.looping = loop ? true : false;
	this.playing = true;
	this.startTime = Date.now();
}

MorphThing.prototype.stop = function(reset) {
	if(reset) { 
		this.currentKeyFrame = 0;
		this.lastKeyframe = 0;
	}
	this.playing = false;
	if(this.animationFinish) this.animationFinish(this);
}

MorphThing.prototype.animate = function(delta) {
	var interpolation = this.duration / this.keyframes;

	// http://threejs.org/examples/webgl_morphtargets_horse.html
	if(this.playing) {
		var time = (Date.now()-this.startTime) % this.duration;
		var keyframe = Math.floor( time / interpolation );
		var percent = time % interpolation;

		this.morphTargetInfluences[ this.lastKeyframe ] = 1 - percent;
		this.morphTargetInfluences[ this.currentKeyframe ] = percent;

		if ( keyframe != this.currentKeyframe ) {

			this.morphTargetInfluences[ this.lastKeyframe ] = 0;
			this.morphTargetInfluences[ this.currentKeyframe ] = 1;

			this.lastKeyframe = this.currentKeyframe;
			this.currentKeyframe = keyframe;

			if(!this.looping && (this.currentKeyFrame == 0) && (this.currentKeyframe < this.lastKeyframe)) {
				this.stop(true);
				return;
			}
		}

		this.morphTargetInfluences[ keyframe ] = ( time % interpolation ) / interpolation;
		this.morphTargetInfluences[ this.lastKeyframe ] = 1 - this.morphTargetInfluences[ keyframe ];
	}
}

return {
	Actor: Actor,
	Static: Actor,
	MorphThing: MorphThing
};

});