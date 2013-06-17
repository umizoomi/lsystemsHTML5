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
	checkDrawReady();
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
		} else if (fractal == "dragoncurve"){
			if(reset == true){
				angle = 90;
				distance = 10;
				iterations = 10;
				speed = 5;
				startPosX = 500;
				startPosY = 425;
				turtle.resetTurtle();
			}
			createDragoncurve(mode, true);
		}
		updateControls();
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