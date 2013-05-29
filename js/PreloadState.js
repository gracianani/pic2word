var preload;
function OnEnterPreloadState() {
    ptwUI.showLoadingUI();
    if ( controller.questions.length < 1 ) {
	    controller.loadAllQuestions();
    } else {
	    controller.loadCurrentQuestions();
    }
	
	_hmt.push(['_trackPageview', '/preload']);
}

function OnExitPreloadState()
{
}

function preloadImages(questions) {
    var manifest = [];
    for (var i = 0; i < questions.length; i = i + 1) {
        manifest.push({ src: sprintf("__%05d.png", questions[i]["ID"]), id: "" + i });
    }
    if (preload == null || typeof (preload) == 'undefined') {
        preload = new createjs.LoadQueue(true, "./img/");
        preload.addEventListener("progress", handleProgress);
        preload.addEventListener("complete", handleComplete);
        preload.addEventListener("fileload", handleFileLoad);
    }
    preload.loadManifest(manifest);
}

function handleProgress(event) {
    ptwUI.showLoadingUIProgress(event);
}

function handleFileLoad(event) {
    var question = new Question(controller.questionRepo[event.item.id], event.result.src);
    ptwUI.addQuestion(question);
}

function handleComplete() 
{
    setTimeout(function () {
        SM.SetStateByName("inGame");
    }, 1000);
}

var PreloadState = new State( OnEnterPreloadState, OnExitPreloadState );
