var GameCookieKey = "pic2wordkey";


function Controller() {
    this.currentQuestionId;
    this.currentQuestionIndex;
    this.nextQuestionId;
    this.questionRepo = [];
    this.currentQuestionBatch = 1;
    this.forceFromCurrent = false;
    this.loadCharactors();
}

Controller.currentQuestionId;
Controller.currentQuestionIndex;
Controller.questionRepo;
Controller.currentQuestionBatch;
Controller.forceFromCurrent;
Controller.charactors;

Controller.prototype.startGame = function () {
    if (readCookie(GameCookieKey) != null) {
        this.loadFromCookie();
    }
}

Controller.prototype.stopGame = function()
{
}

Controller.prototype.loadCharactors = function () {
    var that = this;
    $.getJSON("data/charactors.json", function (data) {
        that.charactors = data["charactors"];
    });
}

Controller.prototype.loadFromCookie = function () {
    var controllerData = readCookie(GameCookieKey);
    var values = controllerData.split(',');
    this.currentQuestionId = parseInt(values[0]);
    this.currentQuestionIndex = parseInt(values[1]);
    this.currentQuestionBatch = parseInt(values[2]);
    this.nextQuestionId =  parseInt(values[3]);
    this.forceFromCurrent = true;
}

Controller.prototype.saveInCookie = function () {
    createCookie( GameCookieKey, this.currentQuestionId + "," + this.currentQuestionIndex + "," + this.currentQuestionBatch + "," + this.nextQuestionId, 1000);
}

Controller.prototype.loadQuestions = function () {
    var that = this;
    $.getJSON(sprintf("data/level%d.json", this.currentQuestionBatch), function (data) {
        that.questionRepo = data["questions"];
        if (that.forceFromCurrent == false) {
            that.currentQuestionIndex = 0;
            that.currentQuestionId = data["questions"][that.currentQuestionIndex]["ID"];
            that.nextQuestionId = that.currentQuestionId + 1;
        }
        that.saveInCookie();
        preloadImages(that.questionRepo);
    });
}

Controller.prototype.isAnswerCorrect = function () {
    var answerText = '';
    $(sprintf("#question-%d .answer-key", this.currentQuestionId)).filter(function () {
        return $(this).attr("data-key") != "";
    }).each(function (index, elem) {
        answerText += elem.getAttribute("data-key");
    });
    return this.isAnswerCorrectByText(answerText);
}

Controller.prototype.isAnswerCorrectByText = function (answerText) {
    if (this.questionRepo[this.currentQuestionIndex]["answer"] == answerText) {
        return true;
    }
    return false;
}

Controller.prototype.processToNextQuestion = function () {

    if (this.questionRepo.length > this.currentQuestionIndex + 1) {
        this.currentQuestionIndex++;
        this.currentQuestionId++;
        this.nextQuestionId++;
        this.saveInCookie();
    }
    else {
        this.forceFromCurrent = false;
        this.currentQuestionBatch++;
        SM.SetStateByName("preload");
    }

}

Controller.prototype.removeLetters = function () {
}

Controller.prototype.update = function () {
    
}