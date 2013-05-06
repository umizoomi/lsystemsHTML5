var enablelog = true;
var randomcolor = true;
var breakloop = false; //set on true if the time out loop needs to be broken
var drawready = true; //set on false while the script is busy drawing

/* Fractal Settings */
var angle = 0;
var distance = 0;
var iterations = 0;
var speed = 0; //Drawing speed in ms
var string = "";
var mode = ""; //Available at the moment: Normal, Delay

var startPosX = 0;
var startPosY = 0;

var docwidth = $(document).width();
var docheight = $(document).height();

/* General Classes */
function turtle(xpos, ypos, ang){
	this.xpos = xpos;
	this.ypos = ypos;
	this.angle = ang;
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
	this.resetTurtle = function(){
		this.xpos = startPosX;
		this.ypos = startPosY;
		this.angle = angle;
	}
}

function draw(cid){
	this.canvas = document.getElementById(cid);
	this.ctx = this.canvas.getContext("2d");
	this.clearCanvas = function(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	this.drawLine = function(oldPos, newPos, color){
		this.ctx.beginPath();
		this.ctx.moveTo(oldPos[0], oldPos[1]);
		this.ctx.lineTo(newPos[0], newPos[1]);
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
	}
}

/* Functions */
function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

function setNewDimensions(){
	docwidth = $(document).width();
	docheight = $(document).height();
	log("Set new document dimensions to " + docwidth + "x" + docheight);
}

function drawForward(dist){
	var oldp = turtle.getPos();
	turtle.setNextPos(dist);
	var newp = turtle.getPos();
	var col = getRandomColor();
	ctx.drawLine(oldp, newp, col);
}

/* Fractals */

	/*SIERPINSKI*/
function createSierpinski(mode, newDrawing){
    newDrawing = (typeof newDrawing === "undefined") ? false : newDrawing;
	ctx.clearCanvas();
	string = sierpinski(iterations);
	if (mode == "normal"){
		drawready = false;
		for(i = 0; i < string.length; i++){
			c = string.charAt(i);
			if (c == "a" || c == "b"){
				drawForward(distance);
			} else if (c == "-"){
				turtle.turnRight(angle);
			} else{
				turtle.turnLeft(angle);
			}
		}
		breakloop = false;
		drawready = true;
	}
	else if (mode == "delay"){
		var i = 0;
			function daLoop(){
			setTimeout(function(){
				if (breakloop == true){
					breakloop = false;
					drawready = true;
					return false;
				}
				drawready = false;
				c = string.charAt(i);
				if (c == "a" || c == "b"){
					drawForward(distance);
				} else if (c == "-"){
					turtle.turnRight(angle);
				} else{
					turtle.turnLeft(angle);
				}
				i++;
				if (i < string.length){
					drawready = false;
					daLoop();
				} else{
					breakloop = false;
					drawready = true;
				}
			}, speed);
		}
		daLoop();
	}
}
function sierpinski(t){
	if (t == 0){
		return "a";
	} else{
		return sierpinskiLoop(sierpinski(t-1));
	}
}
function sierpinskiLoop(string){
	var n = "";
		
	for(i = 0; i < string.length; i++){
		c = string.charAt(i);
		if (c == "a"){
			n += "b-a-b";
		} else if (c == "b"){
			n += "a+b+a";
		} else{
			n += c;
		}
	}
	return n;
}
	/*PLANT*/
	
	

/* REGISTRER EVENTS */
$(document).ready(function(){
	
});
$(window).resize(function(){
	setNewDimensions();
});
function log(msg) {
	if(enablelog == true){
		setTimeout(function() {
			throw new Error(msg);
		}, 0);
	}
}
