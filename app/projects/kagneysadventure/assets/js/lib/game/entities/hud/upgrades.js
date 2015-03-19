ig.module(

	'game.entities.hud.upgrades'

)
.requires(

	'impact.entity'

)
.defines(function() {

	ig.EntityUpgrades = ig.global.EntityUpgrades = ig.Entity.extend({
		
		'size': {

			x: 740, 
			y: 400

		},

		'zIndex': 1,
		
		'type': ig.Entity.TYPE.A,

		'checkAgainst': ig.Entity.TYPE.NONE,

		'collides': ig.Entity.COLLIDES.PASSIVE,
		
		'health': 9999,
		
		'animSheet': null,

		'hold': false,

		'entityScope': null,

		'entity': null,
		
		init: function(settings) {

			var self = this;

			self.settings = settings;

			self.parent(settings);

  			var $injector = angular.injector(['ng', 'KagneysAdvApp']);

  			$injector.invoke(function ($rootScope, $compile) {

				var body = angular.element(document.body);

				self.entityScope = $rootScope.$new(true);

				self.entity = $compile('<upgrades></upgrades>')(self.entityScope, function (clonedElement, scope) {
				 
					scope.invokeFn = self.invokedByUpgrade;

					scope.invokeScope = self;

					body.append(clonedElement);

				});

  			});

		},

		invokedByUpgrade: function (data) {

			var self = this;

			if(ig.getCoinAmount() >= data.cost) {

				ig.removeCoins(data.cost);

				var player = ig.game.player;

				switch(data.type) {

					case 'health':

						player.increaseHealth();

					break;

					case 'speed':

						player.increaseSpeed();

					break;

				}

				self.deconstruct();

			}

		},

		deconstruct: function () {

			var self = this;

    		self.entity.remove();
    		
    		self.entityScope.$destroy();

      		self.kill();

		},
		
		update: function() {

			var self = this;

	        if(ig.input.pressed('upgrades') && self.hold) {

        		if(self.settings && self.settings.entity) {
        		
        			self.settings.entity.showUpgrades = false;
        		
        		}

        		self.deconstruct();

	        }

	        self.hold = true;

		}

	});

});