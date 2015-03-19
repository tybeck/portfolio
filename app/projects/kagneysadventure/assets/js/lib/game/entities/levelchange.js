ig.module(

	'game.entities.levelchange'

)
.requires(

	'impact.entity'

)
.defines(function() {
	
	ig.EntityLevelchange = ig.global.EntityLevelchange = ig.Entity.extend({

		'_wmDrawBox': true,

		'_wmBoxColor': 'rgba(0, 0, 255, 0.7)',
		
		'size': {

			x: 32, 
			y: 32

		},

		'level': null,
		
		triggeredBy: function(entity, trigger) {

			if(ig.game.levelComplete &&
				this.level) {

					ig.game.loadLevelByTrigger(
						ig.global['Level' + this.level], this.level, this.complete);

			}

		},
		
		update: function() {}

	});

});