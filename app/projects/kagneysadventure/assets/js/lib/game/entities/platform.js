ig.module(

	'game.entities.platform'

)
.requires(

	'impact.entity',

	'game.entities.heart',
	'game.entities.player'

)
.defines(function() {
		
	EntityPlatform = ig.Entity.extend({
		
		'size': {

			x: 280, 
			y: 40

		},

		'offset': {

			x: 0, 
			y: 0

		},

		'maxVel': {

			x: 100, 
			y: 0

		},

		'friction': {

			x: 150, 
			y: 0

		},

		'gravityFactor': 0,

		'cantHarm': true,

		'zIndex': 1,
		
		'type': ig.Entity.TYPE.B,

		'checkAgainst': ig.Entity.TYPE.A,

		'collides': ig.Entity.COLLIDES.PASSIVE,
		
		'health': 1,
		
		'speed': 80,

		'flip': false,
		
		'animSheet': new ig.AnimationSheet('media/platform.png', 280, 40),

		'entityAboard': null,

		'travelX': 400,

		'travelDirection': true,
		
		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);

			this.initialX = this.pos.x;
		
		},
		
		update: function() {

			this.currentAnim.update();

			if(this.entityAboard) {

				if((this.entityAboard.pos.x + (this.entityAboard.size.x)) < this.pos.x 
					|| (this.entityAboard.pos.x + (this.entityAboard.size.x / 4)) > 
						(this.pos.x + this.size.x)) {

							this.entityAboard.onPlatform = false;
							this.entityAboard.gravityFactor = 1;
							this.entityAboard = null;

				}

			}

			var xdir = (this.travelDirection) ? 1 : -1;

			if(this.travelDirection 
				&& (this.pos.x > this.initialX + this.travelX)) {

					this.travelDirection = !this.travelDirection;

			} else if(!this.travelDirection 
				&& (this.pos.x < this.initialX)) {

					this.travelDirection = !this.travelDirection;

			}

			this.vel.x = (this.speed) * xdir;

			this.parent();

		},
		
		check: function(other) {

			if(other instanceof EntityPlayer && !other.onPlatform) {

				other.pos.y = this.pos.y - other.size.y;
				other.onPlatform = true;
				other.vel.y = 0;

				this.entityAboard = other;

			}

		}

	});

});