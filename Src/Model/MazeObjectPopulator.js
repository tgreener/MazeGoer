
var MazeObjectPopulator = function(maze) {
	var lockSet = [];
	var emptyRoomSet = [];
	
	this.populateMaze = function() {
		var itr = new MazeIterator(maze);
		var keySetGenerator = new itr.keySet();
		var keySets = keySetGenerator.getKeySets();
		
		for(var i = 0; i < keySets.length; i++) {
			var keySet = keySets[i];
			var rnd = Maze.randomInteger(0, keySet.length - 1);
			//console.log("keySet[" + rnd + "]: " + keySet[rnd]);
			keySet[rnd].setObject(new Key());
		}
	}
}