ig.module(

	'game.entities.fish'

)
.requires(

	'impact.entity',

	'game.entities.player'

)
.defines(function() {
		
	ig.EntityFish = ig.global.EntityFish = ig.Entity.extend({
		
		'size': {

			x: 66, 
			y: 43 

		},

		'maxVel': {

			x: 100, 
			y: 100

		},

		'friction': {

			x: 150, 
			y: 0

		},

		'zIndex': 1,
		
		'type': ig.Entity.TYPE.B,

		'checkAgainst': ig.Entity.TYPE.A,

		'collides': ig.Entity.COLLIDES.PASSIVE,

		'animSheet': new ig.AnimationSheet('media/fish.png', 66, 43),
		
		'health': 1,

		'healthMax': 1,
		
		'speed': 20,

		'gravityFactor': 0,

		'waitTimer': null,

		'dead': false,
		
		'travelDirection': false,

		'flip': {

			'x': true

		},

		'travelX': 115,

		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('crawl', 0.2, [2, 1]);
			this.addAnim('dead', 1, [0], true);

			this.initialX = this.pos.x;

		},
		
		update: function() {

			if(this.travelDirection 
				&& (this.pos.x > this.initialX + this.travelX)) {

					this.travelDirection = !this.travelDirection;
					this.randomSpeed();

			} else if(!this.travelDirection 
				&& (this.pos.x < this.initialX)) {

					this.travelDirection = !this.travelDirection;
					this.randomSpeed();

			}

			this.currentAnim.flip.x = this.travelDirection ? false : true;

			this.vel.x = ((this.speed) * this.getDirection());

			if(this.waitTimer && this.waitTimer.delta() > 1) {

				this.kill();

			}

			this.parent();

		},

		getDirection: function() {

			return (this.travelDirection) ? 1 : -1;

		},

		randomSpeed: function() {

			this.speed = (Math.round(Math.random() * 20) + 10);

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

			if(!this.dead) {

				return other.receiveDamage(1, this);

			} 

		}

	});

});