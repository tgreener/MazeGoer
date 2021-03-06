
var MazeGoer = function() {
	var STEP_COST = 1;
	var START_STAM = 100;
	var INITIAL_MAZE_SIZE = 6;

	var maze;
	var player = new Player();
	player.setStamina(START_STAM);
	
	var generateNewMaze = function(size) {
		maze = new Maze(size);
		player.setCurrentRoom(maze.getStartRoom());
		player.dropAllKeys();
		//console.log(player.getCurrentRoom().toString());
		//console.log(maze.getSize());
		
		var mop = new MazeObjectPopulator(maze);
		mop.populateMaze();
	}
	
	var removeRoomObject = function() {
		var room = this.getCurrentPlayerRoom();
		room.setObject(new MazeObject());
	}
	
	var step = function() {
		player.loseStamina(STEP_COST);
	}
	
	this.setEventHandlers = function() {		
		eventRegister.registerEventHandler("PICKUP", removeRoomObject.bind(this));
		eventRegister.registerEventHandler("STEP", step.bind(this));
	}
	
	this.restart = function() {
		player = new Player();	
		player.setStamina(START_STAM);
		generateNewMaze(INITIAL_MAZE_SIZE);
	}

	this.getMazeRoom = function(x, y) {
		return maze.getRoom(x, y);
	}

	this.getMazeSpaceSize = function()  {
		return maze.spaceSize();
	}

	this.getMazeDepth = function() {
		return maze.getDepth();
	}

	this.getStartMazeRoom = function() {
		return maze.getStartRoom();
	}

	this.getMazeSize = function() {
		return maze.getSize();
	}
	
	this.getStepCost = function() {
		return STEP_COST;
	}
	
	this.getStartingStamina = function() {
		return START_STAM;
	}
	
	this.getPlayerKeys = function() {
		return player.getKeys();
	}
	
	this.getPlayerStamina = function() {
		return player.getStamina();
	}

	this.getCurrentPlayerRoom = function() {
		return player.getCurrentRoom();
	}

	this.getCurrentPlayerRoomDoors = function() {
		return player.getCurrentRoom().getDoors();
	}

	this.getMazesCleared = function() {
		return player.getMazesCleared();
	}

	this.atDeepestRoom = function() {
		return player.getCurrentRoom().isDeepest();
	}

	this.playerFinishedMaze = function() {
		player.clearedMaze();
		generateNewMaze(INITIAL_MAZE_SIZE);
	}

	this.interact = function() {
		var room = this.getCurrentPlayerRoom();
		
		if(!room.getObject().exists() && this.atDeepestRoom()) {
			this.descend();
		}
		
		room.getObject().interact(player);
	}
	
	this.descend =  function() {
		eventRegister.triggerEvent("FINISH_MAZE");
		eventRegister.triggerEvent("STEP");
	}

	this.go = function(direction) {
		var currentRoom = this.getCurrentPlayerRoom();
		var doors = currentRoom.getDoors();
		var doorVal = doors[direction];
		var canGo = true;
	
		if(doorVal != 1) {
			if(doorVal == 2 && (player.getKeys() > 0)) {
				player.useKey();
				doors[direction] = 1;
			}
			canGo = false;
		}
		
		if(canGo) {
			var result = maze.getNextRoom(currentRoom, direction);
			if(result) {
				eventRegister.triggerEvent("STEP");
				player.setCurrentRoom(result);
			}
		}
	}

	generateNewMaze(INITIAL_MAZE_SIZE);
}

