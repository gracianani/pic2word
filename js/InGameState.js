
function OnEnterInGameState() {

    $('.current-page').removeClass('current-page').addClass('animated bounceOutLeft');
   	$('#page-play').addClass('current-page').addClass('animated bounceInRight').show();
	//register key functions
    $('.btnNextQuestion').click(function (e) {
        var answerText = $(this).parent().find("#answer-" + controller.currentQuestionId).val();
        if (controller.isAnswerCorrect(answerText)) {
            changeQuestion(controller.currentQuestionId, controller.nextQuestionId);
            controller.processToNextQuestion();
        }
    });
	controller.startGame();
}

function OnExitInGameState()
{
	document.onkeydown = null;
	document.onkeyup = null;
	controller.stopGame();
}


var InGameState = new State( OnEnterInGameState, OnExitInGameState );

