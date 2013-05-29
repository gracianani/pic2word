﻿function Question(questionData, imageUrl) {
    this.questionData = questionData;
    this.questionData["imageUrl"] = imageUrl;
    this.questionData["answerArray"] = function () {
        return this["answer"].split("");
    };
    this.questionData["keyboardArray"] = function () {
        var defaultchars = $.merge(this["keyboard"].split(""), this["answer"].split(""));
        var otherchars = getNElementFromArray(controller.charactors, 24 - defaultchars.length);
        var returnArray = [];
        shuffleArray($.merge(defaultchars, otherchars)).forEach(function(value,index){
        	returnArray.push({'index':index,'value':value});
        });
        return returnArray;
    };
    this.questionUI = "";
    this.update = function () {
        var compiledTemplate = Mustache.compile(document.getElementById("questionTmpl").text);
        this.questionUI = compiledTemplate(this.questionData);
    }
}
