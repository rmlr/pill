var canvas, ctx, columns, mainInterval, whiteFontInterval, soundKeypress, soundModem, MatrixMainWrapper, introParam;
var letters = "abcdefghijklmnopqrstuwxyz1234567890";
var fontSize = 25;
var keypressInterval = 200;
var canvasLoaded = false;
var timeoutParam = 500;
var letterPos = [];
var prev = [];
var timeouts = [];
var bodyLoaded = false;

window.addEventListener("resize", onCanvasResize);

window.onload = function() {
	MatrixMainWrapper = document.getElementsByClassName('Matrix-mainWrapper')[0];
	MatrixMainWrapper.style.display = 'none';
	var headerInnerStyle = document.createElement('style');
	headerInnerStyle.appendChild(document.createTextNode('@font-face {font-family: "matrixFont";src: url("fonts/matrix.ttf");}'));
	headerInnerStyle.appendChild(document.createTextNode('.Matrix-mainWrapper {position: relative;}'));
	document.head.appendChild(headerInnerStyle);
	var matrixMainHolder = document.createElement('div');
	matrixMainHolder.id = 'MatrixBgHolder';
	matrixMainHolder.style.position = "absolute";
	matrixMainHolder.style.top = "0";
	matrixMainHolder.style.right = "0";
	matrixMainHolder.style.bottom = "0";
	matrixMainHolder.style.left = "0";
	document.body.style.background = "#000";
	var matrixMainCanvas = document.createElement('canvas');
	matrixMainCanvas.id = 'MatrixCanvas';
	var matrixMainKeypressAudio = document.createElement('audio');
	matrixMainKeypressAudio.id = 'MatrixKeypress';
	matrixMainKeypressAudio.src = 'audio/keypress.mp3';
	matrixMainKeypressAudio.setAttribute('preload', 'auto');
	var MatrixModem = document.createElement('audio');
	MatrixModem.id = 'MatrixModem';
	MatrixModem.src = 'audio/modem.mp3';
	MatrixModem.setAttribute('preload', 'auto');
	matrixMainHolder.appendChild(matrixMainCanvas);
	matrixMainHolder.appendChild(matrixMainKeypressAudio);
	matrixMainHolder.appendChild(MatrixModem);
	document.body.insertBefore(matrixMainHolder, document.body.firstChild);
	document.getElementById('rot').innerHTML = "please, push the rotate button or Access key 'r' ! ( <a href='https://en.wikipedia.org/wiki/Access_key' title='Access key on Wikipedia' target='_blank'>hyperlink</a> )";
	if(introParam == 'yes') {
 		cursorMatrixBG(introParam);
 	} else {
 		cursorMatrixBG();
 	}
 		getDweetFor();
 };

 function MatrixInit(intro)
 {
 	introParam = intro;
 	
 }

function setupMatrixBG()
{
	if(!canvasLoaded)
	{
		canvas = document.getElementById("MatrixCanvas");
		ctx = canvas.getContext("2d");
		letters = letters.split("");
		canvasLoaded = true;
	}
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	columns = canvas.width/fontSize; 
	for(var x = 0; x < columns; x++){
		letterPos[x] = window.innerHeight; 
	}
}

function cursorMatrixBG(introNeeded)
{
	setupMatrixBG();
	var loadIntro = introNeeded || 'no';
	if(loadIntro == 'yes')
	{
		var animText = new Array("$ root login:", "_", "rc2c", "$ root password:", "***","$ calling, please wait...", " OK", "$ entering the matrix, welcome.");
		soundKeypress = document.getElementById('MatrixKeypress');
		soundModem = document.getElementById('MatrixModem');
		ctx.font = fontSize + "px arial";
		ctx.fillStyle = '#0F0';
	    ctx.font = '20px sans-serif';
		ctx.fillText(animText[0], 20, fontSize);
		ctx.fillText(animText[1], 130, fontSize);
		timeouts.push(setTimeout(function(){ctx.clearRect(130, fontSize, canvas.width,fontSize);},timeoutParam));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[1], 130, fontSize);},timeoutParam*2));
		timeouts.push(setTimeout(function(){ctx.clearRect(125, fontSize, canvas.width,fontSize);},timeoutParam*3));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[1], 130, fontSize);},timeoutParam*4));
		timeouts.push(setTimeout(function(){ctx.clearRect(125, fontSize, canvas.width,fontSize);},timeoutParam*5));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[1], 130, fontSize);},timeoutParam*6));
		timeouts.push(setTimeout(function(){ctx.clearRect(125, fontSize, canvas.width,fontSize);},timeoutParam*7));
		timeouts.push(setTimeout(function(){typeOut(animText[2], 130, fontSize, 0, 0 ); soundKeypress.play();},timeoutParam*8));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[3], 20, fontSize*2);},timeoutParam*10));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[1], 175, fontSize*2);},timeoutParam*11));
		timeouts.push(setTimeout(function(){ctx.clearRect(170, fontSize*2, canvas.width,fontSize);},timeoutParam*12));
		timeouts.push(setTimeout(function(){typeOut(animText[4], 175, fontSize*2, 0, 0 ); soundKeypress.play();},timeoutParam*15));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[5], 20, fontSize*3);},timeoutParam*17));
		timeouts.push(setTimeout(function(){soundModem.play();},timeoutParam*18));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[6], 230, fontSize*3);},timeoutParam*33));
		timeouts.push(setTimeout(function(){ctx.clearRect(0, 0, canvas.width, canvas.height);},timeoutParam*35));
		timeouts.push(setTimeout(function(){
			mainInterval = setInterval(drawMatrixBG, 80); 
			fadeIn(MatrixMainWrapper); 
			bodyLoaded=true;
		},(timeoutParam*35)+100));
	}
	else
	{
		mainInterval = setInterval(drawMatrixBG, 80); 
		if(!bodyLoaded){
				fadeIn(MatrixMainWrapper); 
				bodyLoaded=true;
			}
	}
}

