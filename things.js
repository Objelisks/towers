/* Things database */
define(["physi", "models"], function(P, Models) {

return {
	// Actors
	Rabit: {
		geo: Models.Rabit.geometry,
		mat: Models.Rabit.materials[0],
		init: function() {
			this.playing = false;
			this.looping = false;
			this.direction = 0;
			this.velocity = new THREE.Vector2(0, 0);
			this.actions = ["jump", "wait"];
			this.doAction = function() {
				var action = this.actions.pickRandom();
				this[action]();
			};
			this.jump = function() {
				this.direction += Math.random() * 60-30;
				this.rotation.y = this.direction*Math.PI/180;
				this.velocity.set(Math.sin(this.direction*Math.PI/180), Math.cos(this.direction*Math.PI/180));
				this.play(true, false, function() {
					this.velocity.set(0, 0);
					this.doAction();
				});
			};
			this.wait = function() {
				this.waitTimer = Date.now() + Math.random() * 500 + 500;
			};
			this.doAction();
		},
		update: function(delta) {
			this.position.x += this.velocity.x * delta;
			this.position.z += this.velocity.y * delta;
			if(this.waitTimer && this.waitTimer < Date.now()) {
				this.waitTimer = null;
				this.doAction();
			}
		}
	},


	// Static
	Tree: {
		geo: Models.TreeA.geometry,
		mat: Models.TreeA.materials[0],
	},

	Rock: {
		geo: Models.RockB.geometry,
		mat: Models.RockB.materials[0]
	},
	

	// Buildings
	Tower: {
		geo: Models.Tower.geometry,
		mat: Models.Tower.materials[0]
	},

	House: {
		geo: Models.House1.geometry,
		mat: Models.House1.materials[0]
	},


	// Areas
	Area1: {
		geo: Models.Area1.geometry,
		mat: Models.Area1.materials[0]
	}
};

});