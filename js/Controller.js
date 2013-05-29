var GameCookieKey = "pic2wordkey";


function Controller() {
    this.currentQuestionId;
    this.currentQuestionIndex;
    this.nextQuestionId;
    this.questions = [];
    this.questionRepo = [];
    this.questionRepoSize = 10;
    this.currentQuestionBatch = 1;
    this.forceFromCurrent = false;
    this.minPreloadTime = 2000;
    this.isPreloadFinished = false;
    this.isPreloadTimeUp = false;
    this.preloadTimer;
    this.dataBaseUrl = "data/";
    this.loadCharactors();
    
}

Controller.currentQuestionId;
Controller.currentQuestionIndex;
Controller.questionRepo;
Controller.currentQuestionBatch;
Controller.forceFromCurrent;
Controller.charactors;
Controller.needPreload;

Controller.prototype.startGame = function () {
    if (readCookie(GameCookieKey) != null) {
        this.loadFromCookie();
    }
    var date = getURLParameter('date');
    if ( date != null && date != "" ) {
	    this.dataBaseUrl = "data/" + date + "/";
	    this.forceFromCurrent = false;
	    this.currentQuestionBatch = 1;
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
Controller.prototype.handlePreloadRequest = function() {
	if ( this.questions.length < 1 ) {
	    this.loadAllQuestions();
    } else {
	    this.loadCurrentQuestions();
    }
}

Controller.prototype.loadAllQuestions = function () {
    var that = this;
    $.getJSON( this.dataBaseUrl + "questions.json", function(data) {
    	that.questions = data["questions"];
    	if ( data["questionRepoSize"] ) {
	    	that.questionRepoSize = data["questionRepoSize"];
    	}
    	that.loadCurrentQuestions();
    });
}
Controller.prototype.loadCurrentQuestions = function() {
	var start,end;
	start = (this.currentQuestionBatch - 1) * this.questionRepoSize;
	end = Math.min( this.questions.length, start + this.questionRepoSize);
	if ( start > end ) {
		//no more questions
		this.saveInCookie();
		SM.SetStateByName('finish');
		return;
	}
	this.questionRepo = this.questions.slice(start, end);
	if (this.forceFromCurrent == false) {
            this.currentQuestionIndex = 0;
            this.currentQuestionId = this.questionRepo[this.currentQuestionIndex]["ID"];
            this.nextQuestionId = this.currentQuestionId + 1;
    }
    this.saveInCookie();
    
    
    preloadImages(this.questionRepo);
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
        controller.needPreload = false;
    }
    else {
        this.forceFromCurrent = false;
        this.currentQuestionBatch++;
        //SM.SetStateByName("preload");
        controller.needPreload = true;
    }

}


Controller.prototype.removeLetters = function () {
}

Controller.prototype.update = function () {
    
}