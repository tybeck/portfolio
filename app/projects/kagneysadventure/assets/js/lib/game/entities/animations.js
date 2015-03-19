ig.module(

	'game.entities.animations'

)
.requires(

	'impact.entity'

)
.defines(function() {
	
	EntityAnimations = ig.Entity.extend({

		'_wmDrawBox': true,

		'_wmBoxColor': 'rgba(0, 0, 255, 0.7)',
		
		'size': {

			x: 32, 
			y: 32

		},

		animation: null,
		
		triggeredBy: function(entity, trigger) {

			if(this.animation == 'exitstats') {

				ig.game.showGameOver = true;

				entity.kill();

			} else if(entity.handleAnimationMovement) {

				entity.handleAnimationMovement(this.animation);

			}

		},
		
		update: function() { }

	});

});