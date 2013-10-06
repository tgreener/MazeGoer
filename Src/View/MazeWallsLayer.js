
var MazeWallsLayer = cc.LayerColor.extend({
	
	init:function(params) {
		this._super(params);
		
		this.lvl1RoomSprite = cc.Sprite.create(s_level1_wall_floor);
		this.lvl1RoomSprite.setPosition(winSize.width * 0.5, winSize.height * 0.5);
		this.lvl1RoomSprite.setVisible(true);
	},
	
	onEnter:function() {
		this._super();
		this.addChild(this.lvl1RoomSprite);
	},
	
	draw:function() {
		this._super()
		//this.drawFloor();
		this.drawWalls();

		/*cc.drawingUtil.drawCircle(cc.p(0,0), 30, 60, true);*/
	},
	
	drawWalls:function() {
		this.lvl1RoomSprite.setVisible(true);
	}
});