(function(){

	var Background = require('./modules/robot/Background');
	var Robot = require('./modules/robot/Robot');

	var background, robot;

	function init(){
		background = new Background();
		robot = new Robot();

		initKeyHandlers();

		addEventListener("click", function(e) {
	    launchIntoFullscreen(document.documentElement);
		});
	}

	function initKeyHandlers(){
		$(document).on('keydown', function(e){
			console.log('Key ' + e.which);

			var key = e.which;
			if( key === 37 || key === 38 || key === 39 || key === 40 ){
				event.preventDefault();
			}
			switch(key) {
				case 65: /* A */
						background.animationA();
					break;
				case 90: /* Z */
						background.animationZ();
					break;
				case 81: /* Q */
						background.animationQ();
					break;
				case 83: /* S */
						background.animationS();
					break;
				case 68: /* D */
						background.animationD();
					break;
				case 69: /* E */
						background.animationE();
					break;
			}
		});
	}

	function launchIntoFullscreen(element) { //e.webkitRequestFullScreen(e.ALLOW_KEYBOARD_INPUT);
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

	init();

})();
