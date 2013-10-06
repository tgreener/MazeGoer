
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
		this.view.showGameOver();
	},

	onKeyUp: function(e) {
		if(this.gameOver) return;
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
		
		//console.log(touchPoint);
		
		var topPoint = new cc.p(winSize.width/2, winSize.height * 0.9);
		var bottomPoint = new cc.p(winSize.width/2, winSize.height * 0.1);
		var leftPoint = new cc.p(winSize.width * 0.3, winSize.height/2);
		var rightPoint = new cc.p(winSize.width * 0.7, winSize.height/2);
		
		var distanceBetweenPointsSquared = function(a, b) {
			return Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2);
		}
		
		var touchDecision = {
			name: "",
			distance: -1
		}
		
		var distanceToTop = distanceBetweenPointsSquared(topPoint, touchPoint);
		
		touchDecision.name = "top";
		touchDecision.distance = distanceToTop;
		
		var distanceToBottom = distanceBetweenPointsSquared(bottomPoint, touchPoint);
		
		if(distanceToBottom < touchDecision.distance) {
			touchDecision.name = "bottom";
			touchDecision.distance = distanceToBottom;
		}
		
		var distanceToLeft = distanceBetweenPointsSquared(leftPoint, touchPoint);
		
		if(distanceToLeft < touchDecision.distance) {
			touchDecision.name = "left";
			touchDecision.distance = distanceToLeft;
		}
		
		var distanceToRight = distanceBetweenPointsSquared(rightPoint, touchPoint);
		
		if(distanceToRight < touchDecision.distance) {
			touchDecision.name = "right";
			touchDecision.distance = distanceToRight;
		}
		
		var distanceToCenter = distanceBetweenPointsSquared(centerPos, touchPoint);
		
		if(distanceToCenter < touchDecision.distance) {
			touchDecision.name = "center";
			touchDecision.distance = distanceToCenter;
		}
		
		if(touchDecision.name === "center") {
			this.mazeGoer.interact();
		}
		else {
			this.mazeGoer.go(touchDecision.name);
		}
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
