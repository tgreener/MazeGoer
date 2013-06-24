
var MazeWallsLayer = cc.LayerColor.extend({
	
	draw:function() {
		this._super()
		this.drawWalls();
		this.drawFloor();

		/*cc.drawingUtil.drawCircle(cc.p(0,0), 30, 60, true);*/
	},

	drawWalls:function() {
		cc.renderContext.fillStyle = "#505050";
		cc.renderContext.strokeStyle = "#505050";

		var topWall = this.topWallArray();
		var rightWall = this.rightWallArray();
		var bottomWall = this.mirrorPointArray(topWall);
		var leftWall = this.mirrorPointArray(rightWall);

		cc.drawingUtil.drawPoly(topWall, 4, true, true);
		cc.drawingUtil.drawPoly(rightWall, 4, true, true);
		cc.drawingUtil.drawPoly(bottomWall, 4, true, true);
		cc.drawingUtil.drawPoly(leftWall, 4, true, true);

		cc.renderContext.strokeStyle = "#757575";

		cc.drawingUtil.drawLine(topWall[3], leftWall[2]);
		cc.drawingUtil.drawLine(topWall[2], rightWall[3]);
		cc.drawingUtil.drawLine(bottomWall[3], rightWall[2]);
		cc.drawingUtil.drawLine(bottomWall[2], leftWall[3]);
	},

	drawFloor:function() {
		cc.renderContext.fillStyle = "#e0e0e0";
		cc.renderContext.strokeStyle = "rgba(100,100,100,1)";

		cc.drawingUtil.drawPoly(this.floorArray(), 4, true, true);
	},

	floorArray:function() {
		var topWall = this.topWallArray();
		var rightWall = this.rightWallArray();
		var bottomWall = this.mirrorPointArray(topWall);
		var leftWall = this.mirrorPointArray(rightWall);

		var array = [leftWall[2], rightWall[3], rightWall[2], leftWall[3]];
		return array;
	},

	topWallArray:function() {
		var array = [4];
		var topLeft = new cc.Point();

		topLeft.x = (winSize.width/4) * -1;
		topLeft.y = (winSize.height/8) * 3;

		array[0] = topLeft;
		array[1] = new cc.Point(topLeft.x + winSize.width/2, topLeft.y);
		array[2] = new cc.Point(topLeft.x + winSize.width/2, topLeft.y + winSize.height/16);
		array[3] = new cc.Point(topLeft.x, topLeft.y + winSize.height/16);

		return array;
	},

	rightWallArray:function() {
		var array = [4];
		
		var topRight = new cc.Point();

		topRight.x = (winSize.width/4);
		topRight.y = ((winSize.height/8) * 3) + 1;

		array[0] = topRight;
		array[1] = new cc.Point(topRight.x, topRight.y * -1);
		array[2] = new cc.Point(topRight.x - winSize.width/16, topRight.y * -1);
		array[3] = new cc.Point(topRight.x - winSize.width/16, topRight.y);

		return array;
	},

	bottomWallArray:function() {
		return this.mirrorPointArray(this.topWallArray());
	},

	leftWallArray:function() {
		return this.mirrorPointArray(this.rightWallArray());
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