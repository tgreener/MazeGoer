
var MazeObject = cc.Class.extend(new function() {
	//var objectExists = false;
	
	this.interact = function(player) {}
	this.exists = function() {
		return false;
	}
	
	this.objectType = function() {
		return -1;
	}
});