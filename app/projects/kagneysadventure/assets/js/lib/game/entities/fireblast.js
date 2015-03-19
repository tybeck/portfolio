ig.module(

	'game.entities.fireblast'

)
.requires(

	'impact.entity',
	'impact.entity-pool'

)
.defines(function() {

	EntityFireblast = ig.Entity.extend({

		'_wmIgnore': true,

		'size': {
			
			x: 24, 
			y: 26

		},
		
		'offset': {
		
			x: 6, 
			y: 6

		},
		
		'maxVel': {
			
			x: 900, 
			y: 500
		
		},
		
		'bounciness': 1.2, 
		
		'type': ig.Entity.TYPE.NONE,
		
		'checkAgainst': ig.Entity.TYPE.B,

		'collides': ig.Entity.COLLIDES.PASSIVE,
			
		'animSheet': new ig.AnimationSheet('media/fireblast.png', 36, 36),

		'soundFireball': new ig.Sound('media/sounds/fireball.ogg'),
		
		'bounceCounter': 0,
		
		init: function(x, y, settings) {
			
			this.parent(x, y, settings);

			this.soundFireball.volume = .30;
			
			this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.vel.y = 250;
			
			this.addAnim( 'idle', 1, [0] );
			
			this.soundFireball.play();

		},
		
		reset: function(x, y, settings) {

			this.parent(x, y, settings);
			
			this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.vel.y = 250;

			this.soundFireball.play();
			
			this.bounceCounter = 0;
		
		},

		update: function() {

			this.parent();

			this.currentAnim.angle += ig.system.tick * 15;

		},
			
		handleMovementTrace: function(res) {

			this.parent(res);
			
			if(res.collision.x || res.collision.y || res.collision.slope) {

				this.bounceCounter++;

				if(this.bounceCounter > 4) {

					this.kill();

				}

			}

		},

		check: function(other) {
			
			if(other.handleCollision) other.handleCollision();
			if(other.handlePhysicsCollision) return other.handlePhysicsCollision(this);

			if(other.type == ig.Entity.TYPE.B && !other.cantHarm) {

				other.receiveDamage(2, this);
				
				this.kill();

			}
		
		}

	});

	ig.EntityPool.enableFor(EntityFireblast);


});
