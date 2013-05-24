document.body.onselectstart = document.body.ondrag = function(){
    return false;
}

function PtwUI () {
}

PtwUI.stage;
PtwUI.menuUI;
PtwUI.inGameUI;
PtwUI.loadingUI;
PtwUI.helpUI;
PtwUI.questionUIs;
PtwUI.currentQuestionUI;
PtwUI.currentLevel;
PtwUI.answer;
PtwUI.animationList;
PtwUI.timeout;
PtwUI.controller;
PtwUI.touchEvent;

PtwUI.prototype.init = function() {
	this.stage = $('body');
	this.menuUI = this.stage.find('#page-start');
	this.inGameUI = this.stage.find('#page-play');
	this.questionUIs = this.inGameUI.find('.question');
	this.successUI = this.inGameUI.find('#play-success');
	this.currentLevel = 0;
	this.answer = '';
	this.animationList = [];
	
	var that = this;
	
	
	if ( is_touch_device() ) {
		this.touchEvent = 'touchstart';
	} else {
		this.touchEvent = 'click';
	}
	
	this.successUI.find('#play-success-next').on(this.touchEvent, function(){
            that.showCurrentQuestion();
	});
}

PtwUI.prototype.showMenuUI= function(){
   	this.menuUI.find('.loading').removeClass('loading');
    this.addAnimation('#start-btnPlay', 'bounceInUp', 500, null);
    this.addAnimation('#start-level', 'bounceIn', 500, null);
    this.playAnimationsFrom(0);
}
PtwUI.prototype.showInGameUI= function(){
    $('.current-page').removeClass('current-page').addClass('animated bounceOutLeft');
    this.inGameUI.addClass('current-page').addClass('animated bounceInRight').show();
}
PtwUI.prototype.onFailed = function () {
    alert("wrong");
}

PtwUI.prototype.setQuestionLevelText = function() {
	this.inGameUI.find('#play-level').html(this.controller.currentQuestionId);
}
PtwUI.prototype.updateAnswerText = function() {
	var answerText = '';
    this.currentQuestionUI.find('.answer-key').filter(function () {
        return $(this).attr("data-key") != "";
    }).each(function (index, elem) {
        answerText += elem.getAttribute("data-key");
    });
    this.answer = answerText;
}
PtwUI.prototype.showSuccessUI= function(){
	
	this.successUI.find('#play-success-level').html(this.currentLevel);
	this.successUI.find('#play-success-answer').html(this.answer);
	
	this.successUI.show();
    
	this.addAnimation('#play-success-title', 'bounceIn', 500, null);
    this.addAnimation('#play-success-level', 'bounceIn', 500, null);
    this.addAnimation('#play-success-answer', 'bounceIn', 500, null);
    this.addAnimation('#play-success-action', 'bounceIn', 500, null);
    this.playAnimationsFrom(0);
}
PtwUI.prototype.hideSuccessUI = function() {
	this.successUI.hide();
	this.successUI.find('#play-success-title,#play-success-level,#play-success-answer,#play-success-action').css('visibility','hidden').attr('class','');
}
PtwUI.prototype.showCurrentQuestion = function () {
	var currentQuestion;
	this.answer = '';
	this.currentLevel = this.controller.currentQuestionId;
	
	
	this.hideSuccessUI();
    $('.question').css('display', 'none');
    this.setQuestionLevelText();
    
    if (this.currentQuestionUI) {
	    this.currentQuestionUI = $('#question-' + this.currentLevel).addClass('animated bounceInRight').show();
    } else {
	    this.currentQuestionUI = $('#question-' + this.currentLevel).show();
    }
    this.setAnswerBoxPosition(this.currentQuestionUI);   
}
PtwUI.prototype.setAnswerBoxPosition = function(currentQuestion) {
	
   		var width = 0, answerBox = currentQuestion.find('.question-answer');
   		answerBox.find('li').each(function(){
   			width += parseInt($(this).outerWidth());
   		});
   		answerBox.css('width',(width+30) + 'px')
   		.css('margin-left', '-' + (width/2) + 'px');
   
}
PtwUI.prototype.showLoadingUI= function(){
    $('.current-page').removeClass('current-page').addClass('animated bounceOutLeft');
    $('#page-preload').removeClass("animated bounceInRight bounceOutLeft").addClass('current-page').addClass('animated bounceInRight').show();
    $(".ui-progress").css("width", "0%").css("display", "block").find(".ui-label").css("display", "block");

}
PtwUI.prototype.showLoadingUIProgress = function (event) {
    $(".ui-progress").css("width", event.loaded * 100 + "%").find(".value").html(parseInt(event.loaded * 100) + "%");
}

PtwUI.prototype.showHelpUI= function(){
	
}
PtwUI.prototype.appendCharactor= function(answer_spot, question_spot){
    answer_spot.attr("data-key", question_spot.attr("data-key")).html(question_spot.attr("data-key"));
    question_spot.css('visibility','hidden');
    this.updateAnswerText();
}
PtwUI.prototype.removeCharactor = function (remove_spot) {
    remove_spot.attr("data-key", '').html('');
    this.updateAnswerText();
}
PtwUI.prototype.addQuestion = function (question) {
    question.update();
    $("#questions").append(question.questionUI);
}
PtwUI.prototype.addAnimation = function(id, animationType, duration, callback) {
	this.animationList.push({'id':id, 'animationType':animationType, 'duration':duration, 'callback':callback });
}

PtwUI.prototype.playAnimationsFrom = function(startIndex) {
	var animation, target, that, length = this.animationList.length;
	if ( length > 0 ) {
	
		animation = this.animationList[startIndex];
		target = $(animation.id);
		
		if (target.css('visibility') == 'hidden') {
			target.css('visibility', 'visible');
		}
		
		target.addClass('animated ' + animation.animationType);
		clearTimeout(this.timeout);
		startIndex++;
		
		that = this;
		if ( startIndex < length ) {
			that.timeout = setTimeout(function(){
				that.playAnimationsFrom(startIndex);
				if (animation.callback) {
					animation.callback.apply(this);
				}
			}, animation.duration);
			
		} else {
			this.animationList = [];
		}
	}
	
}
var ptwUI = new PtwUI();