function drawMatrixBG()
{
	prev = [];
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#fff"; 
	ctx.font = fontSize + "px matrixFont";
	for(var i = 0; i < letterPos.length; i++)
	{
		var text = letters[Math.floor(Math.random()*letters.length)];
		prev.push(text);
		ctx.fillText(text, i*fontSize, letterPos[i]*fontSize);

		if(letterPos[i]*fontSize > canvas.height && Math.random() > 0.945){
			letterPos[i] = 0;
		}
		letterPos[i]++;
	}
	whiteFontInterval = setTimeout(function(){ 
		ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#0F0"; 
		ctx.font = fontSize + "px matrixFont";
		for(var r = 0; r < letterPos.length; r++)
		{
			ctx.fillText(prev[r], r*fontSize, (letterPos[r]-1)*fontSize);
		}
	}, 190);
}

function getDweetFor()
{
document.getElementById('s').innerHTML = "";
var addThing = document.getElementById('thing').value;
document.getElementById('title').innerHTML = addThing;
 	// Dweet read thing function
dweetio.get_all_dweets_for(addThing, function(err, dweets){

    // Dweets is an array of dweets
    // Dweets thing reverse
    dweets.reverse();
	// Dweet out
    var out = "";
    for(theDweet in dweets)
    {
        var dweet = dweets[theDweet];
        // Dweet thing cleaning
        findAndReplace(dweet, "--------------", "\r");
        findAndReplace(dweet, "utilisez ROT13 après assemblage", "\r");
        findAndReplace(dweet, "Bon choix pour la pilule. Vous y êtes presque.", "\r");
        // Dweet output message
        out += dweet.content.message;
    }
    	// Dweet output in html
    	var put = out.replace(/undefined/gi, "");
		document.getElementById('s').innerHTML = put;
		document.getElementById('btn').style.display = 'block';
});
}

function handleRotate() 
{	
	var numberRotate = +document.getElementById('turn').value;
	var s = null;
	s = document.getElementById('s').value;
    var rt = rot(s, numberRotate);
    var wr = rt.replace(/(\r\n|\n|\r)/gm,'<br>');
    var seq = wr.replace(/Qngr qr yn fédhrapr/gi, "Date de la séquence");
	document.getElementById('rot').innerHTML = seq;
} 

function typeOut(str, startX, startY, lineHeight, padding) {
    var cursorX = startX || 0;
    var cursorY = startY || 0;
    var lineHeight = lineHeight || 32;
    padding = padding || 10;
    var i = 0;
    $_inter = setInterval(function() {
        var w = ctx.measureText(str.charAt(i)).width;
        if(cursorX + w >= canvas.width - padding) {
            cursorX = startX;
            cursorY += lineHeight;
        }
        ctx.fillText(str.charAt(i), cursorX, cursorY);
        i++;
        cursorX += w;
        if(i === str.length) {
            clearInterval($_inter);
        }
    }, keypressInterval);
}

function fadeIn(mainElement){
  mainElement.style.opacity = 0;
  mainElement.style.display = "block";
  (function fade() {
    var val = parseFloat(mainElement.style.opacity);
    if (!((val += .1) > 1)) {
      mainElement.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
function onCanvasResize() {
	if(soundKeypress)
	{
		soundKeypress.pause();
		soundKeypress.currentTime = 0;	
	}
	if(soundModem)
	{
		soundModem.pause();
		soundModem.currentTime = 0;
	}
    clearInterval(mainInterval);
	clearInterval(whiteFontInterval);
	for (var i=0; i<timeouts.length; i++) {
	  clearTimeout(timeouts[i]);
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	cursorMatrixBG();
	if(!bodyLoaded){
		fadeIn(MatrixMainWrapper);
		bodyLoaded = true;
	}
}
// thing cleaning function
function findAndReplace(object, value, replacevalue){
  for(var x in object){
    if(typeof object[x] == typeof {}){
      findAndReplace(object[x], value, replacevalue);
    }
    if(object[x] == value){ 
      object["message"] = replacevalue;
      // break; // uncomment to stop after first replacement
    }
  }
}
// Rot : Encoding / Decoding
function rot(s, i) {
    // modified for general rot# from
    // http://stackoverflow.com/a/617685/987044
    return s.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26);
    });
}
function reloadDweetFor()
{
	document.getElementById('rot').innerHTML = "";
	document.getElementById('rot').innerHTML = "please, push the rotate button or Access key 'r' ! ( <a href='https://en.wikipedia.org/wiki/Access_key' title='Access key on Wikipedia' target='_blank'>hyperlink</a> )";
	getDweetFor();
}