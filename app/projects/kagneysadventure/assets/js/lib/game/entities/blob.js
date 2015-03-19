ig.module(

	'game.entities.blob'

)
.requires(

	'impact.entity',

	'game.entities.heart',
	'game.entities.player',
	'game.entities.coin'

)
.defines(function() {
		
	ig.EntityBlob = ig.global.EntityBlob = ig.Entity.extend({
		
		'size': {

			x: 59, 
			y: 28

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
		
		'health': 1,
		
		'speed': 40,

		'flip': {

			'x': false

		},

		'animSheet': new ig.AnimationSheet('media/blob.png', 59, 28),
		
		'soundDie': new ig.Sound('media/sounds/blob-die.ogg'),

		'waitTimer': null,

		'dead': false,
		
		init: function(x, y, settings) {

			this.parent(x, y, settings);

			if(settings && settings.blob) {

				switch(settings.blob.type) {

					case 1:

						this.addAnim('crawl', 0.2, [2, 1]);
						this.addAnim('dead', 1, [0], true);

						this.maxHealth = 2;
						this.health = 2;	

					break;

					case 2: 

						this.size.x = 91;
						this.size.y = 63;

						this.animSheet = new ig.AnimationSheet('media/big-blob.png', 91, 63);

						this.addAnim('crawl', 0.2, [2, 1]);
						this.addAnim('dead', 1, [0], true);

						this.maxHealth = 5;
						this.health = 5;

					break;

					default:

						this.addAnim('crawl', 0.2, [5, 4]);
						this.addAnim('dead', 1, [3], true);

					break;

				}

			} else {

				this.addAnim('crawl', 0.2, [5, 4]);
				this.addAnim('dead', 1, [3], true);

			}

		},
		
		update: function() {

			if(!ig.game.collisionMap.getTile(
				this.pos.x + (this.flip.x ? + 4 : this.size.x - 4),
				this.pos.y + this.size.y + 1
			)) {

				if(this.standing) {

					this.flip.x = !this.flip.x;

				}

			}

			this.currentAnim.flip.x = this.flip.x;

			if(!this.dead) {
				
				var xdir = this.flip.x ? -1 : 1;

				this.vel.x = this.speed * xdir;
				
				this.parent();

			} else {

				this.currentAnim.update();

			}

			if(this.waitTimer && this.waitTimer.delta() > 1) {

				this.kill();

			}

		},
		
		kill: function() {

			if(this.spawnheart != null) {

		        ig.spawnEntityByChance(this, EntityHeart, 100, {

		        	'frame': this.spawnheart

		        });

			}

			this.parent();
			
		},

		receiveDamage: function(amount, from) {

			if(!this.dead) {

				this.health -= amount;

				if(this.health <= 0) {

					ig.spawnEntityByChance(this, EntityCoin, 100);

					this.waitTimer = new ig.Timer();
					this.currentAnim = this.anims.dead;
					this.cantHarm = true;
					this.dead = true;

					this.soundDie.play();

				}

			}

		},
		
		handleMovementTrace: function(res) {

			this.parent(res);

			if(res.collision.x) {
				
				this.flip.x = !this.flip.x;
			
			}

		},
		
		check: function(other) {

			if(!this.dead) {

				return other.receiveDamage(1, this);

			}

		}

	});

});