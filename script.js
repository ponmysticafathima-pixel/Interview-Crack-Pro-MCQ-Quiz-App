let currentIndex = 0;
let score = 0;
let selectedCategory = "";
let timer;
let timeLeft = 30;

let questions = {
    python: [
        { q: "Which data type is immutable?", options: ["List","Dictionary","Tuple","Set"], answer: "Tuple" },
        { q: "Keyword to define function?", options: ["function","def","fun","define"], answer: "def" },
        { q: "What is OOP?", options: ["Object Oriented Programming","Only One Program","Open Office Project","None"], answer: "Object Oriented Programming" },
        { q: "Symbol for comment?", options: ["#","//","/* */","--"], answer: "#" },
        { q: "Output of 5 // 2?", options: ["2","2.5","3","2.0"], answer: "2" },
        { q: "Which stores key-value pairs?", options: ["List","Tuple","Dictionary","Set"], answer: "Dictionary" },
        { q: "Input function?", options: ["input()","scan()","get()","read()"], answer: "input()" },
        { q: "Loop keyword?", options: ["for","loop","repeat","iterate"], answer: "for" },
        { q: "Inheritance means?", options: ["Reuse class properties","Delete class","Loop","Error handling"], answer: "Reuse class properties" },
        { q: "Python framework?", options: ["React","Angular","Django","Vue"], answer: "Django" }
    ],
    hr: [
        { q: "Tell me about yourself includes?", options: ["Family","Education & skills","Politics","Salary"], answer: "Education & skills" },
        { q: "Why hire you?", options: ["Need job","Skills & dedication","Friend here","Timepass"], answer: "Skills & dedication" },
        { q: "Best strength?", options: ["Anger","Teamwork","Lazy","Overconfidence"], answer: "Teamwork" },
        { q: "Explain weakness?", options: ["No weakness","Blame others","Mention improvement","Refuse"], answer: "Mention improvement" },
        { q: "Teamwork means?", options: ["Work alone","Fight","Collaborate","Ignore"], answer: "Collaborate" },
        { q: "Professional behavior?", options: ["Rude","Punctual & respectful","Avoid work","Complain"], answer: "Punctual & respectful" },
        { q: "Handle conflict?", options: ["Fight","Ignore","Communicate","Leave"], answer: "Communicate" },
        { q: "Leadership?", options: ["Order","Guide & motivate","Sleep","Complain"], answer: "Guide & motivate" },
        { q: "5 years goal?", options: ["No idea","Professional growth","Jobless","Retired"], answer: "Professional growth" },
        { q: "Handle pressure?", options: ["Panic","Stay calm","Quit","Blame"], answer: "Stay calm" }
    ],
    aptitude: [
        { q: "25% of 200?", options: ["40","50","60","70"], answer: "50" },
        { q: "12 × 11?", options: ["121","132","144","112"], answer: "132" },
        { q: "15% of 300?", options: ["30","45","60","75"], answer: "45" },
        { q: "Square of 16?", options: ["256","196","144","225"], answer: "256" },
        { q: "5 workers 10 days, 10 workers?", options: ["5 days","20","15","10"], answer: "5 days" },
        { q: "SI formula?", options: ["(P×R×T)/100","P+R","R/T","P×T"], answer: "(P×R×T)/100" },
        { q: "45 + 36?", options: ["71","81","91","101"], answer: "81" },
        { q: "Cube of 3?", options: ["9","27","18","6"], answer: "27" },
        { q: "100 ÷ 4?", options: ["20","25","30","40"], answer: "25" },
        { q: "9 × 9?", options: ["72","81","99","90"], answer: "81" }
    ]
};

function startQuiz() {
    selectedCategory = document.getElementById("category").value;
    currentIndex = 0;
    score = 0;
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("restartBtn").style.display = "none";
    shuffleQuestions();
    showQuestion();
    startTimer();
}

function shuffleQuestions() {
    questions[selectedCategory].sort(() => Math.random() - 0.5);
}

function showQuestion() {
    let questionObj = questions[selectedCategory][currentIndex];
    document.getElementById("question").innerText = questionObj.q;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    questionObj.options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("optionBtn");
        btn.onclick = () => checkAnswer(btn, questionObj.answer);
        optionsDiv.appendChild(btn);
    });

    updateProgress();
}

function checkAnswer(button, correctAnswer) {
    let buttons = document.querySelectorAll(".optionBtn");
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === correctAnswer) {
            btn.classList.add("correct");
        }
    });

    if (button.innerText === correctAnswer) {
        score++;
        document.getElementById("score").innerText = "Score: " + score;
    } else {
        button.classList.add("wrong");
    }

    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex >= questions[selectedCategory].length) {
        endQuiz();
        return;
    }
    showQuestion();
}

function updateProgress() {
    let total = questions[selectedCategory].length;
    document.getElementById("progressBar").style.width =
        (currentIndex / total) * 100 + "%";
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timer = setInterval(() => {
        document.getElementById("timer").innerText = "Time: " + timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    let total = questions[selectedCategory].length;
    let percentage = Math.round((score / total) * 100);

    document.getElementById("quizBox").innerHTML =
        "<h2>Quiz Finished!</h2>" +
        "<h3>Your Score: " + score + " / " + total + "</h3>" +
        "<h3>Percentage: " + percentage + "%</h3>" +
        "<h3>" + (percentage >= 60 ? "Pass 🎉" : "Fail ❌") + "</h3>";

    document.getElementById("restartBtn").style.display = "inline-block";
}

function restartQuiz() {
    location.reload();
}
