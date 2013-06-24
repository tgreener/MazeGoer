var MazeRoom = function(doors, position, data) {
	var object = new MazeObject();

	this.getDoors = function() {
		return doors;
	}

	this.getDepth = function() {
		return data.depth;
	}
	
	this.getLockLevel = function() {
		return data.lockLevel;
	}
	
	this.isDeepest = function() {
		return data.deepest;
	}

	this.getPosition = function() {
		return position;
	}
	
	this.getObject = function() {
		return object;
	}
	
	this.setObject = function(o) {
		object = o;
	}

	this.toString = function() {
		var result = "[" + position + "]\n"
		result += "top: " + doors.top + "\n";
		result += "right: " + doors.right + "\n";
		result += "bottom: " + doors.bottom + "\n";
		result += "left: " + doors.left + "\n";
		result += "depth: " + data.depth + "\n";
		result += "lock level: " + data.lockLevel + "\n";
		
		return result;
	}
}