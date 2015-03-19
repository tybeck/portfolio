ig.module( 

    'game.utils.storage'

)
.defines(function() {

	ig.merge(ig, {

		'coins': 0,

		'coins_level': 0,

		setLevelAmount: function () {

			this.coins_level = this.coins || 0;

		},

		rollbackToLevelAmount: function () {

			this.coins = this.coins_level || 0;

		},

		getCoinAmount: function () {

			return this.coins;

		},

		removeCoins: function (amount) {

			this.coins = Math.max(0, this.coins - amount);

			return this.coins;

		},

		addCoin: function (amount) {

			var amt = amount || 1;

			this.coins += amt;

			return this.coins;

		}

	});

});