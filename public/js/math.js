$(document).ready(function() 
{
	var operand = '+';
    var operations = [];
    var jeu = 14;
    var nbOperations = 24;

	initClock = function()
	{
		clock = new FlipClock($('.your-clock'), {
			clockFace :'MinuteCounter'
		});
		clock.stop(function() {});
	}
	
	validate = function() 
	{
		for (var i = 0;i < operations.length;i++)
        {
            var response = $("#result"+i).val();
            if (response == operations[i].result)
            {
                $("#operation"+i).css("color","green");
            }
            else
            {
                $("#operation"+i).css("color","red");
            }
        }

		clock.stop(function() {});
		$('#validateBtn').attr('disabled','disabled');
	}

	start = function() 
	{
		clock = new FlipClock($('.your-clock'), {
				clockFace :'MinuteCounter'
		});

		jeu = $("#jeuduSel").val();
        operand = $("#operandSel").val();
        initOperations();
        createOperation();
        $('#validateBtn').removeAttr('disabled');
	}

	initOperations = function()
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

  	var Operation = function (operand, useMaxNum) {
          
	    if (useMaxNum)
	    {
			this.firstNum = jeu;
	    }
	    else
	    {
	    	this.firstNum = Math.floor((Math.random() * jeu) + 1);
	    }
	    
	    if (operand == '+')
	    {                    
	        if (this.firstNum == jeu)
	        {
	            this.secondNum = 0;
	        }
	        else
	        {
	            this.secondNum = Math.floor((Math.random() * (jeu-this.firstNum) + 1));
	        }
	        this.result = this.firstNum + this.secondNum;
	    }
	    else
	    {
	        this.secondNum = Math.floor((Math.random() * this.firstNum) + 1);
	        this.result = this.firstNum - this.secondNum;
	    }
	};

	var createResult = function()
    {
        var resultOption = "<option value=\"" + "" + "\">" + "" + "</option>";
        for (i=0;i<=jeu;i++)
        {
            resultOption += "<option value=\"" + i + "\">" + i + "</option>";
        }
        return resultOption;
    }

	var createOperationColumn = function(columnId, startIdx)
    {
        var allOperations = "";
        for (var i = startIdx;i < startIdx + (nbOperations/3);i++)
        {            
            allOperations += "<label id=\"operation"+i+"\">"+operations[i].firstNum + " " + operand + " " + operations[i].secondNum + " = </label>";
            allOperations += "  ";
            allOperations += "<select class=\"inputNum\" id=\"result"+i+"\">"+createResult()+"</select>" ;  
            allOperations += "<br/>"
        }
        $("#questions"+columnId).html(allOperations);
    }

	var createOperation = function()
    {
        createOperationColumn(1,0);
        createOperationColumn(2,8);
        createOperationColumn(3,16);
    }

	initClock();

});

