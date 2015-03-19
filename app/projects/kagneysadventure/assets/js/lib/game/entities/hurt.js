ig.module(

	'game.entities.hurt'

)
.requires(

	'impact.entity'

)
.defines(function() {
	
	ig.EntityHurt = ig.global.EntityHurt = ig.Entity.extend({

		'_wmDrawBox': true,

		'_wmBoxColor': 'rgba(255, 0, 0, 0.7)',
		
		'size': {

			x: 32, 
			y: 32

		},

		damage: 1,
			
		triggeredBy: function(entity, trigger) {

			entity.receiveDamage(this.damage, this);

		},
		
		update: function() {}
		
	});

});