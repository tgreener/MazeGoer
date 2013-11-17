
var MazeObjectsLayer = cc.LayerColor.extend({
	OBJECT_POSITION: 0,
	object: 0,
	keySprite: 0,
	porridgeSprite: 0,
	
	init:function(object) {
		this._super(cc.c4b(0,0,0,0));
		this.object = object;
		this.OBJECT_POSITION = new cc.p(winSize.width * 0.5, winSize.height * 0.5);
		
		this.keySprite = cc.Sprite.create(s_level1_key);
		this.keySprite.setPosition(this.OBJECT_POSITION);
		this.keySprite.setVisible(false);
		
		this.porridgeSprite = cc.Sprite.create(s_level1_porridge);
		this.porridgeSprite.setPosition(this.OBJECT_POSITION);
		this.porridgeSprite.setVisible(false);
	},
	
	onEnter:function() {
		this._super();
		this.addChild(this.keySprite);
		this.addChild(this.porridgeSprite);
	},
	
	draw:function() {
		this._super();	
		this.keySprite.setVisible(this.object.objectType() == 1);
		this.porridgeSprite.setVisible(this.object.objectType() == 2);
		
		/*if(this.object.objectType() == 2) {
			cc.renderContext.fillStyle = "#555555";
			cc.renderContext.strokeStyle = cc.renderContext.fillStyle;
		
			cc.drawingUtil.drawCircle(cc.p(0,0), 50, 0, 60, false);
		}*/
	},
	
	updateObject: function(o) {
		this.object = o;
	},
	
	interactionGeometryAtPoint: function(point) {
		var result = new MazeObjectGeometryDescription();
		var location = this.OBJECT_POSITION;
		var objectType = this.object.objectType();
		
		if(objectType == 1) {
			var type = MazeObjectGeometryDescription.Types.KEY;
			result.init(type, location, point);
		}
		else if(objectType == 2) {
			var type = MazeObjectGeometryDescription.Types.FOOD;
			result.init(type, location, point);
		}
		else {
			return 0;
		}
		
		return result;
	}
});
