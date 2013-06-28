
var MazeGoer = function() {
	var maze;
	var player = new Player();
	
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
	
	this.setEventHandlers = function() {
		eventRegister.registerEventHandler("PICKUP_KEY", removeRoomObject.bind(this));
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
	
	this.getPlayerKeys = function() {
		return player.getKeys();
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
		generateNewMaze(5);
	}

	this.interact = function() {
		var room = this.getCurrentPlayerRoom();
		
		if(!room.getObject().exists() && this.atDeepestRoom()) {
			eventRegister.triggerEvent("FINISH_MAZE");
		}
		
		room.getObject().interact(player);
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
			player.setCurrentRoom(result);
		}
	}

	generateNewMaze(5);
}

