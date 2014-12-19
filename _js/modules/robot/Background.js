var paper, objectPool, rectsQ, currentBgColor, currentFgColor, mySVG, svgWidth, svgHeight, robotImage, twist, flick, pull, btnA, btnB, head;
var resolution,scaleFactor,robotHeight,topMargin,robotWidth,robotXpos;
/** colors **/
var darkBlue = '#0C2437';
var mediumBlue = '#24425A';
var lightBlue = '#3A7385';
var lighterBlue = '#749AA0';
var yellow = '#F0C377';
var mahogany = '#CC4133';
var candy = '#D85261';
currentBgColor = yellow;

function Background(){
	paper = new Snap('#svgboard');

	/** size **/
	mySVG = document.getElementById('svgboard');
	svgWidth = window.innerWidth;
	svgHeight = window.innerHeight;
	mySVG.setAttribute("width",  svgWidth);
	mySVG.setAttribute("height", svgHeight);


	resolution = 664/1072;

	window.addEventListener('resize', function(){
		svgWidth = window.innerWidth;
		svgHeight = window.innerHeight;
		mySVG.setAttribute('width',  svgWidth);
		mySVG.setAttribute('height', svgHeight);
	});
	window.addEventListener('webkitfullscreenchange', function() {
		svgWidth = window.innerWidth;
		svgHeight = window.innerHeight;
		mySVG.setAttribute('width',  svgWidth);
		mySVG.setAttribute('height', svgHeight);
		console.log('vnklcskls');

		objectPool.rectZ1.attr({'height': svgHeight+1000});
		objectPool.rectZ2.attr({'height': svgHeight+1000});
		objectPool.rectD1.attr({'height': svgHeight+1000});
		objectPool.rectD2.attr({'height': svgHeight+1000});
		objectPool.rectD3.attr({'height': svgHeight+1000});

		objectPool.rectQ1.attr({'height': svgHeight+1000});
		objectPool.rectQ2.attr({'height': svgHeight+1000});
		objectPool.rectQ3.attr({'height': svgHeight+1000});
		objectPool.rectQ4.attr({'height': svgHeight+1000});
		objectPool.rectQ5.attr({'height': svgHeight+1000});
		objectPool.rectQ6.attr({'height': svgHeight+1000});
	});
	scaleFactor = svgHeight/1000;
	robotHeight = svgHeight;
	topMargin = -288 + (scaleFactor*robotHeight);
	robotWidth = robotHeight*resolution;
	robotXpos = svgWidth/2 -(robotWidth/2);
	robotImage = Snap.select('#robotImage');
	btnA = robotImage.select('#robotBtnA');
	btnB = robotImage.select('#robotBtnB');
	robotImage.attr({transform:'s'+ scaleFactor +' T' + robotXpos + ' ' + (topMargin-100)});
	btnA.attr({opacity:0});
	btnB.attr({opacity:0});

	$('#container').css({width: svgWidth + 'px'});

	/** objectpool **/
	objectPool = {
		rectZ1: paper.rect(0,0,0,svgHeight),
		rectZ2: paper.rect(0,0,0,svgHeight),
		circleA1: paper.circle(svgWidth/2, svgHeight/2, 0).attr({opacity: 0}),
		circleA2: paper.circle(svgWidth/2, svgHeight/2, 0).attr({opacity: 0}),
		circleA3: paper.circle(svgWidth/2, svgHeight/2, 0).attr({opacity: 0}),
		circleA4: paper.circle(svgWidth/2, svgHeight/2, 0).attr({opacity: 0}),
		circleA5: paper.circle(svgWidth/2, svgHeight/2, 0).attr({opacity: 0}),
		circleA6: paper.circle(svgWidth/2, svgHeight/2, 0).attr({opacity: 0}),
		rectE1: paper.rect(svgWidth/2 - 50, 0,100,0),
		rectE2: paper.rect(svgWidth/1.5 - 50, 0,100,0),
		rectE3: paper.rect(svgWidth/3 - 50, 0,100,0),
		rectS1: paper.rect(-300,-svgHeight/2-400,0,0),
		rectS2: paper.rect(-300,-svgHeight/2-400,0,0),
		rectQ1: paper.rect(0,0,0, svgHeight).attr({fill:lighterBlue}),
		rectQ2: paper.rect(0,0,0, svgHeight).attr({fill:lighterBlue}),
		rectQ3: paper.rect(0,0,0, svgHeight).attr({fill:lighterBlue}),
		rectQ4: paper.rect(0,0,0, svgHeight).attr({fill:lighterBlue}),
		rectQ5: paper.rect(0,0,0, svgHeight).attr({fill:lighterBlue}),
		rectQ6: paper.rect(0,0,0, svgHeight).attr({fill:lighterBlue}),
		circleS1: paper.circle(20,svgHeight,100).attr({fill:mahogany,opacity: 0}),
		circleS2: paper.circle(svgWidth-20,0,100).attr({fill:mahogany,opacity: 0}),
		rectD1: paper.rect(svgWidth/10,svgHeight/2-75,0,0),
		rectD2: paper.rect(svgWidth,0,svgWidth,svgHeight).attr({fill:mahogany}),
		rectD3: paper.rect(svgWidth,0,svgWidth,svgHeight).attr({fill:yellow})
	};
	rectsQ = [
		objectPool.rectQ1,
		objectPool.rectQ2,
		objectPool.rectQ3,
		objectPool.rectQ4,
		objectPool.rectQ5,
		objectPool.rectQ6
	];
}
Background.prototype.animationA = function(){

	twist = robotImage.select('#robotSpin');
	twist.animate({'transform':'s1.3 0 0 r1000 25 50'}, 500, function(){twist.animate({'transform':'s1 0 0 r0 0 0'}, 300);});
	if(currentBgColor !== darkBlue && currentBgColor !== yellow){
		doubleCircle(
			darkBlue,
			yellow,
			objectPool.circleA1,
			objectPool.circleA2
		);
	}
	else if(currentBgColor !== darkBlue && currentBgColor !== candy){
		doubleCircle(
			candy,
			darkBlue,
			objectPool.circleA3,
			objectPool.circleA4
		);
	}
	else{
		doubleCircle(
			yellow,
			candy,
			objectPool.circleA5,
			objectPool.circleA6
		);
	}
	function doubleCircle(color1, color2, obj1, obj2){
		animateCircle(color1, obj1);

		window.setTimeout(function(){
			animateCircle(color2, obj2);
			currentBgColor = color2;
		},100);

		function animateCircle(color, obj){
			paper.node.appendChild(obj.node);
			paper.node.appendChild(robotImage.node);
			obj.attr({fill:color,r:0,opacity:1});
			obj.animate({'r': 1000}, 500, mina.easein);
		}
	}
};
Background.prototype.animationD = function(){

	flick = robotImage.select('#robotFlick');
	flick.animate({'transform':'s1.1 0 0 r-5 310 515'}, 100, function(){flick.animate({'transform':'s1 0 0 r0 0 0'}, 70);});

	paper.node.appendChild(objectPool.rectD1.node); // toFront() van Raphael immiteren.
	paper.node.appendChild(robotImage.node);
	objectPool.rectD1.attr({fill:lightBlue, width:svgWidth-(svgWidth/5),height:150});

	var visible = true;
	var i = 0;
	var interval = null;

	window.setTimeout(interval = setInterval(function(){spark();}, 30), 1000);

	function spark(){
		if(i<14){
			if(visible){
				objectPool.rectD1.attr({opacity:0});
				visible = false;
			}
			else {
				objectPool.rectD1.attr({opacity:1});
				visible = true;
			}
			i++;
		}
		else {
			clearInterval(interval);
			objectPool.rectD1.transform('s2');
			objectPool.rectD1.animate({transform: 's0.2'},300, mina.easeInQuad);
			window.setTimeout(function(){
				if(currentBgColor !== mahogany){
					currentBgColor = mahogany;
					paper.node.appendChild(objectPool.rectD2.node); // toFront() van Raphael immiteren.
					paper.node.appendChild(robotImage.node);
					objectPool.rectD2.transform('T'+svgWidth+' 0');
					objectPool.rectD2.animate({ transform: 't'+ -svgWidth+ ' 0'}, 400, mina.easein);
				}else{
					currentBgColor = yellow;
					paper.node.appendChild(objectPool.rectD3.node); // toFront() van Raphael immiteren.
					paper.node.appendChild(robotImage.node);
					objectPool.rectD3.transform('T'+svgWidth+' 0');
					objectPool.rectD3.animate({ transform: 't'+ -svgWidth+ ' 0'}, 400, mina.easein);
				}
			}, 30);
		}
	}
};

