var startOfQuizEl = document.querySelector("#start-of-quiz");
var endOfQuiz = document.querySelector("#end-of-quiz");
var questionContainerEl = document.querySelector("#question-container");

var startButtonEl = document.getElementById("start-button");
var timer = document.getElementById("timer");

// time variables
var timeLeft = 100;
var timerInterval;

// boolean variables
var didQuizStart = false;
var didQuizEnd = false;

// question and answer element variables
var questionEl = document.querySelector("#questions");
var answersEl = document.querySelector("#multiple-choice-answers");

// user score, highscore, and intials
var userScore = 0;
var userHighScoreList = JSON.parse(localStorage.getItem("highscores")) || [];
var userInitials = "";

var questionIndex = 0;
var questions = [
    {
    	title: "Commonly used data types DO NOT include",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed within _____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store _____.",
        answers: ["nummbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        title: "String values must be enclosed within _____ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    }

];

startButtonEl.addEventListener("click", function(){
    startCountDownTimer();
    startQuiz();
    showQuestions();
});

function startCountDownTimer() {
    timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
        timeLeft-=1;
        timer.textContent = "Time left: " + timeLeft;
    }, 1000);
}

function startQuiz() {
    didQuizStart = true;
    startOfQuizEl.setAttribute("class", "hidden");
    questionContainerEl.setAttribute("class", "visible");
}

function showQuestions() {
    questionEl.textContent = questions[questionIndex].title;
    answersEl.innerHTML = '';
    for (var i = 0; i < questions[questionIndex].answers.length; i++) {
        var btn = document.createElement("button");
        btn.textContent = questions[questionIndex].answers[i];
        btn.onclick = checkTheAnswer();
        answersEl.append(btn);
    }
}

function checkTheAnswer() {
    if (this.textContent === questions[questionIndex].correctAnswer) {
        questionIndex++
    } else {
        timeLeft -= 10;
    }

    
    if (questionIndex > 4) {
        clearInterval(timerInterval);
        getUserInitials();
    } else {
        startQuiz();
    }
}

document.querySelector("#initials-input").addEventListener("click", function() {
    userInitials = document.querySelector("#initials").nodeValue;
    endQuiz();
});

function getUserInitials() {
    document.getElementById("finalscore").textContent = "Your score is " + userScore;
    document.querySelecctor("#end-of-quiz").classList.remove("hidden");
    questionContainerEl.setAttribute("class", "hidden");
}

function endQuiz() {
    didQuizEnd = true;
    endOfQuiz.setAttribute("class", "visible");
    userHighScoreList.push({"initials": userInitials, "score": userScore});
    localStorage.setItem("highscores", JSON.stringify(userHighScoreList));

    window.location.assign("./highscores.html");
}


// -----------------------------------------------------------------------------
// var startOfQuizMenuEl = document.querySelector('#start-of-quiz-menu');
// var questionContainerEl = document.querySelector('#question-container');
// var startButtonEl = document.getElementById('start-button');
// var questionEl = document.querySelector('#questions');
// // var answersEl = document.querySelector('#multiple-choice-answers');
// var resultsContainerEl = document.getElementById('#results-container');

// function showQuestions() {
//     var output = [];
//     questions.forEach(currentQuestion, questionNumber) = () => {
//         var answers = [];
//         for (answer in CurrentQuestion.answers) 
//         answers.push(
//             '<label>'
//                 + '<input type="radio" name="question'+i+'" value="'+letter+'">'
//                 + letter + ': '
//                 + questions[i].answers[letter]
//                 +
//             '</label>'
//         );
//         output.push(
//             `<div class="question">
//                 ${currentQuestion.questions}
//             </div>
//             <div class="question">
//                 ${answers.join('')}
//             </div>`
//         )
//     }
// };

// function showResults() {
//     var answerContainers = questionContainerEl.querySelectorAll('.answers');
//     let scoreCorrect = 0;
//     questions.forEach(currentQuestion, questionNumber) = () => {
//         var answerContainer = answerContainers[questionNumber];
//         var questionSelected = `input[name=question${questionNumber}]:checked`;
//         var userChosenAnswer = (answerContainer.querySelector(questionSelected) || {}).value;

