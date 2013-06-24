
var MazeObjectsLayer = cc.LayerColor.extend({
	object: 0,
	
	init:function(object) {
		this._super(cc.c4b(0,0,0,0));
		this.object = object;
	},
	
	draw:function() {
		this._super();
		
		if(this.object.objectType() == 1) {
			this.drawKey();
		}
	},
	
	updateObject: function(o) {
		this.object = o;
	},
	
	drawKey: function() {
		//console.log("Drawing Key");		
		cc.renderContext.fillStyle = "#555555";
		cc.renderContext.strokeStyle = cc.renderContext.fillStyle;
		
		cc.drawingUtil.drawCircle(cc.p(0,0), 50, 0, 60, false);
	}
});
