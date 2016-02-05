var canvas, ctx, columns, mainInt, whiteFontInt, sdKeypress, sdModem, matMainWrapper, intParam;
var letters = "abcdefghijklmnopqrstuwxyz1234567890";
var fontSize = 25;
var kpressInt = 200;
var canvasLoad = false;
var timeoutPar = 500;
var lettersPos = [];
var prev = [];
var timeouts = [];
var bodyLoad = false;

window.addEventListener("resize", onCanvasResize);

window.onload = function() {
	if(intParam == 'write' || intParam == 'read') {var dir = '../'} else {var dir = ''}
	matMainWrapper = document.getElementsByClassName('Mat-mainWrapper')[0];
	matMainWrapper.style.display = 'none';
	var headerInnerStyle = document.createElement('style');
	headerInnerStyle.appendChild(document.createTextNode('@font-face {font-family: "matrixFont";src: url("' + dir + 'fonts/matrixFont.ttf");}'));
	headerInnerStyle.appendChild(document.createTextNode('.Mat-mainWrapper {position: relative;}'));
	document.head.appendChild(headerInnerStyle);
	var matMainHolder = document.createElement('div');
	matMainHolder.id = 'MatHolder';
	matMainHolder.style.position = "absolute";
	matMainHolder.style.top = "0";
	matMainHolder.style.right = "0";
	matMainHolder.style.bottom = "0";
	matMainHolder.style.left = "0";
	document.body.style.background = "#000";
	var matMainCanvas = document.createElement('canvas');
	matMainCanvas.id = 'MatCanvas';
	var matMainKeypressAudio = document.createElement('audio');
	matMainKeypressAudio.id = 'MatKeypress';
	matMainKeypressAudio.src = dir + 'audio/keypressSound.mp3';
	matMainKeypressAudio.setAttribute('preload', 'auto');
	var MatModem = document.createElement('audio');
	MatModem.id = 'MatModem';
	MatModem.src = dir + 'audio/modemSound.mp3';
	MatModem.setAttribute('preload', 'auto');
	matMainHolder.appendChild(matMainCanvas);
	matMainHolder.appendChild(matMainKeypressAudio);
	matMainHolder.appendChild(MatModem);
	document.body.insertBefore(matMainHolder, document.body.firstChild);
	if(intParam == 'yes') {
 		cursorMatrixBG(intParam);
 		reloadDweetFor();
 	} else if(intParam == 'write') {
 		cursorMatrixBG();
 		getUrlValue();
		reloadDweetSend();
 	} else if(intParam == 'read') {
 		cursorMatrixBG();
 		getUrlValue();
 		reloadDweetFor();
 	} else {
 		cursorMatrixBG();
 		getUrlValue();
 		reloadDweetFor();
 	}
 	changesThing();
 };

 function MatInit(intro)
 {
 	intParam = intro;
 	
 }

function setupMatBG()
{
	if(!canvasLoad)
	{
		canvas = document.getElementById("MatCanvas");
		ctx = canvas.getContext("2d");
		letters = letters.split("");
		canvasLoad = true;
	}
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	columns = canvas.width/fontSize; 
	for(var x = 0; x < columns; x++){
		lettersPos[x] = window.innerHeight; 
	}
}

