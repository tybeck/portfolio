ig.module(
	
	'game.entities.box'

)
.requires(

	'impact.entity',

	'game.entities.fireball',
	'game.entities.heart'

)
.defines(function() {
	
	ig.EntityBox = ig.global.EntityBox = ig.Entity.extend({

		'size': {

			'x': 72,
			'y': 70

		},

		'offset': {

			'x': 2,
			'y': 0

		},

		'health': 1,

		'maxHealth': 1,

		'type': ig.Entity.TYPE.B,

		'checkAgainst': ig.Entity.TYPE.A,

		'collides': ig.Entity.COLLIDES.PASSIVE,
		
		'animSheet': new ig.AnimationSheet('media/sprite.png', 70, 70),

		'soundBreak': new ig.Sound('media/sounds/woodbreak.ogg'),
		
		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.addAnim('idle', 0.1, [168], true);

			this.soundBreak.volume = .30;

		},
			
		update: function() {		

			this.currentAnim.update();

		},

		handleCollision: function() {

			this.soundBreak.play();

		},

		kill: function() {

			ig.game.collisionMap.setTile(this.pos.x + this.size.x / 2, 
				this.pos.y + this.size.y / 2);

			if(this.spawnheart != null) {

		        ig.spawnEntityByChance(this, EntityHeart, 100, {

		        	'frame': this.spawnheart

		        });

			}

			this.parent();

		}

	});

});