Background.prototype.animationE = function(){
	btnA = robotImage.select('#robotBtnA');
	btnA.animate({'opacity':1}, 200, function(){btnA.animate({'opacity':0}, 100);});
	if(currentBgColor !== candy){
		objectPool.rectE1.attr({fill:candy,height:0});
		objectPool.rectE2.attr({fill:candy,height:0});
		objectPool.rectE3.attr({fill:candy,height:0});
	}
	else{
		objectPool.rectE1.attr({fill:yellow,height:0});
		objectPool.rectE2.attr({fill:yellow,height:0});
		objectPool.rectE3.attr({fill:yellow,height:0});
	}
	var rects = paper.group(objectPool.rectE1,objectPool.rectE2,objectPool.rectE3);
	objectPool.rectE1.animate({height:svgHeight+300}, 500, mina.easein);
	objectPool.rectE2.animate({height:svgHeight+300}, 500, mina.easein);
	objectPool.rectE3.animate({height:svgHeight+300}, 500, mina.easein);
	window.setTimeout(function(){rects.animate({transform:"t0 " + svgHeight}, 200, mina.easeout, this.removeHandler);}, 300);
	currentFgColor = candy;
};
Background.prototype.animationHead = function(){
	head = robotImage.select('#robotHead');
	head.animate({'transform':'t0 20'}, 100, function(){head.animate({'transform':'t0 0'}, 70);});
}
Background.prototype.animationQ = function(){

	head = robotImage.select('#robotHead');
	head.animate({'transform':'t0 20'}, 100, function(){head.animate({'transform':'t0 0'}, 70);});

	var rectAmount = 6;
	var rectWidth = 100;
	currentFgColor = null;

	if(currentBgColor === null){
		currentFgColor = lighterBlue;
	}else if(currentBgColor === lighterBlue){
		currentFgColor = lightBlue;
	}else if(currentBgColor === mahogany){
		currentFgColor = yellow;
	}else if(currentBgColor === yellow){
		currentFgColor = candy;
	}else{
		currentFgColor = mediumBlue;
	}

	for(var i=0;i<rectAmount;i++){
		paper.node.appendChild(rectsQ[i].node);
		paper.node.appendChild(robotImage.node);
		rectsQ[i].attr({fill:currentFgColor, width:rectWidth, opacity:1});
		rectsQ[i].transform('t' + (svgWidth-(rectWidth*(i+1))) + ' 0');
	}

	var arr = rectsQ;
	var rectGroup = paper.group(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5]);

	rectGroup.animate({transform:"t"+ -(svgWidth-(rectAmount*rectWidth)+3)+" 0"}, 300, mina.easeout, endAnimation);

	function endAnimation()
	{
		i = 0;
		var interval = setInterval(function(){
			if(i<rectAmount) //rectAmount = 6
			{
				rectsQ[i].animate(
					{transform:"t"+svgWidth*1.4+" 0",fill:darkBlue, opacity:0}, 200, mina.easein, function(){this.attr({opacity:0, width:0});});
				i++;
			}
			else {clearInterval(interval);}
		}, 30);
	}
	currentFgColor = lighterBlue;
};

