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
var initialsForm = document.querySelector(".initials-form")
var initialsInput = document.getElementById(".initials")


// Setting global variables
var currentQuestion = 0;
var score = 0;
var timer;
var timerCount;

// Start Quiz
function startQuiz() {
    startButton.disabled = true;
    startTimer();
    displayQuestion();
}

// Start Timer
function startTimer() {
    timerCount = 60;
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0 || currentQuestion >= questionList.length) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Display questions
function displayQuestion() {
    var currentQ = questions[currentQuestion];
    questionList.textContent = currentQ.question;

    optionList.innerHTML = "";
    for (var i = 0; i < currentQ.options.length; i++) {
        var option = document.createElement("li");
        option.textContent = currentQ.options[i];
        option.setAttribute("data-index", i);
        option.classList.add("option");
        optionList.appendChild(option);
    }
}

// Select Answer
function answerChosen(event) {
    var optionChosen = event.target;
    var chosenOptionIndex = parseInt(optionChosen.getAttribute("data-index"));
    var currentQ = questions[currentQuestion];

    if (chosenOptionIndex === currentQ.answer) {
        score += 1;
    } else {
        timerCount -= 5;
        if (timerCount < 0) {
            timerCount = 0;
        }
        timerElement.textContent = timerCount;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion()
    } else {
        endQuiz()
    }
}

// End Quiz
function endQuiz() {
    finalScore.textContent = score;
    questionList.style.display = "none";
    optionList.style.display = "none";
    timerElement.style.display = "none";
    initialsForm.style.display = "block";
}

// Initials Form

// Event Listeners
startButton.addEventListener("click", startQuiz);

optionList.addEventListener("click", answerChosen);

initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var initials = initialsInput.value.trim();
    // Save initials and score

    // Reset quiz
    initialsInput.value = "";
    score = 0;
    currentQuestion = 0;    
})