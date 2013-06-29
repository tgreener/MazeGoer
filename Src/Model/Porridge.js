
var Porridge = MazeObject.extend(new function() {
	var STAM_BOOST = 15;
	
	this.interact = function(player) {
		player.gainStamina(STAM_BOOST);
		eventRegister.triggerEvent("PICKUP");
	}
	
	this.exists = function() {
		return true;
	}
	
	this.objectType = function() {
		return 2;
	}
});