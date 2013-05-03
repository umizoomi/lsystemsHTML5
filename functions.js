var variables = "AB";
var constants = "+-";
var start = "A";
var rules = "A=B-A-B,B=A+B+A";
var angle = 25;

derp = new sierpinski(4, 60);
derp.createFractal("delay", 0.5);
function banaan(){
	function beepbep(){
		for(i = 0; i < 100; i++){
		log("aANGIJWNG " + i);
		}
	}
	beepbep();
	for(i = 0; i < 100; i++){
		log("hoi " + i);
	}
	
}
banaan();
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