function cursorMatrixBG(introNeeded)
{
	setupMatBG();
	var loadIntro = introNeeded || 'no';
	if(loadIntro == 'yes')
	{
		var animText = new Array("$ root login:", "_", "neo", "$ root password:", "***","$ calling, please wait...", " OK", "$ entering the matrix, welcome.");
		sdKeypress = document.getElementById('MatKeypress');
		sdModem = document.getElementById('MatModem');
		ctx.font = fontSize + "px arial";
		ctx.fillStyle = '#0F0';
	    ctx.font = '20px sans-serif';
		ctx.fillText(animText[0], 20, fontSize);
		ctx.fillText(animText[1], 130, fontSize);
		timeouts.push(setTimeout(function(){ctx.clearRect(130, fontSize, canvas.width,fontSize);},timeoutPar));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[1], 130, fontSize);},timeoutPar*2));
		timeouts.push(setTimeout(function(){ctx.clearRect(125, fontSize, canvas.width,fontSize);},timeoutPar*3));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[1], 130, fontSize);},timeoutPar*4));
		timeouts.push(setTimeout(function(){ctx.clearRect(125, fontSize, canvas.width,fontSize);},timeoutPar*5));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[1], 130, fontSize);},timeoutPar*6));
		timeouts.push(setTimeout(function(){ctx.clearRect(125, fontSize, canvas.width,fontSize);},timeoutPar*7));
		timeouts.push(setTimeout(function(){typeOut(animText[2], 130, fontSize, 0, 0 ); sdKeypress.play();},timeoutPar*8));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[3], 20, fontSize*2);},timeoutPar*10));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[1], 175, fontSize*2);},timeoutPar*11));
		timeouts.push(setTimeout(function(){ctx.clearRect(170, fontSize*2, canvas.width,fontSize);},timeoutPar*12));
		timeouts.push(setTimeout(function(){typeOut(animText[4], 175, fontSize*2, 0, 0 ); sdKeypress.play();},timeoutPar*15));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[5], 20, fontSize*3);},timeoutPar*17));
		timeouts.push(setTimeout(function(){sdModem.play();},timeoutPar*18));
		timeouts.push(setTimeout(function(){ctx.fillText(animText[6], 230, fontSize*3);},timeoutPar*33));
		timeouts.push(setTimeout(function(){ctx.clearRect(0, 0, canvas.width, canvas.height);},timeoutPar*35));
		timeouts.push(setTimeout(function(){
			mainInt = setInterval(drawMatrixBG, 80); 
			fadeIn(matMainWrapper); 
			bodyLoad=true;
		},(timeoutPar*35)+100));
	}
	else
	{
		mainInt = setInterval(drawMatrixBG, 80); 
		if(!bodyLoad){
				fadeIn(matMainWrapper); 
				bodyLoad=true;
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
	for(var i = 0; i < lettersPos.length; i++)
	{
		var text = letters[Math.floor(Math.random()*letters.length)];
			prev.push(text);
			ctx.fillText(text, i*fontSize, lettersPos[i]*fontSize);

		if(lettersPos[i]*fontSize > canvas.height && Math.random() > 0.945){
			lettersPos[i] = 0;
		}
		lettersPos[i]++;
	}
	whiteFontInt = setTimeout(function(){ 
		ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#0F0"; 
		ctx.font = fontSize + "px matrixFont";
		for(var r = 0; r < lettersPos.length; r++)
		{
			ctx.fillText(prev[r], r*fontSize, (lettersPos[r]-1)*fontSize);
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
		today = new Date();
	var dateString = today.format("dd-mm-yyyy HH:MM");
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
	var na = [];
		na.push("--------------");								// 
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
    }, kpressInt);
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
	if(sdKeypress)
	{
		sdKeypress.pause();
		sdKeypress.currentTime = 0;	
	}
	if(sdModem)
	{
		sdModem.pause();
		sdModem.currentTime = 0;
	}
    clearInterval(mainInt);
	clearInterval(whiteFontInt);
	for (var i=0; i<timeouts.length; i++) {
	  clearTimeout(timeouts[i]);
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	cursorMatrixBG();
	if(!bodyLoad){
		fadeIn(matMainWrapper);
		bodyLoad = true;
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
 	var th = "neo";
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
function changesThing()
{
	var thing = document.querySelector('#thing');
	var title = document.querySelector('#title');
	thing.addEventListener('thing', function()
	{
    title.textContent = thing.value;
    var addThing = thing.value;
	if(intParam == 'yes' || intParam == 'read') {
 		reloadDweetFor();
 	} else if(intParam == 'write') {
		reloadDweetSend();
 	} else {
 		reloadDweetFor();
 	}
	});
}
function reloadDweetFor()
{
	var txr = "<br>hello, concerning readDweet<br>push the rotate button or Access key 'r'<br>push the write button or Access key 'e'<br>push the reload button after modify thing or Access key 'd'";
	var akw = "<br>use Access key ( <a href='https://en.wikipedia.org/wiki/Access_key' title='Access key on Wikipedia' target='_blank'>hyperlink</a> )";
	var addThing = document.getElementById('thing').value;
	var numberRotate = +document.getElementById('turn').value;
		document.getElementById('title').innerHTML = addThing;
		document.getElementById('rotR').innerHTML = null;
		document.getElementById('rotR').innerHTML =  txr + akw;
	if(intParam == 'yes') {var dir = ''} else {var dir = '../'}
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
	if(intParam == 'yes') {var dir = ''} else {var dir = '../'}
	var url = "location.href='"+dir+"read/?r=" + numberRotate + "&p=1'";
		link.setAttribute('onclick', addUrlParam(url, "t", addThing));
		document.getElementById('sendProgress').style.display = 'none';
		document.getElementById('btnS').style.display = 'block';
}