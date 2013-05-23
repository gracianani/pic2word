var preload;
function OnEnterPreloadState() {

    $("#page-preload").siblings().css("display", "none");
    $("#page-preload").css("display", "block");
    $(".ui-progress").css("width", "0%").css("display", "block").find(".ui-label").css("display", "block");

	controller.loadQuestions();
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

    $(".ui-progress").css("width", event.loaded * 100 + "%").find(".value").html(event.loaded * 100 + "%");
}

function handleFileLoad(event) {
    var question = new Question(controller.questionRepo[event.item.id], event.result.src);
    question.update();
    $("#inGame").append(question.questionUI);
}

function handleComplete() 
{
    setTimeout(function () {
        $('.question').css('display', 'none');
        showCurrentQuestion();
        SM.SetStateByName("inGame");
    }, 1000);
}

var PreloadState = new State( OnEnterPreloadState, OnExitPreloadState );
