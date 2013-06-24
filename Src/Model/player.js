
var Player = function() {
	var currentRoom;
	var mazesCleared = 0;
	var keys = 0;

	this.setCurrentRoom = function(room) {
		currentRoom = room;
	}

	this.getCurrentRoom = function() {
		return currentRoom;
	}

	this.clearedMaze = function() {
		mazesCleared++;
	}

	this.getMazesCleared = function() { 
		return mazesCleared;
	}
	
	this.getKeys = function() {
		return keys;
	}
	
	this.pickUpKey = function() {
		keys++;
	}
	
	this.useKey = function() {
		keys--;
	}
	
	this.dropAllKeys = function() {
		keys = 0;
	}
}