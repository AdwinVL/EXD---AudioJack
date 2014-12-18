var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require('johnny-five');
var pins = require('./config/pins.json');

/** CONFIG **/
require('./config/middleware.js')(app, express);
require('./config/handlebars.js')(app);

/** ROUTES **/
require('./controllers/pages.js')(app);

/** JHONNY-FIVE **/
new five.Boards(['boardOne', 'boardTwo']).on('ready', function() {
	var boardOne = this[0], boardTwo = this[1];
	var servoOne, servoTwo, servoThree, servoFour;

	/** BOARDONE **/
	boardOne.pinMode(pins.boardOne.ledOneRed, five.Pin.PWM);
	boardOne.pinMode(pins.boardOne.ledOneGreen, five.Pin.OUTPUT);
	boardOne.pinMode(pins.boardOne.ledOneBlue, five.Pin.OUTPUT);
	boardOne.pinMode(pins.boardOne.ledTwoRed, five.Pin.PWM);
	boardOne.pinMode(pins.boardOne.ledTwoGreen, five.Pin.OUTPUT);
	boardOne.pinMode(pins.boardOne.ledTwoBlue, five.Pin.OUTPUT);
	boardOne.pinMode(pins.boardOne.ledThreeRed, five.Pin.PWM);
	boardOne.pinMode(pins.boardOne.ledThreeGreen, five.Pin.OUTPUT);
	boardOne.pinMode(pins.boardOne.ledThreeBlue, five.Pin.OUTPUT);
	boardOne.pinMode(pins.boardOne.box, five.Pin.PWM);
	boardOne.pinMode(pins.boardOne.buttonTwist, five.Pin.INPUT);
	boardOne.pinMode(pins.boardOne.buttonHeart, five.Pin.INPUT);
	boardOne.pinMode(pins.boardOne.buttonA, five.Pin.INPUT);
	boardOne.pinMode(pins.boardOne.buttonB, five.Pin.INPUT);

	/** BOARDTWO **/
		// boardTwo.pinMode(pins.boardTwo.servoOne, five.Pin.SERVO);
		// boardTwo.pinMode(pins.boardTwo.servoTwo, five.Pin.SERVO);
		// boardTwo.pinMode(pins.boardTwo.servoThree, five.Pin.SERVO);
		// boardTwo.pinMode(pins.boardTwo.servoFour, five.Pin.SERVO);
	servoOne = new five.Servo({pin:pins.boardTwo.servoOne, board:boardTwo});
	servoOne.to(90, 500);
	servoTwo = new five.Servo({pin:pins.boardTwo.servoTwo, board:boardTwo});
	servoTwo.to(90, 500);
	servoThree = new five.Servo({pin:pins.boardTwo.servoThree, board:boardTwo});
	servoThree.to(90, 500);
	servoFour = new five.Servo({pin:pins.boardTwo.servoFour, board:boardTwo});
	servoFour.to(90, 500);
	boardTwo.pinMode(pins.boardTwo.buttonSpin, five.Pin.INPUT);
	boardTwo.pinMode(pins.boardTwo.buttonPull, five.Pin.INPUT);
	boardTwo.pinMode(pins.boardTwo.buttonFlick, five.Pin.INPUT);

	//** SOCKETS **//
	io.on('connection', function(socket){

		socket.on('disconnect', function(){
			console.log("[server] client disconnected");
		});

		/** BOARDONE **/
		socket.on('ledOneRed',function(ledOneRed){
			console.log('[Server] ledOneRed', ledOneRed);
			boardOne.analogWrite(pins.boardOne.ledOneRed, ledOneRed);
		});
		socket.on('ledOneGreen',function(ledOneGreen){
			console.log('[Server] ledOneGreen', ledOneGreen);
			if(ledOneGreen){
				boardOne.digitalWrite(pins.boardOne.ledOneGreen, 1);
			} else {
				boardOne.digitalWrite(pins.boardOne.ledOneGreen, 0);
			}
		});
		socket.on('ledOneBlue',function(ledOneBlue){
			console.log('[Server] ledOneBlue', ledOneBlue);
			if(ledOneBlue){
				boardOne.digitalWrite(pins.boardOne.ledOneBlue, 1);
			} else {
				boardOne.digitalWrite(pins.boardOne.ledOneBlue, 0);
			}
		});

		socket.on('ledTwoRed',function(ledTwoRed){
			console.log('[Server] ledTwoRed', ledTwoRed);
			boardOne.analogWrite(pins.boardOne.ledTwoRed, ledTwoRed);
		});
		socket.on('ledTwoGreen',function(ledTwoGreen){
			console.log('[Server] ledTwoGreen', ledTwoGreen);
			if(ledTwoGreen){
				boardOne.digitalWrite(pins.boardOne.ledTwoGreen, 1);
			} else {
				boardOne.digitalWrite(pins.boardOne.ledTwoGreen, 0);
			}
		});
		socket.on('ledTwoBlue',function(ledTwoBlue){
			console.log('[Server] ledTwoBlue', ledTwoBlue);
			if(ledTwoBlue){
				boardOne.digitalWrite(pins.boardOne.ledTwoBlue, 1);
			} else {
				boardOne.digitalWrite(pins.boardOne.ledTwoBlue, 0);
			}
		});

		socket.on('ledThreeRed',function(ledThreeRed){
			console.log('[Server] ledThreeRed', ledThreeRed);
			boardOne.analogWrite(pins.boardOne.ledThreeRed, ledThreeRed);
		});
		socket.on('ledThreeGreen',function(ledThreeGreen){
			console.log('[Server] ledThreeGreen', ledThreeGreen);
			if(ledThreeGreen){
				boardOne.digitalWrite(pins.boardOne.ledThreeGreen, 1);
			} else {
				boardOne.digitalWrite(pins.boardOne.ledThreeGreen, 0);
			}
		});
		socket.on('ledThreeBlue',function(ledThreeBlue){
			console.log('[Server] ledThreeBlue', ledThreeBlue);
			if(ledThreeBlue){
				boardOne.digitalWrite(pins.boardOne.ledThreeBlue, 1);
			} else {
				boardOne.digitalWrite(pins.boardOne.ledThreeBlue, 0);
			}
		});

		if(boardOne.isReady){
			five.Pin(pins.boardOne.buttonTwist).read(function(buttonTwist){
				if(buttonTwist){ socket.emit("buttonTwistDown"); } else { socket.emit("buttonTwistUp"); }
			});
			five.Pin(pins.boardOne.buttonHeart).read(function(buttonHeart){
				if(buttonHeart){ socket.emit("buttonHeartDown"); } else { socket.emit("buttonHeartUp"); }
			});
			five.Pin(pins.boardOne.buttonA).read(function(buttonA){
				if(buttonA){ socket.emit("buttonADown"); } else { socket.emit("buttonAUp"); }
			});
			five.Pin(pins.boardOne.buttonA).read(function(buttonB){
				if(buttonB){ socket.emit("buttonBDown"); } else { socket.emit("buttonBUp"); }
			});
		}

		/** BOARDTWO **/
		socket.on('servoOne',function(position){
			position = parseInt(position);
			console.log('[Server] servoOne', position);
			if(boardTwo.isReady){
				servoOne.to(position, 500);
			}
		});
		socket.on('servoTwo',function(position){
			position = parseInt(position);
			console.log('[Server] servoTwo', position);
			if(boardTwo.isReady){
				servoTwo.to(position, 500);
			}
		});
		socket.on('servoThree',function(position){
			position = parseInt(position);
			console.log('[Server] servoThree', position);
			if(boardTwo.isReady){
				servoThree.to(position, 500);
			}
		});
		socket.on('servoFour',function(position){
			position = parseInt(position);
			console.log('[Server] servoFour', position);
			if(boardTwo.isReady){
				servoFour.to(position, 500);
			}
		});

		if(boardTwo.isReady){
			five.Pin(pins.boardTwo.buttonSpin).read(function(buttonSpin){
				if(buttonSpin){ socket.emit("buttonSpinDown"); } else { socket.emit("buttonSpinUp"); }
			});
			five.Pin(pins.boardTwo.buttonPull).read(function(buttonPull){
				if(buttonPull){ socket.emit("buttonPullDown"); } else { socket.emit("buttonPullUp"); }
			});
			five.Pin(pins.boardTwo.buttonFlick).read(function(buttonFlick){
				if(buttonFlick){ socket.emit("buttonFlickDown"); } else { socket.emit("buttonFlickUp"); }
			});
		}
	});
});

/** **/
var port = process.env.PORT;
server.listen(port, function() {
	console.log('Server listening at port', port, 'in', process.env.NODE_ENV, 'mode');
});

