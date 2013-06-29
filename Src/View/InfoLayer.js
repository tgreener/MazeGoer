
var InfoLayer = cc.Layer.extend({
	clearedMazesLabel: null,
	keysLabel: null,
	playerStam: null,
	gameOverLabel: null,
	MAX_PLAYER_STAM: null,

	init:function(startingStam) {
		this._super(new cc.c4b(0,0,0,0));
		this.playerStam = startingStam;
		this.MAX_PLAYER_STAM = startingStam;
	},

	onEnter:function() {
		this._super();
		this.clearedMazesLabel = cc.LabelTTF.create('Cleared: ',  'Arial', 24, cc.size(250,10), cc.TEXT_ALIGNMENT_Left);
		this.clearedMazesLabel.setColor(new cc.Color3B(224, 224, 224));

		this.keysLabel = cc.LabelTTF.create('Keys: ', 'Arial', 24, cc.size(250,10), cc.TEXT_ALIGNMENT_Left);
		this.keysLabel.setColor(new cc.Color3B(224, 224, 224));
		
		this.gameOverLabel = cc.LabelTTF.create('Game Over', 'Gothic', 100, cc.size(500,100), cc.TEXT_ALIGNMENT_Left);
		this.gameOverLabel.setColor(new cc.Color3B(170, 70, 70));
		this.gameOverLabel.setVisible(false);

		this.clearedMazesLabel.setPosition(winSize.width * 0.9375, winSize.height * 0.9444);
		this.keysLabel.setPosition(winSize.width * 0.9375, winSize.height * 0.88);
		this.gameOverLabel.setPosition(new cc.p(winSize.width * 0.525, winSize.height * 0.525));
		
		this.addChild(this.clearedMazesLabel);
		this.addChild(this.keysLabel);
		this.addChild(this.gameOverLabel);
	},
	
	updateStaminaBar:function(stam) {
		playerStam = stam;
	},
	
	draw:function() {
		this._super();
		
		this.drawStaminaBar();
	},
	
	drawStaminaBar:function() {
		var coef = (this.playerStam / this.MAX_PLAYER_STAM);
		
		var w = winSize.width;
		var h = winSize.height;
		var leftX = w * (-11/32);
		var rightX = w * (-9/32);
		var topY = h * (7/16);
		var bottomY = topY - ((h * (7/8)) * coef);
		//console.log(topY + " " + bottomY);
		
		var stamBarPoints = [4];
		stamBarPoints[0] = new cc.Point(leftX, topY);
		stamBarPoints[1] = new cc.Point(leftX, bottomY);
		stamBarPoints[2] = new cc.Point(rightX, bottomY);
		stamBarPoints[3] = new cc.Point(rightX, topY);
		
		cc.renderContext.fillStyle = "#505050";
		cc.renderContext.strokeStyle = "#e0e0e0";
		cc.drawingUtil.drawPoly(stamBarPoints, 4, true, true);
		cc.drawingUtil.drawPoly(stamBarPoints, 4, true, false);
	}
});