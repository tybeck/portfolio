ig.module(

  'game.entities.spring'

)
.requires(
  
  'impact.entity',

  'game.entities.player'

)
.defines(function() {

  EntitySpring = ig.Entity.extend({

    soundJump: new ig.Sound('media/sounds/jump.ogg'),

    soundHurt: new ig.Sound('media/sounds/hurt.ogg'),

    'size': {
      
      'x': 79,
      'y': 50

    },

    'gravityFactor': 0,

    'type': ig.Entity.TYPE.B,

    'checkAgainst': ig.Entity.TYPE.A,

    'collides': ig.Entity.COLLIDES.PASSIVE,

    'animSheet': new ig.AnimationSheet('media/spring.png', 79, 50),

    'flip': false,

    'cantHarm': true,

    'waitTimer': null,

    'defaultSpringY' : -1000,

    init: function(x, y, settings) {

      this.parent(x, y, settings);

      this.addAnim('normal', 1, [0, 1]);

      this.settings = settings;

      if(this.settings.angle) {

        this.currentAnim.angle = this.angle;

      }

    },

    update: function() {

      if(this.waitTimer && this.waitTimer.delta() > .5) {

        this.currentAnim.gotoFrame(0);

        this.waitTimer = null;

      }

    },

    check: function(other) {

      if(other instanceof EntityPlayer) {

        if(!other.standing && other.vel.y > 0) {

          this.waitTimer = new ig.Timer();
          this.currentAnim.gotoFrame(1);
          
          var velY = (this.settings.spring && this.settings.spring.y) ? 
            this.settings.spring.y: this.defaultSpringY;

          var powerOf = (this.settings.spring && this.settings.spring.powerOf) ? 
            this.settings.spring.powerOf : 1.5;

          other.vel.y = velY;

          if(this.settings.angle) {

            other.accel.x = (this.settings.angle * Math.abs(velY)) * powerOf;
            other.vel.x = (this.settings.angle * Math.abs(velY)) * powerOf;

          }

        }

      }

    }

  });

});