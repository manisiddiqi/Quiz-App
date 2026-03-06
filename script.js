// Yeh hum nay question aur us kay answer banaye hai 
const questions = [
    {
        question: "Which is largest animal in the world?",
        answers : [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Who was the First woman Governor of State Bank of Pakistan?",
        answers : [
            {text: "Noor Jahan", correct: false},
            {text: "Dr Shamshad Akhter", correct: true},
            {text: "Farzana Raja", correct: false},
            {text: "Dr Ashraf Abbasi", correct: false},
        ]
    },
    {
        question: "Till now, how many Pakistanis won the Nobel Prize for Physics?",
        answers : [
            {text: "1 (Dr Abdus Salam in 1979)", correct: true},
            {text: "2", correct: false},
            {text: "3", correct: false},
            {text: "None of these", correct: false},
        ]
    },
    {
        question: "Which is smallest country in the world?",
        answers : [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Srilanka", correct: false},
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers : [
            {text: "Kalakahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antartica", correct: true},
        ]
    },
    {
        question: "Which is smallest content in the world?",
        answers : [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    }
];
// Yeh hum nay constants banaye hai question, answers aur next button kay liye
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
// Yeh hum nay variable banaye hai 
let currentQuestionIndex = 0;
let score = 0;
// Yeh quiz start kernay ka function banaya hai 
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
// Yeh question show kernay ka function 
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo =   currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
// Yeh function reset kernay kay liye banaya hai 
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// yeh answers ko select kernay kay liye function banaya hai
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// Yeh core ko show kernay kay liye function banaya hai
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Yeh next button ko handle kernay kay liye function banaya hai.
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

// Yeh next button per clicking kay liye hai 
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();