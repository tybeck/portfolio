ig.module( 

	'game.main' 

)
.requires(

	'game.utils.extensions',
	'game.utils.storage',
	
	'plugins.touch-button',

	'game.screens.start',
	'game.screens.game'

)
.defines(function() {

	var startModule = ig.getModule('game.screens.start'),

		canvas = document.getElementById('canvas'),

		scale = (window.innerWidth < 640) ? 2 : 1;

	var width = window.innerWidth * scale,
		height = window.innerHeight * scale;

	ig.setupWidth = width;
	ig.setupHeight = height;

	var Main = {

		'events': {

			'navigationScroller': function navigationScroller() {

				setTimeout(function() { 
				
					window.scrollTo(0, 0); 
				
				}, 1);

			},

			'windowResize': function windowResize() {

				if(!ig.ua.mobile) {

					ig.setupWidth = window.innerWidth * scale;
					ig.setupHeight = window.innerHeight * scale;

					if(!ig.system) { return; }

					canvas.style.width = window.innerWidth + 'px';
					canvas.style.height = window.innerHeight + 'px';

					ig.system.resize(window.innerWidth * scale, window.innerHeight * scale);

					if(ig.game && ig.game.setupCamera) {

						ig.game.setupCamera();

					}

				}

				if(window.myTouchButtons) {
				
					window.myTouchButtons.align();
				
				}
			
			}

		},

		'proxy': function Proxy(fn, that) {

			return(function(ev) {
				
				fn.apply(that, [ev]);

			});

		},

		'init': function Init() {

			this.registerEvents();

			this.setup();

			this.run();
			
		},

		'registerEvents': function registerEvents() {

			ig.addEvent(window, 'load', this.events.navigationScroller);
			ig.addEvent(window, 'resize', this.events.windowResize);

		},

		'setup': function Setup() {

			ig.Sound.use = [ig.Sound.FORMAT.OGG];


			if(ig.ua.mobile) {

				ig.Sound.enabled = false;

				var buttonImage = new ig.Image('media/touch-buttons.png');

				myTouchButtons = new ig.TouchButtonCollection([
					new ig.TouchButton( 'left', {left: 0, bottom: 0}, 128, 128, buttonImage, 0),
					new ig.TouchButton( 'right', {left: 128, bottom: 0}, 128, 128, buttonImage, 1),
					new ig.TouchButton( 'shoot', {right: 128, bottom: 0}, 128, 128, buttonImage, 2),
					new ig.TouchButton( 'jump', {right: 0, bottom: 96}, 128, 128, buttonImage, 3)
				]);

			}

			canvas.style.width = window.innerWidth + 'px';
			canvas.style.height = window.innerHeight + 'px';

		},

		'run': function Run() {

			ig.main('#canvas', startModule, 60, ig.setupWidth, ig.setupHeight, 1);

		}

	}

	Main.init();

});
