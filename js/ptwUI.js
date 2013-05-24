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

PtwUI.prototype.init = function() {
	this.stage = $('body');
	this.menuUI = this.stage.find('#page-start');
	this.inGameUI = this.stage.find('#page-play');
	this.questionUIs = this.inGameUI.find('.question');
	this.currentLevel = 0;
	this.answer = '';
	this.animationList = [];
}

PtwUI.prototype.showMenuUI= function(){
    $('#page-start .loading').removeClass('loading');
    this.addAnimation('#start-btnPlay', 'bounceInUp', 500, null);
    this.addAnimation('#start-level', 'bounceIn', 500, null);
    this.playAnimationsFrom(0);
}
PtwUI.prototype.showInGameUI= function(){
    $('.current-page').removeClass('current-page').addClass('animated bounceOutLeft');
    $('#page-play').addClass('current-page').addClass('animated bounceInRight').show();
}
PtwUI.prototype.onFailed = function () {
    alert("wrong");
}
PtwUI.prototype.showSuccessUI= function(){
	$('#play-success').show();
	this.addAnimation('#play-success-title', 'bounceIn', 500, null);
    this.addAnimation('#play-success-level', 'bounceIn', 500, null);
    this.addAnimation('#play-success-answer', 'bounceIn', 500, null);
    this.addAnimation('#play-success-action', 'bounceIn', 500, null);
    this.playAnimationsFrom(0);
}
PtwUI.prototype.showNextQuestion = function (previousQuestionId, nextQuestionId) {
	$('#play-success').hide();
    $('#question-' + previousQuestionId).css('display', 'none');
    $('#question-' + nextQuestionId).css('display', 'block');
}
PtwUI.prototype.showCurrentQuestion = function () {
    $('.question').css('display', 'none');
    $('#question-' + controller.currentQuestionId).css('display', 'block').find('.question-answer').each(function(){
   		var width = 0;
   		$(this).find('li').each(function(){
   			width += parseInt($(this).outerWidth());
   		});
   		$(this).css('width',(width+30) + 'px');
   		$(this).css('margin-left', '-' + (width/2) + 'px');

   }); 
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
}
PtwUI.prototype.removeCharactor = function (remove_spot) {
    remove_spot.attr("data-key", '').html('');
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