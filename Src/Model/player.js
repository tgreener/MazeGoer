
var Player = function() {
	var currentRoom;
	var mazesCleared = 0;
	var keys = 0;
	var stamina = 0;
	var maxStam = 0;

	this.setCurrentRoom = function(room) {
		currentRoom = room;
	}

	this.setStamina = function(s) {
		stamina = s;
		maxStam = stamina;
	}
	
	this.getStamina = function() {
		return stamina;
	}
	
	this.loseStamina = function(s) {
		if(stamina - s > 0) {
			stamina -= s;
			eventRegister.triggerEvent("STAM_LOST");
		}
		else {
			stamina = 0;
			eventRegister.triggerEvent("STAM_DEPLETED");
		}
	}
	
	this.gainStamina = function(s) {
		if(stamina + s < maxStam) {
			stamina += s;
		}
		else {
			stamina = maxStam;
		}
		eventRegister.triggerEvent("STAM_GAINED");
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
		eventRegister.triggerEvent("PICKUP_KEY");
	}
	
	this.useKey = function() {
		keys--;
		eventRegister.triggerEvent("USE_KEY");
	}
	
	this.dropAllKeys = function() {
		keys = 0;
	}
}