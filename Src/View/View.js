
var View = cc.Node.extend({
	doors: 0,
	walls: 0,
	objects: 0,
	info: 0,
	stairs: 0,

	init: function(room, startingStam){
		this._super();

		this.doors = new MazeDoorsLayer();
		this.doors.init(room.getDoors());

		this.walls = new MazeWallsLayer();
		this.walls.init(cc.c4b(40, 40, 40, 255));
		
		this.info = new InfoLayer();
		this.info.init(startingStam);
		
		this.objects = new MazeObjectsLayer();
		this.objects.init(room.getObject());
		
		this.stairs = cc.Sprite.create(s_level1_downstairs);
		this.stairs.setPosition(winSize.width * 0.4, winSize.height * 0.5);
		this.stairs.setVisible(false);
	},

	onEnter: function() {
		this._super();
		
		this.addChild(this.walls);
		this.addChild(this.doors);
		this.addChild(this.info);
		this.addChild(this.objects);
		this.addChild(this.stairs);

		this.updateMazesCleared(0);
		this.updateKeyCount(0);
	},

	updateRoom: function(room) {
		this.doors.updateDoors(room.getDoors());
		this.objects.updateObject(room.getObject());
		
		this.stairs.setVisible(room.isDeepest());
	},

	updateMazesCleared: function(c) {
		this.info.clearedMazesLabel.setString("Cleared: " + c);
	},

	updateKeyCount: function(k) {
		this.info.keysLabel.setString("Keys: " + k);
	},
	
	showGameOver:function() {
		this.info.gameOverLabel.setVisible(true);
	},
	
	updateStaminaBar: function(s) {
		//console.log(s);
		this.info.playerStam = s;
	}
});