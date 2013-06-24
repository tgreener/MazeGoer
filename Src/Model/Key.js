
var Key = MazeObject.extend(new function() {
	objectExists = true;

	this.interact = function(player) {
			player.pickUpKey();
			
			objectExists = false;
	}
	
	this.objectType = function() {
		return 1;
	}
});