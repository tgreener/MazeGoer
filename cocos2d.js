(function () {
    var d = document;
    var c = {
 
        menuType:'canvas',
        COCOS2D_DEBUG:2,
        box2d:false,
        chipmunk:false,
        showFPS:false,
        frameRate:30,
        loadExtension:true,
        tag:'gameCanvas',
 
        engineDir:'./Platform/HTML5/cocos2d/',
        appFiles:[
		'./resources.js',
		'./Src/Ctrl/EventRegister.js',
		'./Src/Model/MazeObject.js',
		'./Src/Model/Key.js',
		'./Src/Model/mazeRoom.js',
		'./Src/Model/maze.js',
		'./Src/Model/mazeIterator.js',
		'./Src/Model/MazeObjectPopulator.js',
		'./Src/Model/player.js',
		'./Src/Model/MazeGoer.js',
		'./Src/View/MazeDoorsLayer.js',
		'./Src/View/MazeWallsLayer.js',
		'./Src/View/MazeObjectsLayer.js',
		'./Src/View/InfoLayer.js',
		'./Src/View/View.js',
		'./Src/Ctrl/MazeScene.js'
	]
    };
 
    window.addEventListener('DOMContentLoaded', function () {
        var s = d.createElement('script');
 
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }        
 
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        d.body.appendChild(s);
    });
})();