var MazeObjectGeometryDescription = function() {
	var objectType;
	var direction;
	var distanceFromEvent = -1;
	
	var distanceBetweenPointsSquared = function(a, b) {
		return Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2);
	}
	
	this.init = function(type, location, eventPoint) {
		objectType = type;
		distanceFromEvent = distanceBetweenPointsSquared(location, eventPoint);
		direction = 0;
	}
	
	this.setDirection = function(dir) {
		if(objectType == MazeObjectGeometryDescription.Types.DOOR) {
			direction = dir;
		}
	}
	
	this.getType = function() {
		return objectType;
	}
	
	this.getDirection = function() {
		return direction;
	}
	
	this.getDistance = function() {
		return distanceFromEvent;
	}
	
	this.toString = function() {
		switch(objectType) {
			case 0:
				return "Door: " + direction;
				break;
			case 1:
				return "Stairs";
				break;
			case 2:
				return "Key";
				break;
			case 3:
				return "Food";
				break;
		}
		return "Error";
	}
};

MazeObjectGeometryDescription.Types = {
	DOOR: 0,
	STAIRS: 1,
	KEY: 2,
	FOOD: 3
}