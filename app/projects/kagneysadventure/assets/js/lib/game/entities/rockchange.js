ig.module(

	'game.entities.rockchange'

)
.requires(

	'impact.entity',

	'game.entities.fallingrock'

)
.defines(function() {
	
	EntityRockchange = ig.Entity.extend({

		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255, 0, 0, 0.7)',
		
		'size': {
			x: 32, 
			y: 32
		},
			
		triggeredBy: function(entity, trigger) {

			var x = (trigger.pos.x + (Math.round(Math.random() * trigger.size.x)));
			var y = (trigger.pos.y);

			ig.game.spawnEntity(EntityFallingrock, x, y);

		},
		
		update: function() {}
		
	});

});