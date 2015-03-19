ig.module(

  'game.entities.player'

)
.requires(
  
  'impact.entity',

  'game.utils.storage'

)
.defines(function() {

  EntityPlayer = ig.Entity.extend({

    soundJump: new ig.Sound('media/sounds/jump.ogg'),

    soundHurt: new ig.Sound('media/sounds/hurt.ogg'),

    'size': {
      
      'x': 40,
      'y': 88

    },

    'offset': {

      'x': 17,
      'y': 10

    },

    'maxVel': {

      'x': 400,
      'y': 800

    },

    'friction': {

      'x': 800,
      'y': 0

    },

    'type': ig.Entity.TYPE.A,

    'checkAgainst': ig.Entity.TYPE.NONE,

    'collides': ig.Entity.COLLIDES.PASSIVE,

    'animSheet': new ig.AnimationSheet('media/player.png', 75, 100),

    'accelGround': 1200,

    'accelAir': 600,

    'animationSpeed': 250,

    'jump': 500,

    'maxHealth': 3,

    'health': 3,

    'flip': false,

    'currentSkinIndex': 0,

    'showUpgrades': false,

    'shootingEntity': null,

    'skinCount': 2,

    init: function(x, y, settings) {

      this.parent(x, y, settings);

      this.soundJump.volume = .30;
      this.soundHurt.volume = .30;

      if(ig.currentSkinIndex) {

        this.currentSkinIndex = ig.currentSkinIndex;

      }

      this.shootingEntity = EntityFireball;

      this.setCurrentSkin();

      ig.setLevelAmount();

      ig.game.player = this;

    },

    increaseHealth: function () {

      this.maxHealth ++;

      this.health ++;

    },

    increaseSpeed: function () {

      this.maxVel.x += 25;

      this.maxVel.y += 15;

    },

    setCurrentSkin: function () {

      ig.currentSkinIndex = this.currentSkinIndex;

      switch(this.currentSkinIndex) {

        case 0:

          this.addAnim('idle', 1, [15, 15, 15, 15, 15, 14]);
          this.addAnim('run', 0.07, [4, 5, 11, 0, 1, 2, 7, 8, 9, 3]);
          this.addAnim('jump', 1, [13]);
          this.addAnim('fall', 0.4, [13, 12], true);
          this.addAnim('pain', 0.3, [6], true);

        break;

        case 1:

          this.addAnim('idle', 1, [36, 36, 36, 36, 36, 35]);
          this.addAnim('run', 0.07, [24, 25, 32, 21, 22, 23, 28, 29, 30, 24]);
          this.addAnim('jump', 1, [34]);
          this.addAnim('fall', 0.4, [34, 33], true);
          this.addAnim('pain', 0.3, [27], true);

        break;

        case 2:

          this.addAnim('idle', 1, [43, 43, 43, 43, 43, 42]);
          this.addAnim('run', 0.15, [56, 57]);
          this.addAnim('jump', 1, [51]);
          this.addAnim('fall', 0.4, [51, 49], true);
          this.addAnim('pain', 0.3, [50], true);

        break;

      }

      this.currentAnim = this.anims.idle;

    },

    gotoNextSkin: function () {

      this.currentSkinIndex = ((this.currentSkinIndex + 1) >

        this.skinCount) ? 0 : ++this.currentSkinIndex;

      this.setCurrentSkin();

    },

    gotoPreviousSkin: function () {

      this.currentSkinIndex = ((this.currentSkinIndex - 1) <

        0) ? this.skinCount : --this.currentSkinIndex;

      this.setCurrentSkin();

    },

    handleAnimationMovement: function(name) {

      this.currentAnimation = name;

    },

    update: function() {

      var accel = this.standing ? this.accelGround : this.accelAir;

      if(!ig.game.gameComplete && ig.isPlaying) {

        if(this.onPlatform) this.gravityFactor = 0;
        
        if(ig.input.pressed('upgrades') && !this.showUpgrades) {

          ig.game.spawnEntity(EntityUpgrades, {

            'entity': this

          });

          this.showUpgrades = true;

        }

        if(ig.input.state('left')) {

          this.accel.x = -accel;
          this.flip = true;

        } else if(ig.input.state('right')) {

          this.accel.x = accel;
          this.flip = false;

        } else {

          this.accel.x = 0;

        }

        if(this.standing && ig.input.pressed('jump') 

          || (this.onPlatform && ig.input.pressed('jump'))) {

            this.onPlatform = false;

            this.gravityFactor = 1;
     
            this.vel.y = -this.jump;
            
            this.soundJump.play();

        }

        if(ig.input.pressed('shoot')) {

          ig.game.spawnEntity(this.shootingEntity, this.pos.x, 
            this.pos.y + 40, {

              flip: this.flip

          });

        }
        
        if(this.currentAnim == this.anims.pain &&

          this.currentAnim.loopCount < 1) {

            if(this.health <= 0) {

              var dec = (1 / this.currentAnim.frameTime) * ig.system.tick;

              this.currentAnim.alpha = (this.currentAnim.alpha - dec).limit(0,1);

            }

        } else if(this.health <= 0) {

          this.kill();

        } else if(this.vel.y < 0) {

          this.currentAnim = this.anims.jump;

        } else if(this.vel.y > 0) {

          if(this.currentAnim != this.anims.fall) {

            this.currentAnim = this.anims.fall.rewind();

          }

        } else if(this.vel.x != 0) {

          this.currentAnim = this.anims.run;

        } else {

          this.currentAnim = this.anims.idle;
        
        }
        
        this.currentAnim.flip.x = this.flip;

        if(this.isConfiguredForClimbing) {
          
          this.checkForLadder(this);
          
          if (this.ladderTouchedTimer.delta() > 0) {

            this.isTouchingLadder = false;
          
          }

        }

      } else {

        switch(this.currentAnimation) {

          case 'walkrightPlayer':

            this.vel.x = this.animationSpeed;

            this.currentAnim = this.anims.run;

          break;

        }

      }

      this.parent();

    },

    kill: function() {

      this.parent();

      ig.rollbackToLevelAmount();

      if(!ig.game.gameComplete) {

        ig.game.reloadLevel();

      }

    },

    receiveDamage: function(amount, from) {

      if(this.currentAnim == this.anims.pain) {

        return;

      }

      this.health -= amount;

      this.currentAnim = this.anims.pain.rewind();

      this.vel.x = (from.pos.x > this.pos.x) ? -400 : 400;

      if(from.damageDirection && from.damageDirection == 'up') {

        this.vel.y = 300;

      } else {
 
        this.vel.y = -300;

      }

      this.soundHurt.play();

    }

  });

});