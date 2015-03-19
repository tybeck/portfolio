ig.module(

	'game.entities.ghost'

)
.requires(

	'impact.entity',

	'game.entities.player'

)
.defines(function() {
		
	EntityGhost = ig.Entity.extend({
		
		'size': {

			x: 51, 
			y: 73

		},

		'maxVel': {

			x: 100, 
			y: 100

		},

		'friction': {

			x: 150, 
			y: 0

		},

		'gravityFactor': 0,

		'zIndex': 1,
		
		'type': ig.Entity.TYPE.B,

		'checkAgainst': ig.Entity.TYPE.A,

		'collides': ig.Entity.COLLIDES.PASSIVE,
		
		'health': 1,
		
		'speed': 70,

		'defaultSpeed': 70,

		'patrolRegion': 200,

		'jiggleRoom': 2,

		'maxSpeed': 130,

		'flip': false,
		
		'animSheet': new ig.AnimationSheet('media/ghost.png', 51, 73),

		'killTimer': null,

		'dead': false,
		
		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('crawl', 1, [0]);
			this.addAnim('agitated', 1, [1]);
			this.addAnim('dead', 1, [2]);

			this.initialX = this.pos.x;
			this.initialY = this.pos.y;
	
		},
		
		update: function() {

			this.currentAnim.flip.x = !this.flip;

			var nearestPlayer = ig.findNearbyEntityByType(this, EntityPlayer),
				
				currentX = this.pos.x,

				direction,

				followingPlayer = false;

			if(nearestPlayer.distance < 500) {

				direction = currentX > nearestPlayer.entity.pos.x ? false : true;

				if(!direction) {

					var damping = currentX - nearestPlayer.entity.pos.x;

					if(damping > 25) { 

						this.flip = true;

						this.offset.x = 0;

					}

				} else {

					var damping = nearestPlayer.entity.pos.x - currentX;

					if(damping > 25) { 

						this.flip = false;

					}

				}

				followingPlayer = true;

				if(!this.dead) this.currentAnim = this.anims.agitated;	

			} else {

				if(this.flip && (this.pos.x < this.initialX - this.patrolRegion)) {

					this.flip = !this.flip;

				} else if(!this.flip && (this.pos.x > this.initialX + this.patrolRegion)) {

					this.flip = !this.flip;

				}

				if(!this.dead) this.currentAnim = this.anims.crawl;

			}

			if(!this.dead) {
				
				var xdir = this.flip ? -1 : 1,
					ydir;

				if(!followingPlayer) {

					this.speed = this.defaultSpeed;

					var getJiggleRoom = Math.abs(this.pos.y - this.initialY);

					if(this.pos.y != this.initialY 
						&& getJiggleRoom > this.jiggleRoom) {

							var fixYDir = ((this.pos.y > this.initialY) ? -1 : 1);

							this.vel.y = (this.speed) * fixYDir;

							if(fixYDir == -1 && this.pos.y - this.initialY < 1) {
							
								this.pos.y = this.initialY;

							}

					} else {

						this.pos.y = this.initialY;
						this.vel.y = 0;

					}
					
				} else {

					this.speed = this.maxSpeed;

					if(this.pos.y > nearestPlayer.entity.pos.y) {

						ydir = -1;

					} else if(this.pos.y < nearestPlayer.entity.pos.y + nearestPlayer.entity.size.y) {

						ydir = 1;

					}

					this.vel.y = (this.speed / 2) * ydir;

				}

				this.vel.x = this.speed * xdir;

				this.parent();

			} else {

				this.currentAnim.update();

				this.parent();

			}

			if(this.killTimer && this.killTimer.delta() > 1) {

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

					this.killTimer = new ig.Timer();
					this.currentAnim = this.anims.dead;
					this.gravityFactor = 1;
					this.cantHarm = true;
					this.dead = true;

				}

			}

		},
		
		handleMovementTrace: function(res) {

			this.parent(res);

			if(res.collision.x) {
			
				this.flip = !this.flip;
			
			}

		},
		
		check: function(other) {

			if(!this.dead) return other.receiveDamage(1, this);

		}

	});

});