Background.prototype.animationS = function(){

	pull = robotImage.select('#robotPull');
	pull.animate({'transform':'t40 0'}, 100, function(){pull.animate({'transform':'t-40 0'}, 70);});

	if(currentBgColor !== mediumBlue && currentFgColor !== mediumBlue){
		currentFgColor = mediumBlue;
		paper.node.appendChild(objectPool.rectS1.node); // toFront() van Raphael immiteren.
		paper.node.appendChild(robotImage.node);
		objectPool.rectS1.attr({fill:mediumBlue, width:svgWidth+600, height:svgHeight+400,opacity: 1});
		objectPool.rectS1.transform('r-20,'+svgWidth/2+','+svgHeight/2);
		objectPool.rectS1.animate({ transform: 'r30,'+svgWidth/2+','+svgHeight/2 }, 1000, mina.bounce );
	}
	else if(currentBgColor !== candy && currentFgColor !== candy){
		currentFgColor = candy;
		paper.node.appendChild(objectPool.rectS2.node); // toFront() van Raphael immiteren.
		paper.node.appendChild(robotImage.node);
		objectPool.rectS2.attr({fill:candy, width:svgWidth+600, height:svgHeight+400,opacity: 1});
		objectPool.rectS2.transform('r-20,'+svgWidth/2+','+svgHeight/2);
		objectPool.rectS2.animate({ transform: 'r30,'+svgWidth/2+','+svgHeight/2 }, 1000, mina.bounce );
	}
	window.setTimeout(function balls(){
		paper.node.appendChild(objectPool.circleS1.node); // toFront() van Raphael immiteren.
		paper.node.appendChild(objectPool.circleS2.node); // toFront() van Raphael immiteren.
		paper.node.appendChild(robotImage.node);
		objectPool.circleS1.transform("T20 " + svgHeight).attr({opacity:1});
		objectPool.circleS2.transform("T" + svgWidth-20 + " 0").attr({opacity:1});
		objectPool.circleS1.animate({transform:'t0 -'+svgHeight}, 500, mina.easein, function(){this.attr({opacity:0, width:0});});
		objectPool.circleS2.animate({transform:'t0 '+svgHeight}, 500, mina.easein, function(){this.attr({opacity:0, width:0});});
	},200);
};


Background.prototype.animationZ = function(){
	btnB.animate({'opacity':1}, 200, function(){btnB.animate({'opacity':0}, 100);});

	if(currentBgColor !== yellow){
		currentBgColor = yellow;
		paper.node.appendChild(objectPool.rectZ1.node); // toFront() van Raphael immiteren.
		paper.node.appendChild(robotImage.node);
		objectPool.rectZ1.transform('T0 0').attr({width:0});
		objectPool.rectZ1.attr({fill:yellow});
		objectPool.rectZ1.animate({width: svgWidth}, 400, mina.easein);
	}
	else{
		currentBgColor = lighterBlue;
		paper.node.appendChild(objectPool.rectZ2.node); // toFront() van Raphael immiteren.
		paper.node.appendChild(robotImage.node);
		objectPool.rectZ2.transform('T0 0').attr({width:0});
		objectPool.rectZ2.attr({fill:lighterBlue});
		objectPool.rectZ2.animate({width: svgWidth}, 400, mina.easein);
	}
};

Background.removeHandler = function(e){
	console.log('Remove 2: ' + e);

	this.attr({opacity:0, width:0});
};

module.exports = Background;