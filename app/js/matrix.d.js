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
	if(introParam == 'write' || introParam == 'read') {var dir = '../'} else {var dir = ''}
	MatrixMainWrapper = document.getElementsByClassName('Matrix-mainWrapper')[0];
	MatrixMainWrapper.style.display = 'none';
	var headerInnerStyle = document.createElement('style');
	headerInnerStyle.appendChild(document.createTextNode('@font-face {font-family: "matrixFont";src: url("' + dir + 'fonts/matrix.ttf");}'));
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
	matrixMainKeypressAudio.src = dir + 'audio/keypress.mp3';
	matrixMainKeypressAudio.setAttribute('preload', 'auto');
	var MatrixModem = document.createElement('audio');
	MatrixModem.id = 'MatrixModem';
	MatrixModem.src = dir + 'audio/modem.mp3';
	MatrixModem.setAttribute('preload', 'auto');
	matrixMainHolder.appendChild(matrixMainCanvas);
	matrixMainHolder.appendChild(matrixMainKeypressAudio);
	matrixMainHolder.appendChild(MatrixModem);
	document.body.insertBefore(matrixMainHolder, document.body.firstChild);
	if(introParam == 'yes') {
 		cursorMatrixBG(introParam);
 		reloadDweetFor();
 	} else if(introParam == 'write') {
 		cursorMatrixBG();
 		getUrlValue();
		reloadDweetSend()
 	} else if(introParam == 'read') {
 		cursorMatrixBG();
 		getUrlValue();
 		reloadDweetFor();
 	} else {
 		cursorMatrixBG();
 		getUrlValue();
 		reloadDweetFor();
 	}
	

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
			document.getElementById('btnR').style.display = 'block';
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
		document.getElementById('rotR').innerHTML = seq;
} 

function dweetMessage() {
		document.getElementById('rotS').innerHTML = "";
	showDweets();
		document.getElementById('btnS').style.display = 'none';
		document.getElementById('sendProgress').style.display = 'block';
	var addThing = document.getElementById('thing').value;		// add Dweet thing value 
	var numberRotate = +document.getElementById('turn').value; 	// add rotate number
	var s = null;
		s = document.getElementById('s').value;					// add message textarea
    	s = s.replace(/(\r\n|\n|\r)/gm,'');						// line break replace
    var rt = rot(s, numberRotate);								// rotate function

/*	Array : 
		1) add lines, date, number of rotate, text after rotate and text of array end.
		2) array concatenation.
*/
	var na = ["--------------"];								// 
		na.push("Date de la séquence " + dateString );
		na.push("--------------");
		na.push("utilisez ROT" + numberRotate + " après assemblage");
	var nb = rt.split("");
		nb.push("--------------");
		nb.push("Bon choix pour la pilule. Vous y êtes presque.");
	var m = na.concat(nb);

/*	Send Dweet : 
		1) setting the number of loops.
		2) time delay setting to send.
		3) send to Dweet function.
*/
	var prog_bar = document.getElementById('sendBar');
	var width = 0;
	var send = m.length * 10;
	var id = setInterval(frame, send);
		function frame() {
		if (width == 100) {
			clearInterval(id);
		} else {
			width++; 
			prog_bar.style.width = width + '%'; 
		}
		}
	for (var i = 0; i < m.length; i++) {
	setTimeout(function(x) { return function() {
		dweetio.dweet_for(addThing, {message:m[x]}, function(err, dweet){

        console.log(dweet.thing); 	// The thing of the dweet
        console.log(dweet.content); // The content of the dweet
        console.log(dweet.created); // The create date of the dweet

		}); //sending dweet code ends here
    if (x + 1 == m.length) {
		document.getElementById('sendProgress').style.display = 'none';
		document.getElementById('btnS').style.display = 'block';
    }
    }; }(i), 1000*i);
	}
}
function showDweets() {
	var addThing = document.getElementById('thing').value;		// add Dweet thing value 
		document.getElementById('title').innerHTML = addThing;
		dweetio.listen_for(addThing, function(dweet){
		console.log(dweet);
		document.getElementById('rotS').innerHTML += dweet.content.message;  
  });
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
// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function getUrlValue() 
{
 	getUrlVars();
	var test = getUrlVars()["t"];
	if(test == 'undefined') {
 	var th = "rc2c-jobapplication";
 	var ro = "13";
 		document.getElementById("thing").value = th;
 		document.getElementById("turn").value = ro;
	} else {
 	var th = getUrlVars()["t"];
 	var ro = getUrlVars()["r"];
 		document.getElementById("thing").value = th;
 		document.getElementById("turn").value = ro;
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
function addUrlParam(url, key, value) {
    var newParam = key+"="+value;
    var result = url.replace(new RegExp("(&|\\?)"+key+"=[^\&|#]*"), '$1' + newParam);
    if (result === url) { 
        result = (url.indexOf("?") != -1 ? url.split("?")[0]+"?"+newParam+"&"+url.split("?")[1] 
           : (url.indexOf("#") != -1 ? url.split("#")[0]+"?"+newParam+"#"+ url.split("#")[1] 
              : url+'?'+newParam));
    }
    return result;
}
function reloadDweetFor()
{
	var txr = "<br>hello, concerning readDweet<br>push the rotate button or Access key 'r'<br>push the write button or Access key 'e'<br>push the reload button after modify thing or Access key 'd'";
	var akw = "<br>use Access key ( <a href='https://en.wikipedia.org/wiki/Access_key' title='Access key on Wikipedia' target='_blank'>hyperlink</a> )";
	var addThing = document.getElementById('thing').value;
	var numberRotate = +document.getElementById('turn').value;
		document.getElementById('rotR').innerHTML = null;
		document.getElementById('rotR').innerHTML =  txr + akw;
	if(introParam == 'yes') {var dir = ''} else {var dir = '../'}
	var url = "location.href='"+dir+"write/?r=" + numberRotate + "&p=1'";
		link.setAttribute('onclick', addUrlParam(url, "t", addThing));
		getDweetFor();
}
function reloadDweetSend()
{
	var txw = "<br>hello, concerning writeDweet<br>push the send button or Access key 's'<br>push the read button or Access key 'e'<br>push the reload button after modify thing or Access key 'd'";
	var akw = "<br>use Access key ( <a href='https://en.wikipedia.org/wiki/Access_key' title='Access key on Wikipedia' target='_blank'>hyperlink</a> )";
	var addThing = document.getElementById('thing').value;
	var numberRotate = +document.getElementById('turn').value;
		document.getElementById('title').innerHTML = addThing;
		document.getElementById('rotS').innerHTML = null;
		document.getElementById('rotS').innerHTML =  txw + akw;
	if(introParam == 'yes') {var dir = ''} else {var dir = '../'}
	var url = "location.href='"+dir+"read/?r=" + numberRotate + "&p=1'";
		link.setAttribute('onclick', addUrlParam(url, "t", addThing));
		document.getElementById('sendProgress').style.display = 'none';
		document.getElementById('btnS').style.display = 'block';
}