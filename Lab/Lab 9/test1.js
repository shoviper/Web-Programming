let currentQuestionIndex = 0;
let score = 0;
let max = 5;    
let usedquestion = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let orderquestion = [];

shuffleArray(questions);


function loadQuestion(index) {

    const question = questions[index];
    document.getElementById('questionNum').textContent = `Question ${index + 1}`;
    document.getElementById('question').textContent = question.question;
    document.getElementById('ans1').src = question.answer[0].pic;
    document.getElementById('ans2').src = question.answer[1].pic;
    document.getElementById('ans3').src = question.answer[2].pic;
    document.getElementById('ans4').src = question.answer[3].pic;
    document.getElementById('next').style.display = 'none';
}

// loadQuestion(0);

function nextQuestion() {
    document.getElementById('correct').style.display = 'none';
    document.getElementById('wrong').style.display = 'none';
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('next').style.display = 'none';

    currentQuestionIndex++;

    if (currentQuestionIndex < max) {
        loadQuestion(currentQuestionIndex);
    } else {
        alert(`Finish, Your score is: ${score}`);
    }
}

function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const selectedAnswer = question.answer[selectedIndex];

    if (selectedAnswer.correct) {
        score++;
        document.getElementById('correct').style.display = 'block';
    } else {
        document.getElementById('wrong').style.display = 'block';
    }

    document.getElementById('explanation').textContent = question.explain;
    document.getElementById('scoretext').textContent = `Score: ${score}`;
    // document.getElementById('explanation').style.display = 'block';
    document.getElementById('next').style.display = 'block';
}

window.onload = function () {
    loadQuestion(currentQuestionIndex);

    document.getElementById('ans1').addEventListener('click', () => {
        checkAnswer(0);
    });

    document.getElementById('ans2').addEventListener('click', () => {
        checkAnswer(1);
    });

    document.getElementById('ans3').addEventListener('click', () => {
        checkAnswer(2);
    });

    document.getElementById('ans4').addEventListener('click', () => {
        checkAnswer(3);
    });

    document.getElementById('next').addEventListener('click', nextQuestion);
};