
var View = cc.Node.extend({
	doors: 0,
	walls: 0,
	objects: 0,
	info: 0,
	stairs: 0,
	STAIRS_POS: 0,

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
		this.STAIRS_POS = new cc.Point(winSize.width * 0.39, winSize.height * 0.5);
		this.stairs.setPosition(this.STAIRS_POS);
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

	interactionGeometryAtPoint: function(point) {
		var stairsGeo = 0;
		
		if(this.stairs.isVisible()) {
			stairsGeo = new MazeObjectGeometryDescription();
			stairsGeo.init(MazeObjectGeometryDescription.Types.STAIRS, this.STAIRS_POS, point);
		}
		
		var interactiveGeometries = [this.doors.interactionGeometryAtPoint(point), 
									 this.objects.interactionGeometryAtPoint(point),
									 stairsGeo];
		var result = 0;
		
		interactiveGeometries.forEach(function(currentGeomDesc) {
			if(currentGeomDesc != 0 && (result == 0 || currentGeomDesc.getDistance() < result.getDistance())) {
				result = currentGeomDesc;
			}
		});
		
//		console.log(result.toString());
		return result;
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
	
	showGameOver:function(show) {
		this.info.gameOverLabel.setVisible(show);
	},
	
	updateStaminaBar: function(s) {
		//console.log(s);
		this.info.playerStam = s;
	}
});