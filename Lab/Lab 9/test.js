let currentQuestionIndex = 0;
let score = 0;
let max = 5;
let usedquestion = [];
let orderquestion = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(questions);

function loadQuestion(index) {
    const question = questions[orderquestion[index]];
    document.getElementById('questionNum').textContent = `Question ${index + 1}`;
    document.getElementById('question').textContent = question.question;
    document.getElementById('ans1').src = question.answer[0].pic;
    document.getElementById('ans2').src = question.answer[1].pic;
    document.getElementById('ans3').src = question.answer[2].pic;
    document.getElementById('ans4').src = question.answer[3].pic;
    document.getElementById('next').style.display = 'none';
}

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
        // const nextButton = document.getElementById('next');
        // nextButton.style.display = 'block';
        // nextButton.textContent = 'Finish';
        // nextButton.style.backgroundColor = 'white';
    }
}

function checkAnswer(selectedIndex) {
    const question = questions[orderquestion[currentQuestionIndex]];
    const selectedAnswer = question.answer[selectedIndex];

    if (!question.answered) {
        question.answered = true;
        if (selectedAnswer.correct) {
            score++;
            document.getElementById('correct').style.display = 'block';
        } else {
            document.getElementById('wrong').style.display = 'block';
        }

        document.getElementById('explanation').textContent = question.explain;
        document.getElementById('scoretext').textContent = `Score: ${score}`;
        document.getElementById('next').style.display = 'block';
    }
}

window.onload = function () {
    for (let i = 0; i < max; i++) {
        usedquestion.push(i);
    }
    
    shuffleArray(usedquestion);

    for (let i = 0; i < max; i++) {
        orderquestion.push(usedquestion.pop());
    }

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
