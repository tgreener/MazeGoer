
var MazeScene = cc.Scene.extend({
	mazeGoer: new MazeGoer(),
	view: 0,
	keyPressed:0,
	gameOver: false,

	onEnter:function() {
		this._super();

		this.view = new View();
		this.view.init(this.mazeGoer.getCurrentPlayerRoom(), this.mazeGoer.getStartingStamina());

		this.addChild(this.view);

		var director = cc.Director.getInstance();
		director.getKeyboardDispatcher().addDelegate(this);
		director.getTouchDispatcher().addStandardDelegate(this, 1);
		
		this.schedule(this.update);
		
		eventRegister.addEvent("PICKUP_KEY");
		eventRegister.addEvent("PICKUP");
		eventRegister.addEvent("USE_KEY");
		eventRegister.addEvent("FINISH_MAZE");
		eventRegister.addEvent("STEP");
		eventRegister.addEvent("STAM_LOST");
		eventRegister.addEvent("STAM_GAINED");
		eventRegister.addEvent("STAM_DEPLETED");
		
		eventRegister.registerEventHandler("PICKUP_KEY", this.updateKeys.bind(this));
		eventRegister.registerEventHandler("USE_KEY", this.updateKeys.bind(this));
		eventRegister.registerEventHandler("FINISH_MAZE", this.finishMaze.bind(this));
		eventRegister.registerEventHandler("STAM_LOST", this.updateStaminaBar.bind(this));
		eventRegister.registerEventHandler("STAM_GAINED", this.updateStaminaBar.bind(this));
		eventRegister.registerEventHandler("STAM_DEPLETED", this.updateStaminaBar.bind(this));
		eventRegister.registerEventHandler("STAM_DEPLETED", this.loseGame.bind(this));
		
		this.mazeGoer.setEventHandlers();
	},

	onExit:function() {
		var director = cc.Director.getInstance();
		director.getKeyboardDispatcher().removeDelegate(this);
	},

	update:function(dt) {
		this._super(dt);
		if(this.gameOver) return;
		
		this.view.updateRoom(this.mazeGoer.getCurrentPlayerRoom());
		//console.log(this.mazeGoer.getPlayerStamina());
	},
	
	updateStaminaBar:function() {
		this.view.updateStaminaBar(this.mazeGoer.getPlayerStamina());
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
	
	loseGame: function() {
		this.gameOver = true;
		this.view.showGameOver(true);
	},
	
	restartGame: function() {
		this.gameOver = false;
		this.mazeGoer.restart();
		
		this.view.showGameOver(false);		
		this.updateMazesCleared();
		this.updateKeys();
		this.updateStaminaBar();
	},

	onKeyUp: function(e) {
		this.keyPressed = e;
		this.handleKeyboardInput();
		this.keyPressed = 0;
	},
	
	onTouchesEnded: function(touches, event) {
		var touchPoint = touches[0].getLocation();
		//console.log(winSize);
		
		if(touchPoint.x < 0 || touchPoint.y < 0 ||
		   touchPoint.x > winSize.width || touchPoint.y > winSize.height) {
			return;
		}
		
		if(!this.gameOver) {
			var geoDesc = this.view.interactionGeometryAtPoint(touchPoint);
		
			if(geoDesc == 0) {
				return;
			}
			else if(geoDesc.getType() == MazeObjectGeometryDescription.Types.DOOR) {
				this.mazeGoer.go(geoDesc.getDirection());
			}
			else if(geoDesc.getType() == MazeObjectGeometryDescription.Types.KEY) {
				this.mazeGoer.interact();
			}
			else if(geoDesc.getType() == MazeObjectGeometryDescription.Types.FOOD) {
				this.mazeGoer.interact();			
			}
			else if(geoDesc.getType() == MazeObjectGeometryDescription.Types.STAIRS) {
				this.mazeGoer.descend();
			}
		}
		else {
			this.restartGame();
			return;
		}
	},

	handleKeyboardInput: function() {
		if(!this.gameOver) {
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
		else {
			if(this.keyPressed === cc.KEY.space) {
				this.restartGame();
				return;
			}
		}
	}
}); 
