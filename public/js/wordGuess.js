var timer = null;
var imageObj = [];
var indexImgTarget = 2;
var ResizeFactor;
var MAX_IMAGE = 10;	
var NBR_BTN = 4;	

Init();

function Init()
{
	resetGame();
}

function resetGame()
{

	indexImgTarget =  Math.floor(Math.random() * MAX_IMAGE);
	//indexImgTarget =  Math.floor(indexImgTarget);

    var tickTimer = 10,
        display = document.querySelector('#time');

    startTimer(tickTimer, display);

	for (i = 0; i < MAX_IMAGE + 1 ; i++){ 
	   imageObj[i] = new Image();
	}

	InitializeAllImages();
	SetButtonName();

	timer = setInterval(SetLayout,125);						
}	

function InitializeAllImages()
{	
	imageObj[0].src = 'img/perroquet.jpg';
	imageObj[0].pName = 'Perroquet';

	imageObj[1].src = 'img/eagle.jpg';
	imageObj[1].pName = 'Aigle';

	imageObj[2].src = 'img/testfifi.gif';
	imageObj[2].pName = 'Fifi';

	imageObj[3].src = 'img/cats.jpg';
	imageObj[3].pName = 'chat';

	imageObj[4].src = 'img/duck.jpg';
	imageObj[4].pName = 'Canard';

	imageObj[5].src = 'img/horse.jpg';
	imageObj[5].pName = 'Cheval';

	imageObj[6].src = 'img/lion.jpg';
	imageObj[6].pName = 'lion';

	imageObj[7].src = 'img/monkey.jpg';
	imageObj[7].pName = 'Singe';

	imageObj[8].src = 'img/penguin.jpg';
	imageObj[8].pName = 'Pinguin';

	imageObj[9].src = 'img/voilier.jpg';
	imageObj[9].pName = 'Voilier';

	imageObj[10].src = 'img/zebra.jpg';
	imageObj[10].pName = 'Zebre';;

	for(ii= 0; ii < MAX_IMAGE + 1;ii++)
	{
		console.log("MAIN VECT[" + ii + "] = " + imageObj[ii].pName);
	}
}


function FindResizeFactor(oriW, oriH, tarW, tarH)
{
	var factorW = oriW / tarW;
	var factorH = oriH / tarH;
	return (Math.max(factorW, factorH));
}	

function SetLayout()
{
	clearInterval(timer);

	ResizeFactor = FindResizeFactor(imageObj[indexImgTarget].width, imageObj[indexImgTarget].height, myCanvas.width, myCanvas.height);

	timer = setInterval(OnPaint,125);						
}

function OnPaint()
{
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");

	// FILL BACK GROUD	
	 //ctx.fillStyle = "#FF00FF";
	 //ctx.fillRect(0,0,1350,400);	

	ctx.drawImage(imageObj[indexImgTarget], 0, 0, imageObj[indexImgTarget].width, imageObj[indexImgTarget].height, 0, 0, imageObj[indexImgTarget].width / ResizeFactor, imageObj[indexImgTarget].height / ResizeFactor);

	// Reset timer based on settings
	clearInterval(timer);
	timer = setInterval(OnPaint,50);	
	
}

function SetButtonName()
{
	var tempIdx = [];

	for (i = 0; i < NBR_BTN + 1 ; i++)
	{
		var pItem; 
		pItem =  Math.floor(Math.random() * MAX_IMAGE);

		if ((tempIdx.indexOf(pItem) == -1) && (pItem != indexImgTarget))
			tempIdx[i] = pItem;				
		else
			i--;
	}

	tempIdx[Math.floor(Math.random() * NBR_BTN)] = indexImgTarget;

	btnA.textContent = imageObj[tempIdx[0]].pName;	
	btnB.textContent = imageObj[tempIdx[1]].pName;	
	btnC.textContent = imageObj[tempIdx[2]].pName;	
	btnD.textContent = imageObj[tempIdx[3]].pName;	
}

function OnClickEvent(pBtn)
{
	var imgResult = new Image();
	//imageObj[0].src = 'img/perroquet.jpg';	

	if(pBtn.textContent == imageObj[indexImgTarget].pName)
	{
		var c=document.getElementById("myCanvasResult");
		var ctx=c.getContext("2d");

		// FILL BACK GROUD	
		ctx.fillStyle = "#22FF22";
		ctx.fillRect(0,0,1350,400);	

		//alert("SUCCESS");		
	}
	else
	{
		var c=document.getElementById("myCanvasResult");
		var ctx=c.getContext("2d");

		// FILL BACK GROUD	
		ctx.fillStyle = "#FF2222";
		ctx.fillRect(0,0,1350,400);	
		//alert("FAILURE");		
	}
}

//
// TIMER
//
var mainTimer = null;
function startTimer(duration, display) {
    var timerII = duration, minutes, seconds;
    mainTimer = setInterval(function () {
        minutes = parseInt(timerII / 60, 10);
        seconds = parseInt(timerII % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timerII < 0) {
        	//clearInterval(mainTimer);
        	//resetGame();
            timerII = duration;
        }
    }, 1000);
}



//
// END TIMER
//


//
// GAME
//
/*
var pImageVect[];
var pWord;

function InitGame()
{

}	


function DisplayImages()
{

}
*/