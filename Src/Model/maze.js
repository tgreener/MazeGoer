
var Maze = function(spaceSize) {
	// There is a one in this number chance of a
	// locked door spawning. Must be an integer.
	var CHANCE_OF_LOCK = Math.round(spaceSize * 1);

	var space;
	var size = 0;
	var start = [];
	var greatestDepth = -1;
	var deepestRoom;
	var deepestRoomData;
	
	var randomInteger = Maze.randomInteger;
	
	this.generate = function() {
		//console.log("Generating...");
		//console.log("Creating space...");
		createSpace();
		//console.log("Creating start position...");
		start = getStartPosition();
		
		//console.log("Beginning Depth First Generation...");
		generate(start, {depth: 0, lockLevel: 0, deepest: false});
		deepestRoomData.deepest = true;
	}

	this.spaceSize = function() {
		return spaceSize;
	}

	this.getRoom = function(x, y) {
		return space[x][y];
	}

	this.getDeepestRoom = function() {
		return deepestRoom;
	}

	this.getDepth = function() {
		return greatestDepth;
	}

	this.getNextRoom = function(room, door) {
		var result;
		var x = room.getPosition()[0];
		var y = room.getPosition()[1];

		if(door == "top" && room.getDoors()["top"] != Maze.DoorStatus.NO_DOOR) {
			return this.getRoom(x, y + 1)
		}

		if(door == "right" && room.getDoors()["right"] != Maze.DoorStatus.NO_DOOR) {
			return this.getRoom(x + 1, y)
		}

		if(door == "bottom" && room.getDoors()["bottom"] != Maze.DoorStatus.NO_DOOR) {
			return this.getRoom(x, y - 1)
		}

		if(door == "left" && room.getDoors()["left"] != Maze.DoorStatus.NO_DOOR) {
			return this.getRoom(x - 1, y)
		}

		return 0;
	}

	this.getStartRoom = function() {
		return space[start[0]][start[1]];
	}

	this.getSize = function() {
		return size;
	}

	var generate = function(cell, roomData) {
		//console.log("Check for room creation at " + cell);
		var x = cell[0];
		var y = cell[1];

		if(cellInBounds(cell) && typeof space[x][y] != "object") {
			//console.log("Creating room #" + (size + 1) + " at " + cell);
			
			var newRoom = createRoom(cell, roomData);
			//console.log(newRoom.toString());
			space[x][y] = newRoom;
			size++;
			if(roomData.depth > greatestDepth) {
				greatestDepth = roomData.depth;
				deepestRoom = newRoom;
				deepestRoomData = roomData;
			}

			var doors = newRoom.getDoors();
			if(doors.top) {
				var nextCell = [2];
				nextCell[0] = x;
				nextCell[1] = y + 1;
				if(!generate(nextCell, nextRoomData(doors.top, roomData))) {
					newRoom.getDoors().top = 0;
				}
				else {
					space[nextCell[0]][nextCell[1]].getDoors().bottom = 1;
				}
			}

			if(doors.right) {
				var nextCell = [2];
				nextCell[0] = x + 1;
				nextCell[1] = y;
				if(!generate(nextCell, nextRoomData(doors.right, roomData))) {
					newRoom.getDoors().right = 0;
				}
				else {
					space[nextCell[0]][nextCell[1]].getDoors().left = 1;
				}
			}

			if(doors.bottom) {
				var nextCell = [2];
				nextCell[0] = x;
				nextCell[1] = y - 1;
				if(!generate(nextCell, nextRoomData(doors.bottom, roomData))) {
					newRoom.getDoors().bottom = 0;
				}
				else {
					space[nextCell[0]][nextCell[1]].getDoors().top = 1;
				}
			}

			if(doors.left) {
				var nextCell = [2];
				nextCell[0] = x - 1;
				nextCell[1] = y;
				if(!generate(nextCell, nextRoomData(doors.left, roomData))) {
					newRoom.getDoors().left = 0;
				}
				else {
					space[nextCell[0]][nextCell[1]].getDoors().right = 1;
				}
			}
			
			if(!noDoors(doors) || roomData.depth < spaceSize) {
				fillNeighbors(cell, roomData);
			}
			
			return true;
		}
		else {
			return false;
		}
	}
	
	var nextRoomData = function(door, currentRoomData) {
		var d = currentRoomData.depth + 1;
		var l = currentRoomData.lockLevel;
		
		if(door == 2) {
			l++;
		}
		
		return {depth: d, lockLevel: l}
	}

	var noDoors = function(doors) {
		return !(doors.top || doors.right || doors.bottom || doors.right);
	}

	var fillNeighbors = function(cell, roomData) {
		var x = cell[0];
		var y = cell[1];

		var doors = space[x][y].getDoors();

		var up = [2];		
		up[0] = x;
		up[1] = y + 1;
		var upDoor = createDoor(1);
		
		if(generate(up, nextRoomData(upDoor, roomData))) {
			space[x][y].getDoors().top = upDoor;
			space[up[0]][up[1]].getDoors().bottom = 1;
		}
		
		var right = [2];		
		right[0] = x + 1;
		right[1] = y;
		var rightDoor = createDoor(1);
		
		if(generate(right, nextRoomData(rightDoor, roomData))) {
			space[x][y].getDoors().right = rightDoor;
			space[right[0]][right[1]].getDoors().left = 1;
		}
		

		var bottom = [2];
		bottom[0] = x;
		bottom[1] = y - 1;
		var bottomDoor = createDoor(1);
		
		if(generate(bottom, nextRoomData(bottomDoor, roomData))) {
			space[x][y].getDoors().bottom = bottomDoor;
			space[bottom[0]][bottom[1]].getDoors().top = 1;
		}
		

		var left = [2]
		left[0] = x - 1;
		left[1] = y;
		var leftDoor = createDoor(1);
		
		if(generate(left, nextRoomData(leftDoor, roomData))) {
			space[x][y].getDoors().left = leftDoor;
			space[left[0]][left[1]].getDoors().right = 1;
		}
		
	}

	var inBounds = function(x, y) {
		return x >= 0 && x < spaceSize && y >= 0 && y < spaceSize;
	}

	var cellInBounds = function(cell) {
		return inBounds(cell[0], cell[1]);
	}	

	var createRoom = function(currentCell, data) {
		var doors = {
			top: 0, 
			right: 0, 
			bottom: 0, 
			left: 0
		};

		for(door in doors) {
			doors[door] = createDoor(0);
		}

		var room = new MazeRoom(doors, currentCell, data);

		return room;
	}
	
	var createDoor = function(minVal) {
		var doorType = minVal;
		
		if(randomInteger(0, 1) == 1) {
			var randNum = randomInteger(0, CHANCE_OF_LOCK)
			doorType = Maze.DoorStatus.DOOR;

			if(randNum == CHANCE_OF_LOCK) {
				doorType = Maze.DoorStatus.LOCKED;
			}
		}
		
		return doorType;
	}

	var getStartPosition = function() {
		return new Array(randomInteger(0,spaceSize - 1), randomInteger(0,spaceSize - 1));
	}

	var createSpace = function() {
		space = [spaceSize];

		for(var i = 0; i < spaceSize; i++) {
			space[i] = [spaceSize];
		}
	}

	this.generate();
}

Maze.randomInteger = function(lowerBound, upperBound) {
	return Math.floor(Math.random() * ((upperBound - lowerBound) + 1)) + lowerBound;
}

Maze.DoorStatus = {
	NO_DOOR: 0,
	DOOR: 1,
	LOCKED: 2,
}

