function Question(questionData, imageUrl) {
    this.template = " <div class='question' id='question-{{ID}}'> 题目 {{ID}} <br/> 类别{{category}} <img src={{imageUrl}} /> <br> <input id='answer-{{ID}}' type='text'/> <input class='btnNextQuestion' type='button' value='下一题'></input> <br/> </div>";
    this.questionData = questionData;
    this.questionData["imageUrl"] = imageUrl;
    this.questionUI = "";
    this.update = function () {
        var compiledTemplate = Mustache.compile(this.template);
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