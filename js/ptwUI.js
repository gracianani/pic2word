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

PtwUI.prototype.init = function() {
	this.stage = $('body');
	this.menuUI = this.stage.find('#page-start');
	this.inGameUI = this.stage.find('#page-play');
	
	
	this.questionUIs = this.inGameUI.find('.question');
	
	this.currentLevel = 0;
	this.answer = '';
	
	$('.question-answer').each(function(){
   		var width = 0;
   		$(this).find('li').each(function(){
   			width += parseInt($(this).outerWidth());
   		});
   		$(this).css('width',(width+30) + 'px');
   		$(this).css('margin-left', '-' + (width/2) + 'px');

   }); 
   
   $('#start-btnPlay').click(function(){
   	$('#page-start').removeClass('current-page').addClass('animated bounceOutLeft').hide();
   	$('#page-play').addClass('current-page').addClass('animated bounceInRight').show();
   });
}

PtwUI.prototype.showMenuUI= function(){
    $("#page-start").siblings().css("display", "none");
    $("#page-start").css("display", "block");
}
PtwUI.prototype.showInGameUI= function(){
    $("#page-play").siblings().css("display", "none");
    $("#page-play").css("display", "block");
}
PtwUI.prototype.onFailed= function() {
	
}
PtwUI.prototype.showSuccessUI= function(){
	
}
PtwUI.prototype.showNextQuestion = function (previousQuestionId, nextQuestionId) {
    $('#question-' + previousQuestionId).css('display', 'none');
    $('#question-' + nextQuestionId).css('display', 'block');
}
PtwUI.prototype.showCurrentQuestion = function () {
    $('.question').css('display', 'none');
    $('#question-' + controller.currentQuestionId).css('display', 'block');
}
PtwUI.prototype.showLoadingUI= function(){
    $("#page-preload").siblings().css("display", "none");
    $("#page-preload").css("display", "block");
    $(".ui-progress").css("width", "0%").css("display", "block").find(".ui-label").css("display", "block");

}
PtwUI.prototype.showLoadingUIProgress = function (event) {
    $(".ui-progress").css("width", event.loaded * 100 + "%").find(".value").html(event.loaded * 100 + "%");
}

PtwUI.prototype.showHelpUI= function(){
	
}
PtwUI.prototype.isAnserCorrect= function(){
	
}
PtwUI.prototype.addQuestion = function (question) {
    question.update();
    $("#questions").append(question.questionUI);
}
var ptwUI = new PtwUI();