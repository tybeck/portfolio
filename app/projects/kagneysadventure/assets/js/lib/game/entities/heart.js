ig.module(

	'game.entities.heart'

)
.requires(

	'impact.entity'

)
.defines(function() {
		
	ig.EntityHeart = ig.global.EntityHeart = ig.Entity.extend({
		
		'size': {
			
			x: 70,
			y: 70,

		},

		'type': ig.Entity.TYPE.B,

		'checkAgainst': ig.Entity.TYPE.A,

		'collides': ig.Entity.COLLIDES.PASSIVE,
		
		'animSheet': new ig.AnimationSheet('media/heart.png', 70, 70),

		'soundCollect': new ig.Sound('media/sounds/collect.ogg'),

		'toggleDirection': true,

		'liftY': 10,

		'speed': 1,

		'gravityFactor': 0,

		'cantHarm': true,

		'frame': null,
		
		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('leftTop', 1, [0], true);
			this.addAnim('rightTop', 1, [5], true);
			this.addAnim('leftBottom', 1, [4], true);
			this.addAnim('rightBottom', 1, [6], true);

			this.frame = settings.frame;

			this.size.x = 35;
			this.size.y = 30;

			this.offset.y = 40;
			this.offset.x = 15;

			switch(settings.frame) {

				case 0: this.currentAnim = this.anims.leftTop; break;
				case 1: this.currentAnim = this.anims.rightTop; break;
				case 2: this.currentAnim = this.anims.leftBottom; break;
				case 3: this.currentAnim = this.anims.rightBottom; break;

			}

			this.initialY = this.pos.y;

			this.soundCollect.volume = .15;

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

				this.soundCollect.play();

				ig.game.heart.set(this.frame);

				this.kill();

			}

		}

	});

});