
var TextLayer = cc.Layer.extend({
	clearedMazesLabel: null,
	keysLabel: null,

	init:function() {
		this._super(new cc.c4b(0,0,0,0));
		
	},

	onEnter:function() {
		this._super();
		this.clearedMazesLabel = cc.LabelTTF.create('Cleared: ',  'Arial', 24, cc.size(250,10), cc.TEXT_ALIGNMENT_Left);
		this.keysLabel = cc.LabelTTF.create('Keys: ', 'Arial', 24, cc.size(250,10), cc.TEXT_ALIGNMENT_Left);

		this.clearedMazesLabel.setPosition(winSize.width * 0.9375, winSize.height * 0.9444);
		this.keysLabel.setPosition(winSize.width * 0.9375, winSize.height * 0.88);
		
		this.addChild(this.clearedMazesLabel);
		this.addChild(this.keysLabel);
	}
});