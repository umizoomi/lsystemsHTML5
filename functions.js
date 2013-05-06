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

createSierpinski(mode, false);

$("#danceFractal").click(function(){
	alert("feature not implemented");
});
$("#fractal").on('change', function(){
	changeFractal();
});
$("#distance").on('change', function(){
	changeDistance();
});
$("#generations").on('change', function(){
	changeGenerations();
});
$("#mode").on('change', function(){
	changeMode();
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
				startPosX = 500;
				startPosY = 800;
				turtle.resetTurtle();
			}
			createSierpinski(mode, true);
		} else if (fractal == "plant"){
			if(reset == true){
				angle = 25;
				distance = 3.5;
				iterations = 6;
				speed = 5;
				startPosX = 950;
				startPosY = 800;
				turtle.resetTurtle();
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
function changeFractal(){
	fractal = $("#fractal").val();
	checkDrawReady();
	createFractal(true);
}
function changeDistance(){
	distance = $("#distance").val();
	chkbox = $("#distanceLive").is(":checked");
	if(chkbox == false || mode == "normal"){
		checkDrawReady();
		createFractal();
	}
	updateControls();
}
function changeMode(){
	mode = $("#mode").val();
	checkDrawReady();
	createFractal();
	updateControls();
}
function changeGenerations(){
	iterations = $("#generations").val();
	checkDrawReady();
	createFractal();
	updateControls();
}
function lowerAngle(){
	angle = angle - 1;
	updateControls();
	chkbox = $("#angleLive").is(":checked");
	if(chkbox == false || mode == "normal"){
		checkDrawReady();
		createFractal();
	}
}
function higherAngle(){
	angle = angle + 1;
	updateControls();
	chkbox = $("#angleLive").is(":checked");
	if(chkbox == false || mode == "normal"){
		checkDrawReady();
		createFractal();
	}
}
function checkDrawReady(){
	if(!drawready){
		breakloop = true;
	} else{
		return false;
	}
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