//         if (userChosenAnswer = currentQuestion.correctAnswer){
//             scoreCorrect++;
//             answerContainers[questionNumber].style.color = 'green';
//         } else{
//             answerContainers[questionNumber].style.color = 'red';
//         }
//     }
//     resultsContainerEl.innerHTML = `${scoreCorrect} out of ${questions.length}`;
// };

// questionContainerEl.innerHTML = output.join('');
// // showQuestions();
// // // startButtonEl.addEventListener('click',)

// document.addEventListener('click', function(){
//     var timeLeft = 75;
//     var timerInterval = setInterval(function(){
//         if (timeLeft <= 0){
//             clearInterval(timerInterval);
//             document.getElementById('time').innerHTML = 'Very Nice!';
//         } else {
//             document.getElementById('time').innerHTML = timeLeft;
//         }
//         timeLeft--;
//     }, 1000);

//     showQuestions();
// });
// -----------------------------------------------------------------------------------



// var quizContainer = document.getElementById('#start-of-quiz-menu');
// var resultsContainer = document.getElementById('#end-of-quiz-menu');
// var submitButton = document.getElementById('#submit');

// var myQuestions = [
// 	{
// 		question: 'Commonly used data types DO NOT include',
// 		answers: {
// 			a: 'strings',
// 			b: 'booleans',
// 			c: 'alerts',
//          d: 'numbers'
// 		},
// 		correctAnswer: 'c'
// 	},
// 	{
// 		question: 'The condition in an if/else statement is enclosed within _____.',
// 		answers: {
// 			a: 'quotes',
// 			b: 'curly brackets',
// 			c: 'parentheses',
//          d: 'square brackets'
// 		},
// 		correctAnswer: 'c'
// 	},
//  {
// 		question: 'Arrays in JavaScript can be used to store _____.',
// 		answers: {
// 			a: 'nummbers and strings',
// 			b: 'other arrays',
// 			c: 'booleans',
//          d: 'all of the above'
// 		},
// 		correctAnswer: 'd'
// 	},
//     {
// 		question: 'String values must be enclosed within _____ when being assigned to variables.',
// 		answers: {
// 			a: 'commas',
// 			b: 'curly brackets',
// 			c: 'quotes',
//          d: 'parentheses'
// 		},
// 		correctAnswer: 'c'
// 	},
//     {
// 		question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
// 		answers: {
// 			a: 'JavaScript',
// 			b: 'terminal/bash',
// 			c: 'for loops',
//          d: 'console.log'
// 		},
// 		correctAnswer: 'd'
// 	}
// ];

// function startTime(){
//     timerInterval = setInterval(function(){
//         if (timeleft <= 0) {
//             clearInterval(timerInterval);
//         }
//     })
// }

// function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

// 	function showQuestions(questions, quizContainer){
//         var answerOutput = [];
//         var answers;

//         for (var i=0; i<questions.length; i++){

//             answers = [];
//             for(letter in questions[i].answers){
//                 answers.push(   // this lets us to input a label tag followed by various HTML elemnts
//                     '<label>'
//                         + '<input type="radio" name="question'+i+'" value="'+letter+'">'
//                         + letter + ': '
//                         + questions[i].answers[letter]
//                         +
//                     '</label>'
//                 );
//             }

//             answerOutput.push(
//                 '<div class="question">' + questions[i].question + '</div>' +
// 			    '<div class="answers">' + answers.join('') + '</div>'
//             );
//         }

//         quizContainer.innerHTML = answerOutput.join('');
// 	}

// 	function showResults(questions, quizContainer, resultsContainer){
//         var answerContainers = quizContainer.querySelectorAll('.answers');

//         var userAnswer = '';
//         var numCorrect = 0;

//         for (var i=0; i<questions.length; i++){
//             userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked') || {}).value;
        
//             if (userAnswer===questions[i].correctAnswer){
//                 numCorrect++;
//                 answerContainers[i].style.color = 'green';
//             }
//             else{
//                 answerContainers[i].style.color = 'red';
//             }
//         }

//         resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
// 	}

// 	// show the questions
// 	showQuestions(questions, quizContainer);

// 	// when user clicks submit, show results
// 	submitButton.onclick = function(){
// 		showResults(questions, quizContainer, resultsContainer);
// 	}
// }

// generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);