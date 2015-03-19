ig.module(

	'game.entities.spinner'

)
.requires(

	'impact.entity',

	'game.entities.heart',
	'game.entities.player',
	'game.entities.coin'

)
.defines(function() {
		
	ig.EntitySpinner = ig.global.EntitySpinner = ig.Entity.extend({
		
		'size': {

			x: 63, 
			y: 31

		},

		'offset': {

			x: 0, 
			y: 0

		},

		'maxVel': {

			x: 100, 
			y: 100

		},

		'friction': {

			x: 150, 
			y: 0

		},
		
		'type': ig.Entity.TYPE.B,

		'checkAgainst': ig.Entity.TYPE.A,

		'collides': ig.Entity.COLLIDES.PASSIVE,

		'healthMax': 1,
		
		'health': 1,
		
		'speed': 50,
		
		'animSheet': new ig.AnimationSheet('media/spinner.png', 63, 31),

		'waitTimer': null,

		'dead': false,

		'side': false,
		
		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('idle', 0.2, [0, 1]);
			this.addAnim('dead', 1, [2], true);

		},
		
		update: function() {

			if(!ig.game.collisionMap.getTile(
				this.pos.x + (this.side ? + 4 : this.size.x -4),
				this.pos.y + this.size.y + 1
			)) {

				this.side = !this.side;

			}

			if(!this.dead) {
				
				var xdir = this.side ? -1 : 1;

				this.vel.x = this.speed * xdir;
				
				this.parent();

			}

			if(this.waitTimer && this.waitTimer.delta() > 1) {

				this.kill();

			}

		},
		
		kill: function() {

			if(this.spawnheart != null) {

		        ig.game.spawnEntity(EntityHeart, this.pos.x, this.pos.y, {

		        	'frame': this.spawnheart

		        });

			}

			this.parent();
			
		},

		receiveDamage: function(amount, from) {

			if(!this.dead) {

				this.health -= amount;

				if(this.health <= 0) {
					
					ig.spawnEntityByChance(this, EntityCoin, 15);

					this.waitTimer = new ig.Timer();
					this.currentAnim = this.anims.dead;
					this.cantHarm = true;
					this.dead = true;

				}

			}

		},
		
		handleMovementTrace: function(res) {

			this.parent(res);

			if(res.collision.x) {
			
				this.side = !this.side;
			
			}

		},
		
		check: function(other) {

			if(!this.dead) {
			
				return other.receiveDamage(1, this);
			
			}

		}

	});

});