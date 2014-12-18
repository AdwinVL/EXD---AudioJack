function Robotsim(){
	console.log('[Robotsim] init');

	this.socket = io('/');

	// buttons
	this.socket.on('buttonHeartDown', buttonHeartDown);
	this.socket.on('buttonHeartUp', buttonHeartUp);
	this.socket.on('buttonADown', buttonADown);
	this.socket.on('buttonAUp', buttonAUp);
	this.socket.on('buttonBDown', buttonBDown);
	this.socket.on('buttonBUp', buttonBUp);
	this.socket.on('buttonTwistDown', buttonTwistDown);
	this.socket.on('buttonTwistUp', buttonTwistUp);
	this.socket.on('buttonSpinDown', buttonSpinDown);
	this.socket.on('buttonSpinUp', buttonSpinUp);
	this.socket.on('buttonPullDown', buttonPullDown);
	this.socket.on('buttonPullUp', buttonPullUp);
	this.socket.on('buttonFlickDown', buttonFlickDown);
	this.socket.on('buttonFlickUp', buttonFlickUp);

	// leds
	var ledOneRed = document.getElementById('ledOneRed');
	ledOneRed.addEventListener('change', ledOneRedChanged.bind(this));
	var ledOneGreen = document.getElementById('ledOneGreen');
	ledOneGreen.addEventListener('click', ledOneGreenChanged.bind(this));
	var ledOneBlue = document.getElementById('ledOneBlue');
	ledOneBlue.addEventListener('click', ledOneBlueChanged.bind(this));

	var ledTwoRed = document.getElementById('ledTwoRed');
	ledTwoRed.addEventListener('change', ledTwoRedChanged.bind(this));
	var ledTwoGreen = document.getElementById('ledTwoGreen');
	ledTwoGreen.addEventListener('click', ledTwoGreenChanged.bind(this));
	var ledTwoBlue = document.getElementById('ledTwoBlue');
	ledTwoBlue.addEventListener('click', ledTwoBlueChanged.bind(this));

	var ledThreeRed = document.getElementById('ledThreeRed');
	ledThreeRed.addEventListener('change', ledThreeRedChanged.bind(this));
	var ledThreeGreen = document.getElementById('ledThreeGreen');
	ledThreeGreen.addEventListener('click', ledThreeGreenChanged.bind(this));
	var ledThreeBlue = document.getElementById('ledThreeBlue');
	ledThreeBlue.addEventListener('click', ledThreeBlueChanged.bind(this));

	//servos
	var servoOne = document.getElementById('servoOne');
	servoOne.addEventListener('change', servoOneChanged.bind(this));
	var servoTwo = document.getElementById('servoTwo');
	servoTwo.addEventListener('change', servoTwoChanged.bind(this));
	var servoThree = document.getElementById('servoThree');
	servoThree.addEventListener('change', servoThreeChanged.bind(this));
	var servoFour = document.getElementById('servoFour');
	servoFour.addEventListener('change', servoFourChanged.bind(this));
}

/** handlers **/
// buttons
function buttonHeartDown() {
	console.log('[robotsim] buttonHeartDown');
	document.getElementById('buttonHeart').checked = true;
}
function buttonHeartUp() {
	console.log('[robotsim] buttonHeartUp');
	document.getElementById('buttonHeart').checked = false;
}
function buttonADown() {
	console.log('[robotsim] buttonADown');
	document.getElementById('buttonA').checked = true;
}
function buttonAUp() {
	console.log('[robotsim] buttonAUp');
	document.getElementById('buttonA').checked = false;
}
function buttonBDown() {
	console.log('[robotsim] buttonBDown');
	document.getElementById('buttonB').checked = true;
}
function buttonBUp() {
	console.log('[robotsim] buttonBUp');
	document.getElementById('buttonB').checked = false;
}
function buttonTwistDown() {
	console.log('[robotsim] buttonTwistDown');
	document.getElementById('buttonTwist').checked = true;
}
function buttonTwistUp() {
	console.log('[robotsim] buttonTwistUp');
	document.getElementById('buttonTwist').checked = false;
}
function buttonSpinDown() {
	console.log('[robotsim] buttonSpinDown');
	document.getElementById('buttonSpin').checked = true;
}
function buttonSpinUp() {
	console.log('[robotsim] buttonSpinUp');
	document.getElementById('buttonSpin').checked = false;
}
function buttonPullDown() {
	console.log('[robotsim] buttonPullDown');
	document.getElementById('buttonPull').checked = true;
}
function buttonPullUp() {
	console.log('[robotsim] buttonPullUp');
	document.getElementById('buttonPull').checked = false;
}
function buttonFlickDown() {
	console.log('[robotsim] buttonFlickDown');
	document.getElementById('buttonFlick').checked = true;
}
function buttonFlickUp() {
	console.log('[robotsim] buttonFlickUp');
	document.getElementById('buttonFlick').checked = false;
}

//leds
function ledOneRedChanged(e) {
	console.log('[robotsim] ledOneRedChanged: ' + e.target.value);
	this.socket.emit('ledOneRed', e.target.value);
}
function ledOneGreenChanged(e) {
	console.log('[robotsim] ledOneGreenChanged: ' + e.target.checked);
	this.socket.emit('ledOneGreen', e.target.checked);
}
function ledOneBlueChanged(e) {
	console.log('[robotsim] ledOneBlueChanged: ' + e.target.checked);
	this.socket.emit('ledOneBlue', e.target.checked);
}
function ledTwoRedChanged(e) {
	console.log('[robotsim] ledTwoRedChanged: ' + e.target.value);
	this.socket.emit('ledTwoRed', e.target.value);
}
function ledTwoGreenChanged(e) {
	console.log('[robotsim] ledTwoGreenChanged: ' + e.target.checked);
	this.socket.emit('ledTwoGreen', e.target.checked);
}
function ledTwoBlueChanged(e) {
	console.log('[robotsim] ledTwoBlueChanged: ' + e.target.checked);
	this.socket.emit('ledTwoBlue', e.target.checked);
}
function ledThreeRedChanged(e) {
	console.log('[robotsim] ledThreeRedChanged: ' + e.target.value);
	this.socket.emit('ledThreeRed', e.target.value);
}
function ledThreeGreenChanged(e) {
	console.log('[robotsim] ledThreeGreenChanged: ' + e.target.checked);
	this.socket.emit('ledThreeGreen', e.target.checked);
}
function ledThreeBlueChanged(e) {
	console.log('[robotsim] ledThreeBlueChanged: ' + e.target.checked);
	this.socket.emit('ledThreeBlue', e.target.checked);
}

//servos
function servoOneChanged(e) {
	console.log('[robotsim] servoOneChanged: ' + e.target.value);
	this.socket.emit('servoOne', e.target.value);
}

function servoTwoChanged(e) {
	console.log('[robotsim] servoTwoChanged: ' + e.target.value);
	this.socket.emit('servoTwo', e.target.value);
}

function servoThreeChanged(e) {
	console.log('[robotsim] servoThreeChanged: ' + e.target.value);
	this.socket.emit('servoThree', e.target.value);
}

function servoFourChanged(e) {
	console.log('[robotsim] servoFourChanged: ' + e.target.value);
	this.socket.emit('servoFour', e.target.value);
}

module.exports = Robotsim;
