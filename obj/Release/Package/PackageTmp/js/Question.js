function Question(questionData, imageUrl) {
    this.questionData = questionData;
    this.questionData["imageUrl"] = imageUrl;
    this.questionUI = "";
    this.update = function () {
        var compiledTemplate = Mustache.compile(document.getElementById("questionTmpl").text);
        this.questionUI = compiledTemplate(this.questionData);
    }
}

function changeQuestion(previousQuestionId, nextQuestionId)
{
    $('#question-' + previousQuestionId).css('display', 'none');
    $('#question-' + nextQuestionId).css('display', 'block');
}

function showCurrentQuestion() {
    $('#question-' + controller.currentQuestionId).css('display', 'block');
}