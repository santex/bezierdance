var x0=200;
var y0=500;

var x1=700;
var y1=500;

var r0 = 100;
var r1 = 500;


var n = 12;

var m = 20;

var mode = 1;


var tF;
init=function(){
	
	
	addInteractionEventListener('mousedown', onMouse, this);
	
	tF = new TextFieldHTML({
		width:2000,
		text:''
	});
	
	resizeWindow();
	
}

onMouse = function(e){
	mode++;
	mode = mode%2;
	resizeWindow();
}

resizeWindow = function(){
	y0 = y1 = cH*0.5;
	x0 = cW/3;
	x1 = 2*x0;
	
	tF.x = 20;
	tF.width = cW-40;
	tF.y = cH - 30;
}


cycle=function(){
	context.lineWidth = 0.3;
	context.strokeStyle = 'black';
	context.fillStyle = 'black';
	var c0x;
	var c0y;
	var c1x;
	var c1y;
	var point;
	
	var i;
	var j;
	
	var a0;
	
	switch(mode){
		case 0:
			r0 = (Math.sin(nF*0.005)+1)*400;
			r1 = (Math.cos(nF*0.007)+1)*400;
			
			for(i=0; i<n; i++){
				c0x = x0 + r0*Math.cos(nF*0.01 + TwoPi*i/n);
				c0y = y0 + r0*Math.sin(nF*0.01 + TwoPi*i/n);
				for(j=0; j<n; j++){
					c1x = x1 + r1*Math.cos(nF*0.013 + TwoPi*j/n);
					c1y = y1 + r1*Math.sin(nF*0.013 + TwoPi*j/n);
					
					bezierAndPoint(x0, y0, c0x, c0y, c1x, c1y, x1, y1);
				}
			}
			break;
		case 1:
			a0 = nF*0.006;
			r0 = Math.min(cW, cH)*((Math.cos(nF*0.014)*0.5+1)*0.5)-10;
			var rC = 1 + 0.5*Math.cos(nF*0.01);
			for(i=0; i<m-1; i++){
				x0 = cX + r0*Math.cos(a0 + TwoPi*i/m);
				y0 = cY + r0*Math.sin(a0 + TwoPi*i/m);
				for(j=i+1; j<m; j++){
					x1 = cX + r0*Math.cos(a0 + TwoPi*j/m);
					y1 = cY + r0*Math.sin(a0 + TwoPi*j/m);
					
					c0x = c1x = cX+((x0 + x1)*0.5-cX)*rC;
					c0y = c1y = cY+((y0 + y1)*0.5-cY)*rC;
					
					bezierAndPoint(x0, y0, c0x, c0y, c1x, c1y, x1, y1);
				}
			}
			break;
	}
		
	tF.draw();
			
}

bezierAndPoint=function(x0, y0, c0x, c0y, c1x, c1y, x1, y1){
	bezierCurve(x0, y0, c0x, c0y, c1x, c1y, x1, y1);
					
	point = GeometryOperators.distanceToBezierCurve(x0, y0, c0x, c0y, c1x, c1y, x1, y1, mP, true);
	circle(point.x, point.y, 4);
}

bezierCurve=function(x0, y0, c0x, c0y, c1x, c1y, x1, y1){
	context.beginPath();
	context.moveTo(x0, y0);
	context.bezierCurveTo(c0x, c0y, c1x, c1y, x1, y1);
	context.stroke();
}
circle = function(x,y,r){
	context.beginPath();
	context.arc(x, y, r, 0, TwoPi);
	context.fill();
}
