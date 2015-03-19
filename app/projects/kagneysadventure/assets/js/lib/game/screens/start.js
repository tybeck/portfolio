ig.module( 

    'game.screens.start' 

)
.requires(

	'impact.game',

	'game.entities.fireball',
	'game.entities.fireblast',

    'game.levels.mainmenu'

)
.defines(function() {

	var img = null;

	ig.storeModule(this.name, ig.Game.extend({	
		
		'clearColor': '#D0F4F7',

		'gravity': 800,

		'title': new ig.Image('media/title.png'),
		
		'light': new ig.Image('media/light.png'),

		init: function() {

			ig.isPlaying = false;

			ig.input.bind(ig.KEY.SPACE, 'jump');
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

			this.loadLevel(LevelMainmenu);

		},

		update: function() {

			var playerEntity;

			if(ig.input.pressed('jump') || ig.mobileTouched) {

				ig.input.bind(ig.KEY.UP_ARROW, 'up');
				ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
				ig.input.bind(ig.KEY.P, 'pause');
				ig.input.bind(ig.KEY.U, 'upgrades');

				ig.input.bind(ig.KEY.Z, 'shoot');
				
				ig.system.setGame(ig.getModule('game.screens.game'));

				return;
			
			}

			if(ig.input.pressed('left')) {

				playerEntity = ig.getPlayerEntity();

				playerEntity.gotoPreviousSkin();

			} else if(ig.input.pressed('right')) {

				playerEntity = ig.getPlayerEntity();

				playerEntity.gotoNextSkin();

			}

			this.parent();

			this.screen.x = (this.backgroundMaps[0].pxWidth - ig.system.width) / 2;

		},

		draw: function() {

			this.parent();

			var cx = ig.system.width / 2;

			this.title.draw(cx - this.title.width / 2, 60);	

			this.light.draw(ig.system.width - this.light.width, 0);

		},

		loadLevel: function(data) {

			this.currentLevel = data;

			this.parent(data);

		}

	}));

	var openGame = function() {

		ig.mobileTouched = true;

	}

	window.addEventListener('touchstart', openGame, false);
	window.addEventListener('MSPointerDown', openGame, false);

});