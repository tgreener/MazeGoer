
var MazeObject = cc.Class.extend(new function() {
	var objectExists = false;
	
	this.interact = function(player) {}
	this.exists = function() {
		return objectExists;
	}
	
	this.objectType = function() {
		return -1;
	}
});