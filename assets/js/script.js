// Listing Questions
var questions = [
    {
        question: "Which of the following is not a position in football/soccer?",
        options: ["Goal Defence", "Left Midfielder", "Right Fullback", "Centre Back"],
        answer: 0,
    },
    {
        question: "Which is not a basketball position?",
        options: ["Point Guard", "Small Foward", "Shooting Guard", "Point Foward"],
        answer: 3,
    },
    {
        question: "What number is Blackjack",
        options: ["20", "21", "22", "25"],
        answer: 1,
    },
    {
        question: "How many milligrams in 1 kilogram",
        options: ["10", "100", "1000", "10000"],
        answer: 2,
    },
    {
        question: "How many moon's does Earth have",
        options: ["0", "1", "2", "3"],
        answer: 1,
    }
];

// Elements
var startButton = document.querySelector(".start-btn");
var questionList = document.querySelector(".questions")
var optionList = document.querySelector(".options")
var timerElement = document.querySelector(".timer-count")
var finalScore = document.querySelector(".final-score")
var initialsForm = document.querySelector(".initials-form")
var initialsInput = document.getElementById("initials")
var quizContainer = document.querySelector(".start-quiz")
var scoreContainer =document.querySelector(".score-container")
var leaderBoard = document.getElementById("leaderboard")
var card = document.querySelector(".card")
var isWrong = document.querySelector(".isWrong")

// Setting global variables
var currentQuestion = 0;
var score = 0;
var timer;
var timerCount;

var leaderBoardList = [];
var leaderBoardScore = [];

// Start Quiz
function startQuiz() {
    quizContainer.style.display = "none"
    card.style.display = "none"
    optionList.classList.remove("hide")
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
        isWrong.classList.add("hide")
    } else {
        timerCount -= 5;
        if (timerCount < 0) {
            timerCount = 0;
        }
        timerElement.textContent = timerCount;
        isWrong.classList.remove("hide")
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
    scoreContainer.classList.remove("hide")
    finalScore.textContent = score;
    questionList.style.display = "none";
    optionList.style.display = "none";
    timerElement.style.display = "none";
    initialsForm.style.display = "block";
}

// Reset Quiz
function resetQuiz() {
    initialsInput.value = "";
    score = 0;
    currentQuestion = 0;  
}

// Initials Form
function storeLeaderBoard() {
    localStorage.setItem("leaderBoardList", JSON.stringify(leaderBoardList));
    localStorage.setItem("leaderBoardScore", JSON.stringify(leaderBoardScore));
}

function renderLeaderBoard() {
    leaderBoard.innerHTML = "";

    for (var i = 0; i < leaderBoardList.length; i++) {
        var leader = leaderBoardList[i];
        var leaderScore = leaderBoardScore[i]

        var li = document.createElement("li");
        li.textContent = "Name: " + leader + " Score: " + leaderScore;
        li.setAttribute("data-index", i);

        leaderBoard.appendChild(li);
    }
}

function storeScore(event) {
    var initials = initialsInput.value.trim();

    leaderBoardList.push(initials);
    leaderBoardScore.push(score)

    initialsInput.value = "";
    // Save initials and score

    // Save to leaderboard
    storeLeaderBoard()
    renderLeaderBoard()

    // Reset quiz
    resetQuiz()
}

// Leaderboard


// Event Listeners
startButton.addEventListener("click", startQuiz);

optionList.addEventListener("click", answerChosen);

initialsForm.addEventListener("submit", function(event) {
    var initials = initialsInput.value.trim();

    if (initials === "") {
        return;
    }


    leaderBoardList.push(initials);
    leaderBoardScore.push(score);

    initialsInput.value = "";

    // Save to leaderboard
    storeLeaderBoard();
    renderLeaderBoard();

    // Reset quiz
    resetQuiz();
})

function init() {
    var storedLeaderBoard = JSON.parse(localStorage.getItem("leaderBoardList"));
    
    if (storedLeaderBoard !== null) {
        leaderBoardList = storedLeaderBoard;
    }

    var storedLeaderBoardScore = JSON.parse(localStorage.getItem("leaderBoardScore"));

    if (storedLeaderBoardScore !== null) {
        leaderBoardScore = storedLeaderBoardScore;
    }

    renderLeaderBoard()
}

init()

