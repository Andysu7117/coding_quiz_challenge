// Listing Questions
var questions = [
    {
        question: "Question 1",
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: 0,
    },
    {
        question: "Question 2",
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: 0,
    },
    {
        question: "Question 3",
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: 0,
    }
];

// Elements
var startButton = document.querySelector(".start-btn");
var questionList = document.querySelector(".questions")
var optionList = document.querySelector(".options")
var timerElement = document.querySelector(".timer-count")
var finalScore = document.querySelector(".final-score")
var intialsForm = document.querySelector(".initials-form")
var initialsInput = document.getElementById(".initials")


// Setting global variables
var currentQuestion = 0;
var score = 0;
var timer;
var timerCount;

// Start Quiz
function startQuiz() {
    startButton.disabled= true;
    startTimer();
    displayQuestion();
}

// Start Timer
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount <= 0 || currentQuestion >= questionList.length) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Display questions
function displayQuestion() {
    var currentQ = questions[currentQuestion];
    questionList.textContent = currentQ.question;
}