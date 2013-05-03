/* GENERAL CLASSES */
function docdimension(xdim, ydim){
	this.width = xdim;
	this.height = ydim;
}

function turtle(xpos, ypos, angle){
	this.xpos = xpos;
	this.ypos = ypos;
	this.angle = angle;
	this.turnLeft = function(ang){
		this.angle += ang;
	}
	this.turnRight = function(ang){
		this.angle -= ang;
	}
	this.setNextPos = function(dist){
		this.xpos -= dist * Math.cos(Math.PI * this.angle / 180);
		this.ypos -= dist * Math.sin(Math.PI * this.angle / 180);
	}
	this.getPos = function(){
		var position = new Array();
		position[0] = this.xpos;
		position[1] = this.ypos;
		
		return position;
	}
}

function draw(){
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.clearCanvas = function(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	this.calcDiff = function(oldPos, newPos){
		var deltaX = Math.abs(newPos[0] - oldPos[0]);
		var deltaY = Math.abs(newPos[1] - oldPos[1]);
		var diffX = 1;
		var diffY = 1;
		if(deltaX > deltaY){
			diffY = deltaY / deltaX;
		}
		else if (deltaX < deltaY){
			diffX = deltaX / deltaY;
		}
		var diff = [diffX, diffY];
		
		return diff;
	}
	this.drawLine = function(oldPos, newPos){
		this.ctx.moveTo(oldPos[0], oldPos[1]);
		this.ctx.lineTo(newPos[0], newPos[1]);
		this.ctx.stroke();
	}
	this.animFunc = function(oldPos, newPos){
		function daLoop(){
			if (oldPos[0] == newPos[0] && oldPos[1] == newPos[1]){
				
			}
		}
	}
	this.animateLine = function(oldPos, newPos, speed){
		var curpos = oldPos;
		var endpos = newPos;
		var diff = this.calcDiff(curpos, endpos);
		function daLoop(){
			setTimeout(function(){
				if (curpos[0] == endpos[0] && curpos[1] == endpos[1]){
					ctx.drawLine(curpos, endpos);
				}
				else{
					if(curpos[0] != endpos[0]){
						if(endpos[0] > curpos[0]){
							curpos[0] = curpos[0] + diff[0];
						}
					}
					if(curpos[1] <= endpos[1]){
						curpos[1] = curpos[1] + diff[1];
					}
					ctx.drawLine(curpos, endpos);
					daLoop();
				}
			}, speed)
		}
		daLoop();
	}
}

/* FUNCTIONS */
var turtle = new turtle(700, 1000, 0);
var ctx = new draw();
var docwidth = $(document).width();
var docheight = $(document).height();
var dimensions = new docdimension(docwidth, docheight);

function setNewDimensions(){
	docwidth = $(document).width();
	docheight = $(document).height();
	dimensions = new docdimension(docwidth, docheight);
	log("Set new dimensions to " + dimensions.width + "x" + dimensions.height);
}
function drawForward(dist){
	var oldp = turtle.getPos();
	turtle.setNextPos(dist);
	var newp = turtle.getPos();
	ctx.drawLine(oldp, newp);
}
function animForward(dist, speed){
	var oldp = turtle.getPos();
	turtle.setNextPos(dist);
	var newp = turtle.getPos();
	ctx.animateLine(oldp, newp, speed);
}
/* REGISTRER EVENTS */
$(document).ready(function(){
	
});
$(window).resize(function(){
	setNewDimensions();
});

/* FRACTAL CLASSES */
function sierpinski(iter, angle){
	this.angle = angle;
	this.iterations = iter;
	this.createFractal = function(mode, speed){
		ctx.clearCanvas();
		turtle.angle = this.angle;
		var string = this.sierpinski(this.iterations);
		if (mode == "normal"){
			for(i = 0; i < string.length; i++){
				c = string.charAt(i);
				if (c == "a" || c == "b"){
					drawForward(10);
				}
				else if (c == "-"){
					turtle.turnRight(angle);
				}
				else{
					turtle.turnLeft(angle);
				}
			}
		}
		else if (mode == "delay"){
			var i = 0;
			function daLoop(){
				setTimeout(function(){
					c = string.charAt(i);
					if (c == "a" || c == "b"){
						drawForward(10);
					}
					else if (c == "-"){
						turtle.turnRight(angle);
					}
					else{
						turtle.turnLeft(angle);
					}
					i++;
					if (i < string.length){
						daLoop();
					}
				}, speed)
			}
			daLoop();
		}
		else if (mode == "animate"){
			for(i = 0; i < string.length; i++){
				c = string.charAt(i);
				if (c == "a" || c == "b"){
					animForward(10, speed);
				}
				else if (c == "-"){
					turtle.turnRight(angle);
				}
				else{
					turtle.turnLeft(angle);
				}
			}
		}
	}
	this.sierpinski = function(t){
		if (t == 0){
			return "a";
		}
		else{
			return this.loop(this.sierpinski(t-1));
		}
	}
	this.loop = function(string){
		var n = "";
		
		for(i = 0; i < string.length; i++){
			c = string.charAt(i);
			if (c == "a"){
				n += "b-a-b";
			}
			else if (c == "b"){
				n += "a+b+a";
			}
			else{
				n += c;
			}
		}
		return n;
	}
}
function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}