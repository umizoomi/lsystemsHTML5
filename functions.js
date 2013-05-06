angle = 60;
distance = 10;
iterations = 6;
speed = 10;
mode = "normal";
startPosX = 500;
startPosY = 800;

var turtle = new turtle(startPosX, startPosY, angle);
var ctx = new draw("canvas");
var fractal = "sierpinski";
$("#danceFractal").click(function(){
	alert(drawready + " " + breakloop);
});
createSierpinski(mode, false);
$("#mode").on('change', function(){
	mode = $("#mode").val();
	if (mode == "normal"){
		breakloop = true;
	}
	createFractal();
	updateControls();
});
$("#angleMin").mousehold(function(){
	lowerAngle();
});
$("#anglePlus").mousehold(function(){
	higherAngle();
});
function createFractal(reset){
	reset = (typeof reset === "undefined") ? false : reset;
	if (drawready == true){
		turtle.resetTurtle();
		if(fractal == "sierpinski"){
			if(reset == true){
				angle = 60;
				distance = 10;
				iterations = 6;
				speed = 20;
				updateStartPos();
			}
			createSierpinski(mode, true);
		} else if (fractal == "plant"){
			if(reset == true){
				angle = 60;
				distance = 10;
				iterations = 6;
				speed = 20;
				updateStartPos();
			}
			createPlant(mode, true);
		}
	} else{
		setTimeout(function(){
			createFractal();
		}, 0);
	}
}
function checkboxLiveCheck(){
	if(mode == "normal"){
		$(".livechk").attr("disabled", true);
	} else{
		$(".livechk").removeAttr("disabled");
	}
}
function lowerAngle(){
	angle = angle - 1;
	updateControls();
	chkbox = $("#angleLive").is(":checked");
	if(chkbox == false){
		if(!drawready){
			breakloop = true;
		}
		createFractal();
	}
}
function higherAngle(){
	angle = angle + 1;
	updateControls();
	chkbox = $("#angleLive").is(":checked");
	if(chkbox == false){
		if(!drawready){
			breakloop = true;
		}
		createFractal();
	}
}
function updateStartPos(){

}
function updateControls(){
	$("#generations").val(iterations);
	$("#angle").html(angle + "&deg;");
	$("#distance").val(distance);
	checkboxLiveCheck();
}
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$(document).ready(function(){
	updateControls();
});
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