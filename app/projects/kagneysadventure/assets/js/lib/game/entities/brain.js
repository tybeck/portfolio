ig.module(

	'game.entities.brain'

)
.requires(

	'impact.entity'

)
.defines(function() {
		
	EntityBrain = ig.Entity.extend({
		
		'size': {
			
			x: 30,
			y: 34,

		},

		'type': ig.Entity.TYPE.B,

		'checkAgainst': ig.Entity.TYPE.A,

		'collides': ig.Entity.COLLIDES.PASSIVE,
		
		'animSheet': new ig.AnimationSheet('media/brain.png', 30, 34),

		'soundCollect': new ig.Sound('media/sounds/collect.ogg'),

		'cantHarm': true,

		'frame': null,
		
		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('lefttop', 1, [0]);
			this.addAnim('righttop', 1, [1]);
			this.addAnim('leftbottom', 1, [2]);
			this.addAnim('rightbottom', 1, [3]);

			this.frame = settings.frame;

			switch(settings.frame) {

				case 0: this.currentAnim = this.anims.lefttop; break;
				case 1: this.currentAnim = this.anims.righttop; break;
				case 2: this.currentAnim = this.anims.leftbottom; break;
				case 3: this.currentAnim = this.anims.rightbottom; break;

			}

			this.soundCollect.volume = .15;

		},
		
		update: function() {

			this.currentAnim.update();

		},

		check: function(other) {

			if(other instanceof EntityPlayer) {

				this.soundCollect.play();

				ig.game.brain.set(this.frame);

				this.kill();

			}

		}

	});

});