//global variables
const $intro = $(".intro");
const $quizSection = $(".quizSection");
const $questionNumber = $(".questionNumber");
const $questionImage = $(".questionImage");
const $options = $(".options");
const $optionA = $("#optionA");
const $optionB = $("#optionB");
const $optionC = $("#optionC");
const $optionD = $("#optionD");
const $yourScore = $(".yourScore");
const $scoreSection = $(".scoreSection");
const $quizStart = $(".quizStart");
const $next = $(".next");
const $tryAgain = $(".tryAgain");

//a variable for us to see the score
let score = 0;
//a variable to access the question array
let currentQuestion = -1;

const quizApp = {};

quizApp.questions = [
    //question 1
    {
        questionImg: "./image/image1.png",
        a: "EA Sports",
        b: "Respawn Entertainment",
        c: "Crytek",
        d: "Capcom",
        answer: "Respawn Entertainment",
        answerImg: "./image/image1-answer.png"
    },

    //question 2
    {
        questionImg: "./image/image2.png",
        a: "Atari",
        b: "Gameloft",
        c: "Nintendo",
        d: "Bandai Namco",
        answer: "Bandai Namco",
        answerImg: "./image/image2-answer.png"
    },

    //question 3
    {
        questionImg: "./image/image3.png",
        a: "Valve",
        b: "Konami",
        c: "Nintendo",
        d: "Atari",
        answer: "Nintendo",
        answerImg: "./image/image3-answer.png"
    },

    //question 4
    {
        questionImg: "./image/image4.png",
        a: "Riot Games",
        b: "Bungie",
        c: "Ubisoft",
        d: "2K Games",
        answer: "Riot Games",
        answerImg: "./image/image4-answer.png"
    },

    //question5
    {
        questionImg: "./image/image5.png",
        a: "Valve",
        b: "BioWare",
        c: "Activision Blizzard",
        d: "Crytek",
        answer: "Activision Blizzard",
        answerImg: "./image/image5-answer.png"
    },

    //question 6
    {
        questionImg: "./image/image6.png",
        a: "CD Projekt Red",
        b: "Atari",
        c: "2K Games",
        d: "Bethesda Game Studios",
        answer: "CD Projekt Red",
        answerImg: "./image/image6-answer.png"
    },

    //question 7
    {
        questionImg: "./image/image7.png",
        a: "Epic Games",
        b: "SEGA Games",
        c: "Square Enix",
        d: "Ensemble Studios",
        answer: "Square Enix",
        answerImg: "./image/image7-answer.png"
    },

    //question 8
    {
        questionImg: "./image/image8.png",
        a: "Rockstar Games",
        b: "Capcom",
        c: "Bungie",
        d: "EA Games",
        answer: "Rockstar Games",
        answerImg: "./image/image8-answer.png"
    },

    //question 9
    {
        questionImg: "./image/image9.png",
        a: "BioWare",
        b: "Bungie",
        c: "DICE",
        d: "Valve",
        answer: "Valve",
        answerImg: "./image/image9-answer.png"
    },

    //question 10
    {
        questionImg: "./image/image10.png",
        a: "Sony",
        b: "SEGA Games",
        c: "Kojima Productions",
        d: "FromSoftware",
        answer: "Kojima Productions",
        answerImg: "./image/image10-answer.png"
    }
]

//starts the quiz
quizApp.startQuiz = function() {
    //hide intro
    $intro.hide();
    //show quiz
    $quizSection.show();
}

//shows a new question when clicked
quizApp.showQuestion = function () {
    //display current question number on the screen
    $questionNumber.text(currentQuestion + 2);

    //this variable allows us to access the questions array that's in the quiz object
    currentQuestion++;

    //have the question section update to the question image
    $questionImage.attr("src", quizApp.questions[currentQuestion].questionImg);

    //have the answer section update the answer options
    //and also set the data-option so we can access for answer checking
    $optionA.text(quizApp.questions[currentQuestion].a);
    $optionB.text(quizApp.questions[currentQuestion].b);
    $optionC.text(quizApp.questions[currentQuestion].c);
    $optionD.text(quizApp.questions[currentQuestion].d);
}

//answer checker
quizApp.checkAnswer = function (userAnswer) {
    //event codes for when the user clicks the option buttons

    //actual answer variable
    let actualAnswer = quizApp.questions[currentQuestion].answer;

    //disable all the options buttons
    $options.prop("disabled", true);

    //check if userAnswer === actualAnswer
    if (userAnswer === actualAnswer) {
        //reveal the unaltered logo image
        $questionImage.attr("src", quizApp.questions[currentQuestion].answerImg);
        //update the score
        score++;
    }
    //return the actual answer so we can use it to add right or wrong classes to the buttons
    return actualAnswer;
}

//moves onto the next question
quizApp.nextQuestion = function () {
    //check to see if there's anymore questions
    if ((currentQuestion + 1) == quizApp.questions.length) {
        //update the score to the html
        $yourScore.text(score);
        //if there's no more questions, display the score screen
        $quizSection.hide();
        $scoreSection.show();
    } else {
        //if there is more questions, reset the buttons and their styles, and prompt the next question
        $options.prop("disabled", false).removeClass("correct wrong");
        quizApp.showQuestion();
    }
}

//restarts the quiz
quizApp.resetQuiz = function () {
    //reset some values
    score = 0;
    currentQuestion = -1;

    //reset buttons
    $options.prop("disabled", false).removeClass("correct wrong");

    //hide score section
    $scoreSection.hide();

    //show quiz
    $quizSection.show();
}

//user tracking events
quizApp.init = function() {
    //if user read the intro and clicks quiz start button, start the quiz
    $quizStart.on("click", function () {
        quizApp.startQuiz();

        //loads the first question
        quizApp.showQuestion();
    })

    //if user clicks the answer options, check their answer
    $options.on("click", function () {
        //get the users choice and save the user's selected choice in a userAnswer variable for answer checking
        let $userAnswer = $(this).text();

        quizApp.checkAnswer($userAnswer);

        //add some fancy right or wrong classes after the text
        if ($userAnswer === quizApp.checkAnswer()) {
            //display to the user that they're right
            $(this).addClass("correct");
        } else {
            //put a x next to their choice
            $(this).addClass("wrong");
        }
    })

    //if the user clicks next, showcase the next slide
    $next.on("click", function () {
        quizApp.nextQuestion();
    })

    //if the user clicks try again, restart the quiz
    $tryAgain.on("click", function () {
        quizApp.resetQuiz();

        //shows first question
        quizApp.showQuestion();
    })
}

$(document).ready(function(){
    quizApp.init();
});
