
var EventRegister = cc.Class.extend(new function() {
	var register;
	
	this.ctor = function() {
		register = {};
	}
	
	this.addEvent = function(eventName) {
		register[eventName] = [];
	}
	
	this.registerEventHandler = function(eventName, handler) {
		if(typeof handler == "function") {
			register[eventName].push(handler);
		}
	}
	
	this.triggerEvent = function(eventName, p) {
		if(!register.hasOwnProperty(eventName)) return;
		register[eventName].forEach(function(handler){
			handler(p);
		});
	}
});