
var Key = MazeObject.extend(new function() {
	this.interact = function(player) {
			player.pickUpKey();
			eventRegister.triggerEvent("PICKUP");
	}
	this.exists = function() {
		return true;
	}
	
	this.objectType = function() {
		return 1;
	}
});