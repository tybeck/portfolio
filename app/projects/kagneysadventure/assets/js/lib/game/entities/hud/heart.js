ig.module(

	'game.entities.hud.heart'

)
.requires(

	'impact.entity'

)
.defines(function() {

	ig.EntityHeartHUD = ig.global.EntityHeartHUD = ig.Entity.extend({

		'drawX': 45,

		'drawY': 72,

		'sheet': new ig.AnimationSheet('media/heart.png', 70, 70),

		'lefttopAnim': null,

		'righttopAnim': null,

		'leftbottomAnim': null,

		'rightbottomAnim': null,

		hasLeftTop: false,
		
		hasRightTop: false,
		
		hasLeftBottom: false,

		hasRightBottom: false,

		init: function(x, y, settings) {

			this.parent(x, y, settings);

			this.lefttopAnim = new ig.Animation(this.sheet, 1, [0]);
			this.righttopAnim = new ig.Animation(this.sheet, 1, [5]);
			this.leftbottomAnim = new ig.Animation(this.sheet, 1, [4]);
			this.rightbottomAnim = new ig.Animation(this.sheet, 1, [6]);

			ig.game.heart = this;

			if(settings &&
				settings.completed) {

					this.hasLeftTop = true;
					this.hasRightTop = true;
					this.hasLeftBottom = true;
					this.hasRightBottom = true;

			}

		},

		set: function(index) {

			switch(index) {

				case 0: this.hasLeftTop = true; break;
				case 1: this.hasRightTop = true; break;
				case 2: this.hasLeftBottom = true; break;
				case 3: this.hasRightBottom = true; break;

			}

		},
		
		update: function() {

			this.lefttopAnim.update();
			this.righttopAnim.update();
			this.leftbottomAnim.update();
			this.rightbottomAnim.update();

			this.lefttopAnim.alpha = this.hasLeftTop ? 1 : .5;
			this.righttopAnim.alpha = this.hasRightTop ? 1 : .5;
			this.leftbottomAnim.alpha = this.hasLeftBottom ? 1 : .5;
			this.rightbottomAnim.alpha = this.hasRightBottom ? 1 : .5;

			if(this.hasLeftBottom && this.hasRightTop
				&& this.hasLeftBottom && this.hasRightBottom) {

					ig.game.levelComplete = true;

			}

		},

		draw: function() {

			this.lefttopAnim.draw(0, this.drawY);
			this.righttopAnim.draw(this.sheet.width / 2 - 2, this.drawY);
			this.leftbottomAnim.draw(1, this.sheet.height / 2 - 3 + this.drawY);
			this.rightbottomAnim.draw(this.sheet.width / 2 - 5, 
				this.sheet.height / 2 - 3 + this.drawY);

		}

	});

});