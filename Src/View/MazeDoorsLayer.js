
var MazeDoorsLayer = cc.LayerColor.extend({
	
	doors:{},

	init:function(d) {
		this._super(cc.c4b(0,0,0,0));
		this.updateDoors(d);
	},

	draw:function() {
		this._super();

		cc.renderContext.fillStyle = "#e0e0c0";
		cc.renderContext.strokeStyle = "rgba(100,100,100,1)";

		if(this.doors.top) {
			this.drawTopDoor();
		}
		if(this.doors.right) {
			this.drawRightDoor();
		}
		if(this.doors.bottom) {
			this.drawBottomDoor();
		}
		if(this.doors.left) {
			this.drawLeftDoor();
		}
	},
	
	drawTopDoor:function() {
		var array = this.getTopDoorArray();

		this.doorStyle(this.doors.top);

		cc.drawingUtil.drawPoly(array, 4, true, true);
	},

	getTopDoorArray:function() {
		var array = [4];
		
		var topLeft = new cc.Point((winSize.width/32) * -1, (winSize.height/32) * 13);
		
		array[0] = topLeft;
		array[1] = new cc.Point(winSize.width/32, topLeft.y);
		array[2] = new cc.Point(winSize.width/32, (winSize.height/8) * 3);
		array[3] = new cc.Point(topLeft.x, (winSize.height/8) * 3);

		return array;
	},

	drawRightDoor:function() {
		var array = this.getRightDoorArray();

		this.doorStyle(this.doors.right);

		cc.drawingUtil.drawPoly(array, 4, true, true);
	},

	getRightDoorArray:function() {
		var array = [4];
		
		var topLeft = new cc.Point((winSize.width/16) * 3, (winSize.height/16));
		
		array[0] = topLeft;
		array[1] = new cc.Point(topLeft.x + winSize.width/32, topLeft.y);
		array[2] = new cc.Point(topLeft.x + winSize.width/32, -topLeft.y);
		array[3] = new cc.Point(topLeft.x, -topLeft.y);

		return array;
	},

	drawBottomDoor:function() {
		var array = this.getBottomDoorArray();

		this.doorStyle(this.doors.bottom);

		cc.drawingUtil.drawPoly(array, 4, true, true);
	},

	getBottomDoorArray:function() {
		return this.mirrorPointArray(this.getTopDoorArray());
	},

	drawLeftDoor:function() {
		var array = this.getLeftDoorArray();

		this.doorStyle(this.doors.left);

		cc.drawingUtil.drawPoly(array, 4, true, true);
	},

	getLeftDoorArray:function() {
		return this.mirrorPointArray(this.getRightDoorArray());
	},
	
	updateDoors:function(d) {
		this.doors = d;
	},

	doorStyle: function(door) {
		if(door == 2) {
			cc.renderContext.fillStyle = "#666666";
		}
		else {
			cc.renderContext.fillStyle = "#e0e0c0";
		}
	},

	mirrorPointArray:function(a) {
		var array = [a.length];

		for(var i = 0; i < a.length; i++) {
			array[i] = new cc.Point(0);
			array[i].x = -a[i].x;
			array[i].y = -a[i].y;
		}

		return array;
	}
});