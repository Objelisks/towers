/*












G A M E T I T L E
A Work In Progress












*/


requirejs.config({
	shim: {
		"physi": {
			deps: ["three"],
			exports: "Physijs",
			init: function() {
				Physijs.scripts.worker = "physijs_worker.js";
				Physijs.scripts.ammo = "ammo.js";
			}
		},
		'three': {
			exports: "THREE"
		}
	},
	urlArgs: "bust=" + (new Date()).getTime()
});

var scene;

require(["physi", "world"], function(P, World) {

	var renderer = new THREE.WebGLRenderer({
		antialias: false,
		clearColor: 0x76EDED,
		clearAlpha: 1
	});
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = false;
	renderer.setSize( window.innerWidth, window.innerHeight ); // full window
	// TODO: Investigate fullscreen rendering
	document.body.appendChild( renderer.domElement );

	// catch right click
	document.addEventListener("contextmenu", function(e){
    	e.preventDefault();
	}, false);

	var lastRender = Date.now();

	// Initial state goes here
	scene = new World.World();

	function render() {
		requestAnimationFrame(render);
		var now = Date.now();
		var delta = (now-lastRender) / 1000.0;
		lastRender = now;
		if(delta > 0.5) return;

		scene.update(delta);
		scene.render(renderer);
	}

	render();

});