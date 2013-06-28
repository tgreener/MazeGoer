
var MazeObjectsLayer = cc.LayerColor.extend({
	object: 0,
	keySprite: 0,
	
	init:function(object) {
		this._super(cc.c4b(0,0,0,0));
		this.object = object;
		
		this.keySprite = cc.Sprite.create(s_key);
		this.keySprite.setPosition(winSize.width * 0.5, winSize.height * 0.5);
		this.keySprite.setVisible(false);
	},
	
	onEnter:function() {
		this.addChild(this.keySprite);
	},
	
	draw:function() {
		this._super();	
		this.keySprite.setVisible(this.object.objectType() == 1);
	},
	
	updateObject: function(o) {
		this.object = o;
	},
	
	drawKey: function() {
		//console.log("Drawing Key");		
		/*cc.renderContext.fillStyle = "#555555";
		cc.renderContext.strokeStyle = cc.renderContext.fillStyle;
		
		cc.drawingUtil.drawCircle(cc.p(0,0), 50, 0, 60, false);*/
		
		this.keySprite.setVisible(true);
	}
});
