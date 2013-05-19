/* World Module */
define(["physi", "state", "player", "thing", "things", "areatest"], function(P, State, Char, Thing, Things, area) {

var World = function() {
	State.State.call(this);

	this.fog = new THREE.FogExp2(0x96EDED, 0.015);

	// initialize terrain
	this.terrain = new Thing.Static(Things.Area1);
	this.add(this.terrain);

	// initialize objects
	this.objects = new THREE.Object3D();
	this.add(this.objects);

	// initialize actors
	this.actors = new THREE.Object3D();
	this.add(this.actors);

	this.player = new Char.Player();
	this.actors.add(this.player);

	for (var i = 0; i < 30; i++) {
		this.actors.add(new Thing.MorphThing(Things.Rabit));
	}

	// initialize towers
	this.towers = new THREE.Object3D();
	this.add(this.towers);

	var tower = new Thing.Static(Things.Tower);
	tower.position.x = -10;
	this.towers.add(tower);

	// initialize villages
	this.villages = {};

	for (var i = 0; i < 40; i++) {
		//var tree = new Terrain.Tree();
		var tree = new Thing.Static(Things.Tree);
		tree.position.set(Math.random()*90-45, 0, Math.random()*90-45);
		var scale = Math.random()*0.4+0.8;
		tree.scale.set(scale, scale, scale);
		this.objects.add(tree);
	}

	for (var i = 0; i < 20; i++) {
		var rock = new Thing.Static(Things.Rock);
		rock.position.set(Math.random()*90-45, 0, Math.random()*90-45);
		var scale = Math.random()*0.4+0.8;
		rock.scale.set(scale, scale, scale);
		rock.rotation.y = Math.random() * 360;
		this.objects.add(rock);
	}

	for (var i = 0; i < 3; i++) {
		var villageOffset = new THREE.Vector3(Math.random()*80-40, 0, Math.random()*80-40);
		var buildings = Math.floor(Math.random() * 4 + 4);
		var distance = Math.random() + 4;
		for (var b = 0; b < buildings; b++) {
			var direction = Math.random() * Math.PI * 2;
			var house = new Thing.Static(Things.House);
			house.position.set(villageOffset.x + Math.cos(direction) * distance, villageOffset.y, villageOffset.z + Math.sin(direction) * distance);
			house.rotation.y = direction - Math.PI;
			this.objects.add(house);
			direction += Math.random() * Math.PI / (2 * buildings) + Math.PI / 4;
		}
	}

	// initialize lights
	this.light = new THREE.DirectionalLight(0xffffff, 0.5);
	this.light.position.y = 2;
	this.light.position.x = 2;
	this.light.position.z = 1;
	this.light.castShadow = true;
	this.light.target.position.set(0,0,0);
	this.light.shadowCameraNear = 0.01;	
	this.light.shadowCameraRight = 5;
	this.light.shadowCameraLeft = -5;
	this.light.shadowCameraTop = 5;
	this.light.shadowCameraBottom = -5;
	this.light.shadowMapWidth = 2048;
	this.light.shadowMapHeight = 2048;
	this.add(this.light);

	this.add(new THREE.AmbientLight(0x555555));


	this.projector = new THREE.Projector();
	window.addEventListener("mousedown", this.mousedown.bind(this), false);
}
World.prototype = Object.create(State.State.prototype);

World.prototype.update = function(delta) {
	State.State.prototype.update.call(this, delta);
	//THREE.AnimationHandler.update(delta);

	this.actors.traverse(function(obj) {
		if(obj.animate) {
			obj.animate(delta);
		}
		if(obj.update) {
			obj.update(delta);
		}
	});

	this.light.position = this.player.position.clone().add(new THREE.Vector3(1, 2, 2));
	this.light.target.position = this.player.position.clone().sub(new THREE.Vector3(0, 1, 0));

	/*
	var resetOpacity = function(obj) {
		if(obj.material) {
			obj.material.transparent = false;
			obj.material.opacity = 1.0;
		}
	}

	this.terrain.traverse(resetOpacity);
	this.towers.traverse(resetOpacity);
	var ray = new THREE.Raycaster(this.camera.position, this.player.position.clone().sub(this.camera.position));
	var hits = ray.intersectObjects([this.terrain, this.towers, this.player, this.objects], true);
	for (var i = 0; i < hits.length; i++) {
		if(hits[i].object === this.player) {
			break;
		}
		if(hits[i].object.material) {
			hits[i].object.material.transparent = true;
			hits[i].object.material.opacity = 0.8;
			hits[i].object.material.blending = THREE.CustomBlending;
			hits[i].object.material.blendEquation = THREE.AddEquation;
			hits[i].object.material.blendSrc = THREE.OneMinusSrcAlphaFactor;
			hits[i].object.material.blendDst = THREE.DstAlphaFactor;
		}
	}
	*/

	this.camera.position.x = this.player.position.x + 10;
	this.camera.position.y = this.player.position.y + 10;
	this.camera.position.z = this.player.position.z + 10;
	this.camera.lookAt(this.player.position);
}

World.prototype.mousedown = function(e) {
	if(e.button == 2) return;

	var select = new THREE.Vector3((e.clientX-window.innerWidth/2)/(window.innerWidth/2), (e.clientY-window.innerHeight/2)/(-window.innerHeight/2), 0);
	var ray = this.projector.pickingRay(select, this.camera);
	var hits = ray.intersectObjects([this.terrain], false); // Put objects here
	if(hits.length > 0) {
		var point = hits[0].point;
		this.player.moveTo(point);
	}
}

return {
	World: World
};



level1.terrain = {};
level1.actors = {};
level1.objects = {};
level1.towers = {};

});