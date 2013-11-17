
var MazeDoorsLayer = cc.LayerColor.extend({
	
	doors:{},
	TOP_DOOR_POS: 0,
	RIGHT_DOOR_POS: 0,
	BOT_DOOR_POS: 0,
	LEFT_DOOR_POS: 0,

	init:function(d) {
		var DOOR_POS = 177;
	
		this._super(cc.c4b(0,0,0,0));
		
		this.locksLayer = new MazeLocksLayer();
		this.locksLayer.init();
		
		this.updateDoors(d);
		
		this.TOP_DOOR_POS = new cc.Point((winSize.width * 0.5), (winSize.height * 0.5) + DOOR_POS);
		this.BOT_DOOR_POS = new cc.Point((winSize.width * 0.5), (winSize.height * 0.5) - (DOOR_POS + 1));
		this.LEFT_DOOR_POS = new cc.Point((winSize.width * 0.5) - DOOR_POS, (winSize.height * 0.5));
		this.RIGHT_DOOR_POS = new cc.Point((winSize.width * 0.5) + (DOOR_POS + 1), (winSize.height * 0.5));
		
		this.topDoorSprite = cc.Sprite.create(s_level1_door);
		this.topDoorSprite.setRotation(0);
		this.topDoorSprite.setPosition(this.TOP_DOOR_POS);
		this.topDoorSprite.setVisible(false);
		
		this.bottomDoorSprite = cc.Sprite.create(s_level1_door);
		this.bottomDoorSprite.setRotation(180);
		this.bottomDoorSprite.setPosition(this.BOT_DOOR_POS);
		this.bottomDoorSprite.setVisible(false);
		
		this.leftDoorSprite = cc.Sprite.create(s_level1_door);
		this.leftDoorSprite.setRotation(-90);
		this.leftDoorSprite.setPosition(this.LEFT_DOOR_POS);
		this.leftDoorSprite.setVisible(false);
		
		this.rightDoorSprite = cc.Sprite.create(s_level1_door);
		this.rightDoorSprite.setRotation(90);
		this.rightDoorSprite.setPosition(this.RIGHT_DOOR_POS);
		this.rightDoorSprite.setVisible(false);
	},

	onEnter:function() {
		this._super();
		
		this.addChild(this.topDoorSprite);
		this.addChild(this.bottomDoorSprite);
		this.addChild(this.leftDoorSprite);
		this.addChild(this.rightDoorSprite);
		this.addChild(this.locksLayer);
		
		//console.log("Maze door layer entered");
	},

	draw:function() {
		this._super();

		cc.renderContext.fillStyle = "#e0e0c0";
		cc.renderContext.strokeStyle = "rgba(100,100,100,1)";

		this.topDoorSprite.setVisible(this.doors.top > 0);
		this.bottomDoorSprite.setVisible(this.doors.bottom > 0);
		this.leftDoorSprite.setVisible(this.doors.left > 0);
		this.rightDoorSprite.setVisible(this.doors.right > 0);
	},
	
	updateDoors:function(d) {
		this.doors = d;
		this.locksLayer.updateLocks(d);
	},
	
	interactionGeometryAtPoint: function(point) {
		var doorGeoDescs = new Array();
	
		if(this.doors.top) {
			var topGeoDesc = new MazeObjectGeometryDescription();
			topGeoDesc.init(MazeObjectGeometryDescription.Types.DOOR, this.TOP_DOOR_POS, point);
			topGeoDesc.setDirection("top");
			doorGeoDescs.push(topGeoDesc);
		}
		
		if(this.doors.right) {
			var rightGeoDesc = new MazeObjectGeometryDescription();
			rightGeoDesc.init(MazeObjectGeometryDescription.Types.DOOR, this.RIGHT_DOOR_POS, point);
			rightGeoDesc.setDirection("right");
			doorGeoDescs.push(rightGeoDesc);
		}
		
		if(this.doors.bottom) {
			var botGeoDesc = new MazeObjectGeometryDescription();
			botGeoDesc.init(MazeObjectGeometryDescription.Types.DOOR, this.BOT_DOOR_POS, point);
			botGeoDesc.setDirection("bottom");
			doorGeoDescs.push(botGeoDesc);
		}
		
		if(this.doors.left) {
			var leftGeoDesc = new MazeObjectGeometryDescription();
			leftGeoDesc.init(MazeObjectGeometryDescription.Types.DOOR, this.LEFT_DOOR_POS, point);
			leftGeoDesc.setDirection("left");
			doorGeoDescs.push(leftGeoDesc);
		}
		
		var result = 0;
		
		for(var i = 0; i < doorGeoDescs.length; i++) {
			var geoDesc = doorGeoDescs[i];
		
			//console.log(geoDesc.getDirection() + " dist: " + Math.sqrt(geoDesc.getDistance()));
			if(result == 0 || result.getDistance() > geoDesc.getDistance()) {
				result = geoDesc;
			}
		};
		
		return result;
	}
});