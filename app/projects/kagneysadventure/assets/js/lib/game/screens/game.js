ig.module( 

    'game.screens.game' 

)
.requires(

	'plugins.box2d.game',

	'plugins.camera',

	'game.entities.player',

	'game.entities.hud.heart',
	'game.entities.hud.brain',
	'game.entities.hud.upgrades',

	'game.levels.1',
	'game.levels.2',
	'game.levels.3',
	'game.levels.gamecomplete'

)
.defines(function() {

	ig.storeModule(this.name, ig.Box2DGame.extend({
		
		'clearColor': '#D0F4F7',

		'gravity': 800,

		'currentLevel': null,

		'currentLevelName': null,

		'levelComplete': false,

		'gameComplete': false,

		'heartFull': new ig.Image('media/heart-full.png'),

		'heartEmpty': new ig.Image('media/heart-empty.png'),

		'collectedText': new ig.Image('media/collected.png'),

		'lvlComplete': new ig.Image('media/levelcomplete.png'),

		'gameoverImage': new ig.Image('media/gameover.png'),

		'coinIcon': new ig.Image('media/coin.png'),

		'font': new ig.Font('media/fredoka-one.font.png'),

		'isPaused': false,

		'isMultiplayer': false,

		'cachedLevels': Object(),

		init: function() {

			ig.merge(this.cachedLevels, {

				'1': Level1,

				'2': Level2,

				'3': Level3

			});

			this.loadLevel(this.getCachedLevel('1'), '1');

			this.font.letterSpacing = -2;

			if(window.myTouchButtons) {

				window.myTouchButtons.align();

			}

		},

		'getCachedLevel': function getCachedLevel(name) {

			var lvl = this.cachedLevels[name];

			return(lvl ? JSON.parse(JSON.stringify(lvl)) : null);

		},

		loadLevel: function(data, name) {

			ig.isPlaying = true;

			this.currentLevel = data;

			if(name) {

				this.currentLevelName = name;

			}

			var currentLevelName = name || this.currentLevelName,

				cachedLevel = this.getCachedLevel(this.currentLevelName);

			this.parent(cachedLevel || data);

			switch(currentLevelName.toString()) {

				case '1':

					ig.game.spawnEntity(EntityHeartHUD);
					ig.game.clearColor = '#D0F4F7';

				break;

				case '2':

					ig.game.spawnEntity(EntityBrainHUD);
					ig.game.clearColor = '#869595';


				break;

				case '3':

					ig.game.clearColor = '#FFECFF';

				break;

			}

			if(ig.game.gameComplete) {

				ig.game.clearColor = '#D0F4F7';

				ig.game.spawnEntity(EntityHeartHUD, null, null, {

					'completed': true

				});

				ig.game.spawnEntity(EntityBrainHUD, null, null, {

					'completed': true,
					'drawX': 100

				});

			}

			this.cameraStart();

		},

		loadLevelByTrigger: function(data, name, completed) {

			this.currentLevel = data;
			
			if(name) {

				this.currentLevelName = name;

			}

			if(completed == 'true') {

				ig.game.gameComplete = true;

			}

			ig.game.levelComplete = false;

			var cachedLevel = this.getCachedLevel(this.currentLevelName);

			this.loadLevelDeferred(cachedLevel || this.currentLevel);

		},

		reloadLevel: function() {

			ig.game.levelComplete = false;

			this.loadLevelDeferred(this.currentLevel);

		},

		cameraStart: function() {

			this.camera = new ig.Camera( ig.system.width / 3, ig.system.height / 3, 3);

	    	this.camera.trap.size.x = ig.system.width / 10;
	    	this.camera.trap.size.y = ig.system.height / 3;
			
	    	this.camera.lookAhead.x = ig.system.width / 6;

	    	this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
	    	this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;

	    	this.camera.set(ig.game.player);

		},

		update: function() {

			if(ig.input.pressed('pause')) {

				this.isPaused = !this.isPaused;

			}

			if(this.isPaused && !this.isMultiplayer) {

				return;

			}

			this.camera.follow(ig.game.player);

			this.parent();

		},

		isGameOver: function () {

			if(ig.game.showGameOver) {

				this.gameoverImage.draw(ig.system.width / 2 - 
					this.gameoverImage.width / 2, 60);

			}

			return this;

		},

		drawPlayerHUD: function () {

			var startX = 16,

				collectedY = 8,

				x = startX,

				y = 16;

			if(this.player) {

				for(var i = 0; i < this.player.maxHealth; i++) {

					if(this.player.health > i) {

						this.heartFull.draw(x, y);

					} else {

						this.heartEmpty.draw(x, y);

					}

					x += this.heartEmpty.width + 8;

				}

				var coinHeight = 36,

					coinY = (y + 6);

				var fontX = (x + coinHeight + 20);

				this.coinIcon.drawTile(x + 15, coinY, 0, coinHeight);

				this.font.draw('x ' + ig.getCoinAmount(), fontX, coinY);

			}

			this.collectedText.draw(startX, y + this.heartFull.height + 
				this.collectedText.height / 2 + collectedY);

			return this;

		},

		drawUpgradeHUD: function () {

			return this;

		},

		isLevelOver: function () {

			if(!ig.game.gameComplete) {

				if(this.levelComplete) {

					this.lvlComplete.draw(ig.system.width / 2 - 
						this.lvlComplete.width / 2, 60);

				}

			}

			return this;

		},

		draw: function() {

			if(this.isPaused && !this.isMultiplayer) {

				return;

			}

			this.parent();

			this.isGameOver()
				.isLevelOver()
				.drawPlayerHUD()
				.drawUpgradeHUD();

			if(window.myTouchButtons) {
			
				window.myTouchButtons.draw();
			
			}

		}

	}));

});