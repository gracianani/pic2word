function Question(questionData, imageUrl) {
    this.questionData = questionData;
    this.questionData["imageUrl"] = imageUrl;
    this.questionData["answerArray"] = function () {
        return this["answer"].split("");
    };
    this.questionData["keyboardArray"] = function () {
        var defaultchars = $.merge(this["keyboard"].split(""), this["answer"].split(""));
        var otherchars = getNElementFromArray(controller.charactors, 24 - defaultchars.length);
        return shuffleArray($.merge(defaultchars, otherchars));
    };
    this.questionUI = "";
    this.update = function () {
        console.log(this.questionData);
        var compiledTemplate = Mustache.compile(document.getElementById("questionTmpl").text);
        this.questionUI = compiledTemplate(this.questionData);
    }
}
