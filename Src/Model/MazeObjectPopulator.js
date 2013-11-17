
var MazeObjectPopulator = function(maze) {
	// The max rand variable indicates the upper bound for the
	// random number generator. It's set to 999 in order to give a
	// range of 1000 possible random results, which allows for
	// percent precision of up to a tenth of a percent.
	var MAX_RAND = 999;
	
	// Item ranges work by first comparing against the highest
	// ranged item. If that fails to spawn, then the next lowest is
	// checked until the generated number is less than one of the
	// item ranges.
	var PORRIDGE_RANGE = 99;
	
	// If an item should spawn, but the room is already occupied,
	// reduce the upper bound on the number generator by this amount
	// in order to compensate.
	var SPAWN_MISS_STEP = 10;
	
	// Used to make items more likely to spawn behind locked doors
	var ROOM_LOCK_DEPTH_BONUS = 0.33;

	var randBound = MAX_RAND;

	var lockSet = [];
	var emptyRoomSet = [];
	
	var applyLockDepthBonus = function(lockLevel, lowerBound, upperBound) {
		var itemRange = upperBound - lowerBound;
		
		if(itemRange <= 0) {
			throw "Item range must be greater than 0! low: " + lowerBound + " high: " + upperBound;
		}
		
		var result = itemRange + ((itemRange + 1) * (lockLevel * ROOM_LOCK_DEPTH_BONUS));
		//console.log("Lock level: " + lockLevel + " Item Range: " + itemRange + " Result: " + result);
		if((result > MAX_RAND) && (result > randBound)) {
			randBound = result;
		}
		
		return result;
	}
	
	var attemptSetItemInRoom = function(room, item) {
		var roomIsEmpty = room.getObject().objectType() == -1;
		
		if(roomIsEmpty) {
			room.setObject(item);
			randBound = MAX_RAND;
			//console.log("Porridge here: " + allRooms[i].toString());
		}
		else {
			randBound -= SPAWN_MISS_STEP;
		}
		
		return randBound;
	}
	
	this.populateMaze = function() {
		var itr = new MazeIterator(maze);
		var keySetGenerator = new itr.keySet();
		var keySets = keySetGenerator.getKeySets();
		
		var allRooms = [];
		
		for(var i = 0; i < keySets.length; i++) {
			var keySet = keySets[i];
			var rnd = Maze.randomInteger(0, keySet.length - 1);
			//console.log("keySet[" + rnd + "]: " + keySet[rnd]);
			keySet[rnd].setObject(new Key());
			
			keySet.forEach(function(room) {
				allRooms.push(room);
			});
		}
		
		
		//console.log(allRooms.length);
		for(var i = 0; i < allRooms.length; i++) {
			//console.log(i);
			var room = allRooms[i];
			var rnd = Maze.randomInteger(0, randBound);
			var spawnPorridge = rnd < applyLockDepthBonus(room.getLockLevel(), 0, PORRIDGE_RANGE);
			
			if(spawnPorridge) {
				randBound = attemptSetItemInRoom(room, new Porridge());
			}	
		}
	}
}