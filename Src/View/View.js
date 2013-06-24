
var View = cc.Node.extend({
	doors: 0,
	walls: 0,
	objects: 0,
	text: 0,

	init: function(room){
		this._super();

		this.doors = new MazeDoorsLayer();
		this.doors.init(room.getDoors());

		this.walls = new MazeWallsLayer();
		this.walls.init(cc.c4b(50, 50, 50, 255));
		
		this.text = new TextLayer();
		this.text.init();
		
		this.objects = new MazeObjectsLayer();
		this.objects.init(room.getObject());
	},

	onEnter: function() {
		this._super();
		
		this.addChild(this.walls);
		this.addChild(this.doors);
		this.addChild(this.text);
		this.addChild(this.objects);

		this.updateMazesCleared(0);
		this.updateKeyCount(0);
	},

	updateRoom: function(room) {
		this.doors.updateDoors(room.getDoors());
		this.objects.updateObject(room.getObject());
	},

	updateMazesCleared: function(c) {
		this.text.clearedMazesLabel.setString("Cleared: " + c);
	},

	updateKeyCount: function(k) {
		this.text.keysLabel.setString("Keys: " + k);
	}
	
});