
var EventRegister = cc.Class.extend(new function() {
	var register;
	
	this.ctor = function() {
		register = new Array();
	}
	
	this.addEvent = function(eventName) {
		register[eventName] = new Array();
	}
	
	this.registerEventHandler = function(eventName, handler) {
		register[eventName].push(handler);
	}
	
	this.triggerEvent = function(eventName, p) {
		var params = 0;
		if(arguments.length > 1) {
			params = p;
		} 
	
		for(handler in register[eventName]) {
			register[eventName][handler](params);
		}
	}
});