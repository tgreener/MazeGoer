
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
	},

	onExit:function() {
		var director = cc.Director.getInstance();
		director.getKeyboardDispatcher().removeDelegate(this);
	},

	update:function(dt) {
		this._super(dt);
		
		if(this.mazeGoer.atDeepestRoom()) {
			this.finishMaze();
		}
		
		this.handleInput();

		this.view.updateRoom(this.mazeGoer.getCurrentPlayerRoom());
		this.view.updateKeyCount(this.mazeGoer.getPlayerKeys());
		this.keyPressed = 0;
	},

	finishMaze: function() {
		this.mazeGoer.playerFinishedMaze();
		this.keyPressed = 0;
		
		this.view.updateMazesCleared(this.mazeGoer.getMazesCleared());
	},

	onKeyUp: function(e) {
		this.keyPressed = e;
	},

	handleInput: function() {
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
