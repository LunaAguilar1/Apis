
const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Q.¿Cuántos estados de la materia existen?",
        choices: ["4", "3", "2", "1"],
        answer: "4"
    },
    {
        question: "Q.¿Cuándo se fundó México?",
        choices: ["28 de diciembre de 1836", "30 de diciembre de 1899", "10 de diciembre de 1967", "16 de diciembre de 1787"],
        answer: "28 de diciembre de 1836"
    },
    {
        question: "Q.¿Qué año se descubrió América?",
        choices: ["12 de octubre de 1492", "14 de octubre de 1968", "20 de octubre de 1492", "30 de octubre de 1942"],
        answer: "12 de octubre de 1492"
    },
    {
        question: "Q.¿Cuántos huesos tiene el cuerpo humano?",
        choices: ["206", "203", "207", "205"],
        answer: "206"
    },
    {
        question: "Q.¿Quien fue el primer presidente de México?",
        choices: ["Guadalupe Victoria", "Amlo", "Peñanieto", "Felipe Caldern"],
        answer: "Guadalupe Victoria"
    },
    {
        question: "Q.¿Cuantas especies de animales existen en el mundo?",
        choices: ["7 y 5 Millones", "8 y 9 Millones", "4 y 3 Millones", "1 y 2 Millones"],
        answer: "8 y 9 millones"
    },
    
    {
        question: "Q.¿Cuantos componentes compone una PC de escritorio?",
        choices: ["7", "6", "10", "9"],
        answer: "7"
    },
    
    {
        question: "Q.¿Cuál lenguaje es el menos usado?",
        choices: ["Brainfuck", "Java", "Phyton", "C++"],
        answer: "Brainfuck"
    },
    
    
    
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("¡Respuesta correcta!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`¡Respuesta incorrecta! ${quiz[currentQuestionIndex].answer} es la respuesta correcta`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("¡¡¡Se acabó el tiempo!!! ¿Quieres volver a jugar el cuestionario?");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});
