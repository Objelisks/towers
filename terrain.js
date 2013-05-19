/* Terrain Module */
define(["physi", "models"], function(P, Models) {


var worldMap = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
(function() {
	var map = {};
	for (var i = 0; i < worldMap.length; i++) {
		for (var j = 0; j < worldMap[i].length; j++) {
			map[i+" "+j] = worldMap[i][j];
		}
	}
	worldMap = map;
})();

var Terrain = function() {
	var model = (new THREE.JSONLoader(true)).parse(Models["Area1"]);
	var geo = model.geometry;
	var mat = model.materials[0];
	//var geo = new THREE.PlaneGeometry(100, 100, 100, 100);
	//geo.applyMatrix((new THREE.Matrix4()).makeRotationX(Math.PI/-2));
	//var mat = new THREE.MeshPhongMaterial({color: 0xB4F853});
	mat.shading = THREE.FlatShading;
	THREE.Mesh.call(this, geo, mat);
	//this.rotation.x = Math.PI/-2;

	this.receiveShadow = true;
}
Terrain.prototype = Object.create(THREE.Mesh.prototype);

return {
	Terrain: Terrain
};


/*
shapes

world:
	terrain
	collision objects
	towers
	npcs
	draw objects
*/

});