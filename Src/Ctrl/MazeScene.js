
var MazeScene = cc.Scene.extend({
	mazeGoer: new MazeGoer(),
	view: 0,
	keyPressed:0,

	onEnter:function() {
		this._super();

		this.view = new View();
		this.view.init(this.mazeGoer.getCurrentPlayerRoom());

		this.addChild(this.view);

		var director = cc.Director.getInstance();
		director.getKeyboardDispatcher().addDelegate(this);
		
		this.schedule(this.update);
		
		eventRegister.addEvent("PICKUP_KEY");
		eventRegister.addEvent("USE_KEY");
		eventRegister.addEvent("FINISH_MAZE");
		
		eventRegister.registerEventHandler("PICKUP_KEY", this.updateKeys.bind(this));
		eventRegister.registerEventHandler("USE_KEY", this.updateKeys.bind(this));
		eventRegister.registerEventHandler("FINISH_MAZE", this.finishMaze.bind(this));
		
		this.mazeGoer.setEventHandlers();
	},

	onExit:function() {
		var director = cc.Director.getInstance();
		director.getKeyboardDispatcher().removeDelegate(this);
	},

	update:function(dt) {
		this._super(dt);

		this.view.updateRoom(this.mazeGoer.getCurrentPlayerRoom());
	},
	
	updateKeys:function() {
		this.view.updateKeyCount(this.mazeGoer.getPlayerKeys());
	},
	
	updateMazesCleared:function() {
		this.view.updateMazesCleared(this.mazeGoer.getMazesCleared());
	},

	finishMaze: function() {
		this.mazeGoer.playerFinishedMaze();
		
		this.updateMazesCleared();
		this.updateKeys();
	},

	onKeyUp: function(e) {
		this.keyPressed = e;
		this.handleKeyboardInput();
		this.keyPressed = 0;
	},

	handleKeyboardInput: function() {
		if(this.keyPressed === cc.KEY.up) {
			this.mazeGoer.go("top");
		}

		if(this.keyPressed === cc.KEY.right) {
			this.mazeGoer.go("right");
		}

		if(this.keyPressed === cc.KEY.down) {
			this.mazeGoer.go("bottom");
		}

		if(this.keyPressed === cc.KEY.left) {
			this.mazeGoer.go("left");
		}
		
		if(this.keyPressed === cc.KEY.space) {
			this.mazeGoer.interact();
		}	
	}
}); 
