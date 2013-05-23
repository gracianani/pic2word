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
   

}

PtwUI.prototype.showMenuUI= function(){
	
}
PtwUI.prototype.showInGameUI= function(){
	
}
PtwUI.prototype.onFailed= function() {
	
}
PtwUI.prototype.showSuccessUI= function(){
	
}
PtwUI.prototype.showNextQuestion= function(){
	
}
PtwUI.prototype.showLoadingUI= function(){
	
}
PtwUI.prototype.showHelpUI= function(){
	
}
PtwUI.prototype.isAnserCorrect= function(){
	
}
PtwUI.prototype.addQuestion = function () {
	
}

var ptwUI = new PtwUI();