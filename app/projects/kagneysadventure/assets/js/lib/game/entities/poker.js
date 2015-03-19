ig.module(

  'game.entities.poker'

)
.requires(
  
  'impact.entity',

  'game.entities.player'

)
.defines(function() {

  EntityPoker = ig.Entity.extend({

    'size': {
      
      'x': 48,
      'y': 240

    },

    'gravityFactor': 0,

    'type': ig.Entity.TYPE.B,

    'checkAgainst': ig.Entity.TYPE.A,

    'collides': ig.Entity.COLLIDES.PASSIVE,

    'animSheet': new ig.AnimationSheet('media/poker.png', 48, 240),

    'sounds': [new ig.Sound('media/sounds/poke-1.ogg'), new ig.Sound('media/sounds/poke-2.ogg')],

    'flip': false,

    'dead': false,

	'liftY': 20,

	'pokeRange': 70,

	'cantHarm': true,

	'toggleDirection': true,

    'init': function Init(x, y, settings) {

      this.parent(x, y, settings);

      this.addAnim('normal', 1, [0]);
      this.addAnim('mad', 1, [1]);
      this.addAnim('dead', 1, [2]);

      this.settings = settings;

      this.initialY = this.pos.y;

      this.yAccel = (Math.random() * 40) + 75;
      this.yVel = (Math.random() * 20) + 15;

    },

    'distanceFromFeet': function distanceFromFeet(other) {

		var xd = (this.pos.x + this.size.x / 2) - (other.pos.x + other.size.x / 2); 
		var yd = (this.pos.y) - (other.pos.y + other.size.y);

		return Math.sqrt(xd * xd + yd * yd);

    },

    'update': function update() {

    	var nearestPlayer = ig.findNearbyEntityByType(this, EntityPlayer);
   	
    	if(!this.dead) {

	    	if(!this.doPoke) {

		    	if(nearestPlayer && nearestPlayer.distance < 250) {

		    		this.currentAnim = this.anims.mad;

		    		if(this.distanceFromFeet(nearestPlayer.entity) < 100) {

		    			if(this.pos.y >= this.settings.maxPoke) {

			    			this.sounds[Math.round(Math.random() * 1)].play();

			    			this.doPoke = true;

		    			}

		    		}

		    	} else {

		    		this.currentAnim = this.anims.normal;

					if(this.toggleDirection) {

						if(this.pos.y < (this.initialY - this.liftY)) {

							this.toggleDirection = !this.toggleDirection;

						}

						this.accel.y = -this.yAccel;
						this.vel.y = -this.yVel;

					} else {

						if(this.pos.y > this.initialY) {

							this.toggleDirection = !this.toggleDirection;
							this.pos.y = this.initialY;

						}

						this.accel.y = this.yAccel;
						this.vel.y = this.yVel;

					}

					this.parent();

		    	}

	    	} else {

				if(this.pos.y <= this.settings.maxPoke) {

					this.toggleDirection = false;
					this.doPoke = false;

				}

				this.accel.y = -this.yAccel * 100;
				this.vel.y = -this.yVel * 100;

	    		this.parent();

	    	}

    	}

    	

    },

    'check': function check(other) {

    	if(!this.dead) return other.receiveDamage(1, this);

    }

  });

});