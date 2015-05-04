$(document).ready(function() 
{
	var operand = '+';
    var operations = [];
    var jeu = 14;
    var nbOperations = 24;
    var currentOperationIdx = 0;
    var nbGood = 0;
    var acceptInput = true;

	function initClock()
	{
		clock = new FlipClock($('.your-clock'), {
			clockFace :'MinuteCounter'
		});
		clock.stop(function() {});
	}

	function createOperationView(i)
    {
    	var allOperations = "";
        $("#questions").removeAttr("style");           
        
        allOperations += "<label id=\"operation"+i+"\">"+operations[i].firstNum + " " + operand + " " + operations[i].secondNum + " = </label>";        
        
        $("#questions").html(allOperations);

        $("#questions").animate({
		    width: "70%",
		    opacity: 1.0,
		    marginLeft: "0.6in",
		    fontSize: "3em",
		    borderWidth: "10px"
		  }, 1500 );

        $("#progressTxt").text(currentOperationIdx + "/" + nbOperations);
    }

    function createAnswersButtons(i)
    {
    	var allAnswers = "";                   
        var answer = operations[i].result;
		var answersHtml = new Array();
		var idx = 0;

        if (operations[i].result - 1 > 0)
		{
	        answersHtml[idx] = createAnswersButton(i,Number(operations[i].result) - 1);
	        idx++;
	        if (operations[i].result - 2 > 0)
			{
		        answersHtml[idx] = createAnswersButton(i,Number(operations[i].result) - 2);
		        idx++;
		    }
	    }

        answersHtml[idx] = createAnswersButton(i,answer);
        idx++;
	    answersHtml[idx] = createAnswersButton(i,Number(operations[i].result) + 1);
	    idx++;
	    answersHtml[idx] = createAnswersButton(i,Number(operations[i].result) + 2);

	    answersHtml = shuffle(answersHtml);

	    for (var k = 0;k < answersHtml.length;k++)
	    {
	    	if (answersHtml[k])
	    	{	    		
	    		 allAnswers += answersHtml[k];
	    		// if (k!= 0 && k % 2 == 0)
	    		// {
	    		// 	allAnswers += "<br/>";
	    		// 	allAnswers += "<br/>";	

	    		// }
	    		// else
	    		// {
	    			allAnswers+= "   ";	
	    		//}
	    	}
	    }
        
        $("#keyboard").html(allAnswers);
        acceptInput = true;
    }

    function createAnswersButton(i, answer)
    {
    	return "<div id=\"answer"+answer+"\" class=\"btn-key\" value="+answer+ " onclick=\'onInput(" + i + "," + answer + ")\'>"+answer+"</div>";
    }

	function onInput(i, answer)
	{
		if (acceptInput == true)
		{
			acceptInput = false;
			validate(i, answer);
			currentOperationIdx++;
			if (currentOperationIdx == nbOperations)
			{
				clock.stop(function() {});
				$("#resultat").text("Resultat: " + nbGood + "/" + nbOperations);

				$("#resultat").animate({
				    width: "70%",
				    opacity: 1.0,
				    marginRight: "0.6in",
				    fontSize: "5em",
				    borderWidth: "10px"
				  }, 1500 );
			}
			else
			{
				setTimeout(function() {createOperationView(currentOperationIdx);createAnswersButtons(currentOperationIdx)},1000);
			}

			setProgress();
		}
	}

	function setProgress()
	{
		$("#progressTxt").text(currentOperationIdx + "/" + nbOperations);

		$("#progressImg").removeClass();
		if (currentOperationIdx < 3)
		{			
			$("#progressImg").addClass("progress00");
		}
		else if (currentOperationIdx < 6)
		{			
			$("#progressImg").addClass("progress01");
		}
		else if (currentOperationIdx < 9)
		{			
			$("#progressImg").addClass("progress02");
		}
		else if (currentOperationIdx < 12)
		{			
			$("#progressImg").addClass("progress03");
		}
		else if (currentOperationIdx < 15)
		{			
			$("#progressImg").addClass("progress04");
		}
		else if (currentOperationIdx < 18)
		{			
			$("#progressImg").addClass("progress05");
		}
		else if (currentOperationIdx < 21)
		{			
			$("#progressImg").addClass("progress06");
		}
		else if (currentOperationIdx < 24)
		{			
			$("#progressImg").addClass("progress07");
		}
		else
		{			
			$("#progressImg").addClass("progress07");
		}
	}
	
	function validate(i, answer) 
	{
        var response = answer;
        $("#operation"+i).html($("#operation"+i).html()+ " " + response);
        if (response == operations[i].result)
        {
            $("#operation"+i).css("color","green");
            nbGood++;
        }
        else
        {
            $("#operation"+i).css("color","red");
        }
	}

	function start() 
	{
		clock = new FlipClock($('.your-clock'), {
				clockFace :'MinuteCounter'
		});

		jeu = $("#jeuduSel").val();
        operand = $("#operandSel").val();
        initOperations();
        createOperationView(0);
        createAnswersButtons(0);
        nbGood = 0;
        currentOperationIdx = 0;
        $("#resultat").text("");
	}

	function initOperations()
	{
		var useMaxNum = false;
		for (var i = 0;i < nbOperations;i++)
        {
            if (i % 2 == 0)
            {
            	useMaxNum = true;
            }
            else
            {
            	useMaxNum = false;
            }
            operations[i] = new Operation(operand, useMaxNum);
        }
	}

	function shuffle(array) 
	{
	    var counter = array.length, temp, index;

	    // While there are elements in the array
	    while (counter > 0) 
	    {
	        // Pick a random index
	        index = Math.floor(Math.random() * counter);

	        // Decrease counter by 1
	        counter--;

	        // And swap the last element with it
	        temp = array[counter];
	        array[counter] = array[index];
	        array[index] = temp;
	    }

	    return array;
	}

  	var Operation = function (operand, useMaxNum) 
  	{  
	    if (operand == '+')
	    {                    
	        if (useMaxNum)
		    {
				this.result = jeu;
				this.firstNum = Math.floor((Math.random() * jeu + 1));
				if (this.firstNum == jeu)
		        {
		            this.secondNum = 0;
		        }
		        else
		        {
		            this.secondNum = this.result - this.firstNum;
		        }
		    }
		    else
		    {
		    	this.firstNum = Math.floor((Math.random() * jeu) + 1);
		    	if (this.firstNum == jeu)
		        {
		            this.secondNum = 0;
		        }
		        else
		        {
		    		this.secondNum = Math.floor((Math.random() * (jeu-this.firstNum) + 1));
		    	}
		    	this.result = Number(this.firstNum) + Number(this.secondNum);
		    }
	    }
	    else
	    {
	        if (useMaxNum)
		    {
				this.firstNum = jeu;
		    }
		    else
		    {
		    	this.firstNum = Math.floor((Math.random() * jeu) + 1);
		    }

	    	this.secondNum = Math.floor((Math.random() * this.firstNum) + 1);
        	this.result = Number(this.firstNum) - Number(this.secondNum);		    
	    }
	};	

	initClock();

});

