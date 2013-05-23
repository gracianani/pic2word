function Question(questionData, imageUrl) {
    this.questionData = questionData;
    this.questionData["imageUrl"] = imageUrl;
    this.questionData["answerArray"] = function () {
        return this["answer"].split("");
    };
    this.questionData["keyboardArray"] = function () {
        return this["keyboard"].split("");
    };
    this.questionUI = "";
    this.update = function () {
        console.log(this.questionData);
        var compiledTemplate = Mustache.compile(document.getElementById("questionTmpl").text);
        this.questionUI = compiledTemplate(this.questionData);
    }
}
