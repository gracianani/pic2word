
function OnEnterInGameState() {
    ptwUI.showInGameUI();
    ptwUI.showCurrentQuestion();
	//register key functions
    $('.question-key').click(function (e) {
        var emptyKeys = $(this).parents(".question").find(".answer-key[data-key='']");
        var emptyKeysCount = emptyKeys.length;
        if (emptyKeysCount > 0) {
            ptwUI.appendCharactor($(emptyKeys[0]), $(this));
            emptyKeysCount = emptyKeysCount - 1;
            if (emptyKeysCount == 0) {
                if (controller.isAnswerCorrect()) {
                    ptwUI.showNextQuestion(controller.currentQuestionId, controller.nextQuestionId);
                    controller.processToNextQuestion();
                }
                else {
                    ptwUI.onFailed();
                }
            }
        }
    });

    $(".answer-key").click(function (e) {
        var data_key = $(this).attr("data-key");
        if (data_key != null && data_key != '') {
            ptwUI.removeCharactor($(this));
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

