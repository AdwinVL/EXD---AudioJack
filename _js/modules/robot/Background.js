var paper, objectPool, rectsQ, currentBgColor, currentFgColor, mySVG, svgWidth, svgHeight;

/** colors **/
var darkBlue = '#0C2437';
var mediumBlue = '#24425A';
var lightBlue = '#3A7385';
var lighterBlue = '#749AA0';
var yellow = '#F0C377';
var mahogany = '#CC4133';
var candy = '#D85261';

function Background(){
	paper = new Snap('#svgboard');

	/** size **/
	mySVG = document.getElementById('svgboard');
	svgWidth = window.innerWidth;
	svgHeight = window.innerHeight;
	mySVG.setAttribute("width",  svgWidth);
	mySVG.setAttribute("height", svgHeight);

	window.addEventListener('resize', function(){
		svgWidth = window.innerWidth;
		svgHeight = window.innerHeight;
		mySVG.setAttribute('width',  svgWidth);
		mySVG.setAttribute('height', svgHeight);
	});

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
			obj.attr({fill:color,r:0,opacity:1});
			obj.animate({'r': 1000}, 500, mina.easein);
		}
	}
};

Background.prototype.animationD = function(){

	paper.node.appendChild(objectPool.rectD1.node); // toFront() van Raphael immiteren.
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
					objectPool.rectD2.transform('T'+svgWidth+' 0');
					objectPool.rectD2.animate({ transform: 't'+ -svgWidth+ ' 0'}, 400, mina.easein);
				}else{
					currentBgColor = yellow;
					paper.node.appendChild(objectPool.rectD3.node); // toFront() van Raphael immiteren.
					objectPool.rectD3.transform('T'+svgWidth+' 0');
					objectPool.rectD3.animate({ transform: 't'+ -svgWidth+ ' 0'}, 400, mina.easein);
				}
			}, 30);
		}
	}
};

Background.prototype.animationE = function(){
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

Background.prototype.animationQ = function(){
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
	if(currentBgColor !== mediumBlue && currentFgColor !== mediumBlue){
		currentFgColor = mediumBlue;
		paper.node.appendChild(objectPool.rectS1.node); // toFront() van Raphael immiteren.
		objectPool.rectS1.attr({fill:mediumBlue, width:svgWidth+600, height:svgHeight+400,opacity: 1});
		objectPool.rectS1.transform('r-20,'+svgWidth/2+','+svgHeight/2);
		objectPool.rectS1.animate({ transform: 'r30,'+svgWidth/2+','+svgHeight/2 }, 1000, mina.bounce );
	}
	else if(currentBgColor !== candy && currentFgColor !== candy){
		currentFgColor = candy;
		paper.node.appendChild(objectPool.rectS2.node); // toFront() van Raphael immiteren.
		objectPool.rectS2.attr({fill:candy, width:svgWidth+600, height:svgHeight+400,opacity: 1});
		objectPool.rectS2.transform('r-20,'+svgWidth/2+','+svgHeight/2);
		objectPool.rectS2.animate({ transform: 'r30,'+svgWidth/2+','+svgHeight/2 }, 1000, mina.bounce );
	}
	window.setTimeout(function balls(){
		paper.node.appendChild(objectPool.circleS1.node); // toFront() van Raphael immiteren.
		paper.node.appendChild(objectPool.circleS2.node); // toFront() van Raphael immiteren.
		objectPool.circleS1.transform("T20 " + svgHeight/4).attr({opacity:1});
		objectPool.circleS2.transform("T" + svgWidth-20 + " 0").attr({opacity:1});
		objectPool.circleS1.animate({transform:'t0 -'+svgHeight}, 500, mina.easein, function(){this.attr({opacity:0, width:0});});
		objectPool.circleS2.animate({transform:'t0 '+svgHeight}, 500, mina.easein, function(){this.attr({opacity:0, width:0});});
	},200);
};


Background.prototype.animationZ = function(){
	if(currentBgColor !== yellow){
		currentBgColor = yellow;
		paper.node.appendChild(objectPool.rectZ1.node); // toFront() van Raphael immiteren.
		objectPool.rectZ1.transform('T0 0').attr({width:0});
		objectPool.rectZ1.attr({fill:yellow});
		objectPool.rectZ1.animate({width: svgWidth}, 400, mina.easein);
	}
	else{
		currentBgColor = lighterBlue;
		paper.node.appendChild(objectPool.rectZ2.node); // toFront() van Raphael immiteren.
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