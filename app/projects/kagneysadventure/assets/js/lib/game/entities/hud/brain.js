ig.module(

	'game.entities.hud.brain'

)
.requires(

	'impact.entity'

)
.defines(function() {

	ig.EntityBrainHUD = ig.global.EntityBrainHUD = ig.Entity.extend({

		'drawX': 22,

		'drawY': 106,

		'sheet': new ig.AnimationSheet('media/brain.png', 30, 34),

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
			this.righttopAnim = new ig.Animation(this.sheet, 1, [1]);
			this.leftbottomAnim = new ig.Animation(this.sheet, 1, [2]);
			this.rightbottomAnim = new ig.Animation(this.sheet, 1, [3]);

			ig.game.brain = this;

			if(settings.completed) {

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

			this.lefttopAnim.draw(this.drawX, this.drawY);
			this.righttopAnim.draw(this.drawX + this.sheet.width + 1, this.drawY);
			this.leftbottomAnim.draw(this.drawX, this.sheet.height + 1 + this.drawY);
			this.rightbottomAnim.draw(this.drawX + this.sheet.width + 1, 
				this.sheet.height + this.drawY + 1);

		}

	});

});