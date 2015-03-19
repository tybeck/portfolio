ig.module(
	'game.entities.anvil'
)
.requires(
	
	'plugins.box2d.entity',

	'game.entities.fireball'

)
.defines(function() {

	EntityAnvil = ig.Box2DEntity.extend({

		'size': {

			x: 66, 
			y: 70
		
		},
		
		'type': ig.Entity.TYPE.B,

		'checkAgainst': ig.Entity.TYPE.NONE,

		'collides': ig.Entity.COLLIDES.PASSIVE,

		'hasPhysics': true,
		
		'zIndex': 0,

		animSheet: new ig.AnimationSheet( 'media/anvil.png', 66, 70 ),
		
		init: function(x, y, settings) {
			
			this.addAnim('idle', 1, [0]);

			this.parent(x, y, settings);

		},

		handlePhysicsCollision: function(other) {

			if(other instanceof EntityFireball) {

				this.body.ApplyForce(
					new Box2D.Common.Math.b2Vec2(
						other.vel.x * 8, 
						other.vel.y * 16
					), 
					this.body.GetPosition()
				);

			}

		}

	});

});