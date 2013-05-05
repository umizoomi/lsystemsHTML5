angle = 60;
distance = 10;
iterations = 6;
speed = 20;
mode = "normal";
startPosX = 700;
startPosY = 900;

var turtle = new turtle(startPosX, startPosY, angle);
var ctx = new draw("canvas");

createSierpinski(mode, false, speed);

$("#angle").html(angle + "&deg;");

$("#angleMin").click(function(){
	angle = angle - 5;
	setAngleLbl();
	chkbox = $("#angleLive").is(":checked");
	if(chkbox == false){
		breakloop = true;
		turtle.resetTurtle();
		createSierpinski(mode, true, speed);
	}
});
$("#anglePlus").click(function(){
	angle = angle + 5;
	setAngleLbl();
	chkbox = $("#angleLive").is(":checked");
	if(chkbox == false){
		breakloop = true;
		turtle.resetTurtle();
		createSierpinski(mode, true, speed);
	}
});
function setAngleLbl(){
	$("#angle").html(angle + "&deg;");
}
/*
function sierpinski(g){
	if(g == 0){
		return "x";
	}
	else{
		return sub(sierpinski(g-1));
	}
}
function sub(string){
	var asd = "";
	
	for(i = 0; i < string.length; i++){
		c = string.charAt(i);
		if (c == "x"){
			asd += "f-[[x]+x]+f[+fx]-x";
		}
		else if (c == "f"){
			asd += "ff";
		}
		else {
			asd += c;
		}
	}
	
	return asd;
}

var string = sierpinski(6);

banana = [];
for(i = 0; i < string.length; i++){
	c = string.charAt(i);
	
	if (c == "f"){
		drawForward();
	}
	else if (c == "["){
		banana.push(turtle.xpos);
		banana.push(turtle.ypos);
		banana.push(turtle.angle);
	}
	else if (c == "]"){
		turtle.angle = banana.pop();
		turtle.ypos = banana.pop();
		turtle.xpos = banana.pop();
	}
	else if (c == "+"){
		turtle.turnRight(angle);
	}
	else if (c == "-"){
		turtle.turnLeft(angle);
	}
}
*/