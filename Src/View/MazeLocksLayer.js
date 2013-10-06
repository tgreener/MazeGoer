
var MazeLocksLayer = cc.LayerColor.extend({

	top: false,
	bottom: false,
	left: false,
	right: false,
	
	init:function() {
		var LOCK_POS = 186;
		this._super(cc.c4b(0,0,0,0));
		
		this.topLockSprite = new cc.Sprite.create(s_level1_lock);
		this.topLockSprite.setRotation(0);
		this.topLockSprite.setPosition((winSize.width * 0.5), (winSize.height * 0.5) + (LOCK_POS - 1));
		
		this.bottomLockSprite = new cc.Sprite.create(s_level1_lock);
		this.bottomLockSprite.setRotation(180);
		this.bottomLockSprite.setPosition((winSize.width * 0.5), (winSize.height * 0.5) - LOCK_POS);
		
		this.leftLockSprite = new cc.Sprite.create(s_level1_lock);
		this.leftLockSprite.setRotation(-90);
		this.leftLockSprite.setPosition((winSize.width * 0.5) - (LOCK_POS - 1), (winSize.height * 0.5));
		
		this.rightLockSprite = new cc.Sprite.create(s_level1_lock);
		this.rightLockSprite.setRotation(90);
		this.rightLockSprite.setPosition((winSize.width * 0.5) + LOCK_POS, (winSize.height * 0.5));
	},
	
	onEnter:function() {
		this._super();
	
		this.addChild(this.topLockSprite);
		this.addChild(this.bottomLockSprite);
		this.addChild(this.leftLockSprite);
		this.addChild(this.rightLockSprite);
		
		console.log("locks layer entered");
	},
	
	draw:function() {
		this.topLockSprite.setVisible(this.top);
		this.bottomLockSprite.setVisible(this.bottom);
		this.leftLockSprite.setVisible(this.left);
		this.rightLockSprite.setVisible(this.right);
	},
	
	updateLocks:function(d) {
		this.top = d.top == 2;
		this.right = d.right == 2;
		this.bottom = d.bottom == 2;
		this.left = d.left == 2;
	}
});