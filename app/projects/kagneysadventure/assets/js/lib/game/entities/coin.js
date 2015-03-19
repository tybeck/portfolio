ig.module(

	'game.entities.coin'

)
.requires(

	'impact.entity'

)
.defines(function() {
	
	EntityCoin = ig.global.EntityCoin = ig.Entity.extend({

		'size': {

			x: 36, 
			y: 36

		},
		
		'type': ig.Entity.TYPE.B,

		'checkAgainst': ig.Entity.TYPE.A,

		'collides': ig.Entity.COLLIDES.PASSIVE,
		
		'animSheet': new ig.AnimationSheet('media/coin.png', 36, 36),

		'soundCollect': new ig.Sound('media/sounds/coin.ogg'),
		
		'value': 1,

		'toggleDirection': true,

		'liftY': 10,

		'speed': 1,

		'gravityFactor': 0,

		'cantHarm': true,

		init: function(x, y, settings) {
			
			this.parent(x, y, settings);

			this.addAnim('idle', 0.1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2]);

			this.initialY = this.pos.y;

			this.soundCollect.volume = .30;

		},
		
		update: function() {		

			this.currentAnim.update();

			if(this.toggleDirection) {

				if(this.pos.y < (this.initialY - this.liftY)) {

					this.toggleDirection = !this.toggleDirection;

				}

				this.accel.y = -35;
				this.vel.y = -7;

			} else {

				if(this.pos.y > this.initialY) {

					this.toggleDirection = !this.toggleDirection;
					this.pos.y = this.initialY;

				}

				this.accel.y = 35;
				this.vel.y = 7;

			}

			this.parent();

		},

		check: function(other) {

			if(other instanceof EntityPlayer) {

				ig.addCoin(this.value);
				this.soundCollect.play();
				this.kill();

			}

		}

	});

});