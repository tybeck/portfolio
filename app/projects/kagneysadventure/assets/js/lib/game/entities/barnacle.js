ig.module(

	'game.entities.barnacle'

)
.requires(

	'impact.entity',

	'game.entities.heart',
	'game.entities.player'

)
.defines(function() {
		
	EntityBarnacle = ig.Entity.extend({
		
		'size': {

			x: 51, 
			y: 58

		},

		'offset': {

			x: 0, 
			y: 0

		},

		'maxVel': {

			x: 0, 
			y: 0

		},

		'friction': {

			x: 0, 
			y: 0

		},

		'zIndex': 1,
		
		'type': ig.Entity.TYPE.B,

		'checkAgainst': ig.Entity.TYPE.A,

		'collides': ig.Entity.COLLIDES.PASSIVE,
		
		'health': 1,
		
		'speed': 0,

		'flip': false,
		
		'animSheet': new ig.AnimationSheet('media/barnacle.png', 51, 58),

		'waitTimer': null,

		'dead': false,
		
		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('crawl', 0.2, [0, 1]);
			this.addAnim('dead', 1, [2]);
		
		},
		
		update: function() {

			this.currentAnim.update();

			if(this.waitTimer && this.waitTimer.delta() > 1) {

				this.kill();

			}

		},
		
		kill: function() {

			this.parent();
			
		},

		receiveDamage: function(amount, from) {

			if(!this.dead) {

				this.health -= amount;

				if(this.health <= 0) {

					this.waitTimer = new ig.Timer();
					this.currentAnim = this.anims.dead;
					this.cantHarm = true;
					this.dead = true;

				}

			}

		},
		
		check: function(other) {

			if(!this.dead) return other.receiveDamage(1, this);

		}

	});

});