
var MazeObjectPopulator = function(maze) {
	var lockSet = [];
	var emptyRoomSet = [];
	
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
		
		
		console.log(allRooms.length);
		var MAX_RAND = 999;
		var randBound = MAX_RAND;
		for(var i = 0; i < allRooms.length; i++) {
			var rnd = Maze.randomInteger(0, randBound);
			//console.log(i);
			if(allRooms[i].getObject().objectType() == -1) {
				if(rnd < 99) {
					allRooms[i].setObject(new Porridge());
					randBound = MAX_RAND;
					//console.log("Porridge here: " + allRooms[i].toString());
				}
			}
			else {
				randBound--;
			}
		}
	}
}