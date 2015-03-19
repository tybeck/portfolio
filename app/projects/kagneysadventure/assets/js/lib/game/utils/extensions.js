ig.module( 

    'game.utils.extensions'

)
.defines(function() {

	ig.merge(ig, {

		'byProbability': function byProbability() {

	        var i = 0,

	            l = 0,

	            probas = [],

	            functions = [],

	            sum = 0,

	            args = Object.prototype.toString.call(arguments[0]) === '[object Array]' ? 
	            	arguments[0] :  Array.prototype.slice.call(arguments);

	        args.push({
	            p: 0,
	            f: function () {}
	        });

	        for (i = 0, l = args.length; i < l; i++) {

	            var p = Math.abs(parseFloat(args[i].p)),
	                f = args[i].f;

	            if (/%/.test(args[i].p)) {
	                p = p / 100.0;
	            }

	            sum += p;

	            probas[i] = sum;
	            functions[i] = f;
	            
	        }

	        return(function probabilitilized() {

	            var random = Math.random();

	            for (i = 0, l = probas.length - 1; i < l && random >= probas[i]; i++) {
	                /* intentionally left empty */
	            }

	            return functions[i].apply(this, arguments);

	        });

		},

		'spawnEntityByChance': function spawnEntityByChance(destinationElement, spawnElement, chance, settings) {

			if(ig.game && destinationElement && spawnElement) {

				this.byProbability({

					'p': (chance + '%'),
					
					'f': function spawnByChance() {

						var spawnX = destinationElement.pos.x,

							spawnY = destinationElement.pos.y - (ig.game.collisionMap.tilesize / 2);

						if(ig.game.collisionMap.getTile(spawnX, spawnY)) {

							spawnY = destinationElement.pos.y;

						}

				        ig.game.spawnEntity(spawnElement, spawnX, 
				        	spawnY, settings);

					}

				})();

			}

		},

		'findNearbyEntityByType': function findNearbyEntities(sourceEntity, type) {

		    var nearestDistance = Infinity,
		    	nearestEntity = null;

		    for(var i = 0; i < ig.game.entities.length; i++) {

		        var ent = ig.game.entities[i];
		        var distance = sourceEntity.distanceTo(ent);

		        if(distance < nearestDistance && ent != sourceEntity) {
		        	
		        	if(ent instanceof type) {
		            
		            	nearestDistance = distance;
		            
		            	nearestEntity = ent;
		        	
		        	}

		        }

		    }

		    return({
		    	'entity': nearestEntity,
		    	'distance': nearestDistance
		    });

		},

		'getPlayerEntity': function getPlayerEntity() {

		    for(var i = 0; i < ig.game.entities.length; i++) {

		        var ent = ig.game.entities[i];

		        if(ent instanceof EntityPlayer) {
		        	
		        	return ent;

		        }

		    }

		},

		'getModule': function getModule(name) {

			return ig.store[name];

		},

		'storeModule': function storeModule(name, module) {

			if(!ig.store) ig.store = Object();

			ig.store[name] = module;

		},
 
		'addEvent': function addEvent(element, eventName, eventFn) {

			if(element.addEventListener) {
			
				element.addEventListener(eventName, eventFn, false);
			
			} else if(element.attachEvent) {
			
				element.attachEvent('on' + eventName, eventFn);
			
			} else {

				element['on' + eventName] = eventFn;
			
			}

		}

	});

});