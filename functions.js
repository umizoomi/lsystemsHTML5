jQuery.fn.mousehold=function(timeout,f){if(timeout&&typeof timeout=='function'){f=timeout;timeout=100;}
if(f&&typeof f=='function'){var timer=0;var fireStep=0;return this.each(function(){jQuery(this).mousedown(function(){fireStep=1;var ctr=0;var t=this;timer=setInterval(function(){ctr++;f.call(t,ctr);fireStep=2;},timeout);})
clearMousehold=function(){clearInterval(timer);if(fireStep==1)f.call(this,1);fireStep=0;}
jQuery(this).mouseout(clearMousehold);jQuery(this).mouseup(clearMousehold);})}}

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
		if (reset == true){
			setTimeout(function(){
				createFractal(true);
			}, 0);
		} else{
			setTimeout(function(){
				createFractal();
			}, 0);
		}
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