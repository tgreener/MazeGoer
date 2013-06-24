
var Stack = function() {
	var s = new Array();
	var size = 0;	

	this.enqueue = function(e) {
		//console.log(e);
		s.push(e);
		size = size + 1;
	}

	this.dequeue = function() {
		if(size > 0) {
			size--;
			return s.pop();
		}
	}

	this.getSize = function() {
		return size;
	}
}

var Queue = function() {
	var s = new Array();
	var size = 0;	

	this.enqueue = function(e) {
		//console.log(e);
		s.push(e);
		size = size + 1;
	}

	this.dequeue = function() {
		if(size > 0) {
			size--;
			return s.shift();
		}
	}

	this.getSize = function() {
		return size;
	}
}

var MazeIterator = function (maze){
	var visited;
	var spaceSize = maze.spaceSize();
	
	var visit = function(room) {
		var x = room.getPosition()[0];
		var y = room.getPosition()[1];

		visited[x][y] = true;
	}

	var beenVisited = function(room) {
		var x = room.getPosition()[0];
		var y = room.getPosition()[1];

		return visited[x][y];
	}
	
	var initVisitedSpace = function() {
		visited = [spaceSize];

		for(var i = 0; i < spaceSize; i++) {
			visited[i] = [spaceSize];
			for(var j = 0; j < spaceSize; j++) {
				visited[i][j] = false;
			}
		}
	}
	
	this.standard = function() {
		var currentRoom = maze.getStartRoom();
		var s = new Stack();

		s.enqueue(currentRoom);

		var pushChildren = function(room) {
			var doors = room.getDoors();

			for(door in doors) {
				if(doors[door] > 0) {
					var connectingRoom = maze.getNextRoom(room, door);
				
					if(!beenVisited(connectingRoom)) {
						s.enqueue(connectingRoom);
					}
				}
			}
		}

		this.hasNext = function() {
			var result = s.getSize() > 0;

			return result;
		}

		this.next = function() {
			currentRoom = s.dequeue();
			visit(currentRoom);

			pushChildren(currentRoom);

			return currentRoom;
		}

		initVisitedSpace();
	}
	
	this.keySet = function() {
		var currentRoom = maze.getStartRoom();
		var s = new Stack();
		var q = new Queue();
		var keySets = new Array();
		var keySetIndex = 0;
		keySets[keySetIndex] = [];

		s.enqueue(currentRoom);

		var pushChildren = function(room) {
			var doors = room.getDoors();
			//console.log(room.toString());

			for(door in doors) {
				if(doors[door] == 1) {
					var connectingRoom = maze.getNextRoom(room, door);
				
					if(!beenVisited(connectingRoom)) {
						s.enqueue(connectingRoom);
					}
				}
				else if(doors[door] == 2) {
					var lockedRoom = maze.getNextRoom(room, door);
					
					if(!beenVisited(lockedRoom)) {
						q.enqueue(lockedRoom);
					}
				}
			}
		}
		
		var genKeySets = function() {
			while(hasNext()) {
				//console.log(next().toString());
				next();
			}
		}

		var hasNext = function() {
			var result = s.getSize() + q.getSize() > 0;

			return result;
		}

		var next = function() {
			if(s.getSize() > 0) {
				currentRoom = s.dequeue();
			}
			else if(q.getSize() > 0) {
				keySetIndex++;
				keySets[keySetIndex] = new Array();
				currentRoom = q.dequeue();
			}
			else {
				return 0;
			}
			visit(currentRoom);

			pushChildren(currentRoom);

			keySets[keySetIndex].push(currentRoom);
			//console.log("Pushed to keySet: " + keySets[keySetIndex][keySets[keySetIndex].length - 1] + "\n");
			return currentRoom;
		}
		
		this.getKeySets = function() {
			return keySets;
		}

		initVisitedSpace();
		genKeySets();
	}
}