

let counter = 0; // To keep track of the current question
let score = 0; // To keep track of the user's score
let answeredQuestions = []; // To store the indices of questions that have been asked

function nextQuestion() {
    // Check if all questions have been asked
    if (answeredQuestions.length === questions.length) {
        alert(`Quiz completed! Your total score is ${score}`);
        return;
    }

    // Generate a random index for the next question that hasn't been asked yet
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (answeredQuestions.includes(randomIndex));

    const question = questions[randomIndex];
    answeredQuestions.push(randomIndex);

    // Update the question and answer options
    document.getElementById('questionNum').textContent = `Question ${answeredQuestions.length}`;
    document.getElementById('question').textContent = question.question;
    const answerImages = [document.getElementById('ans1'), document.getElementById('ans2'), document.getElementById('ans3'), document.getElementById('ans4')];

    // Shuffle the answer options randomly
    const shuffledAnswers = shuffleArray(question.answer);
    for (let i = 0; i < shuffledAnswers.length; i++) {
        const answer = shuffledAnswers[i];
        const answerImage = answerImages[i];
        answerImage.src = answer.pic;
        answerImage.alt = answer.id;
        answerImage.title = answer.id;

        // Add click event listener to each answer cell
        answerImage.onclick = function () {
            if (answer.correct) {
                // Correct answer selected
                score++;
                document.getElementById('correct').style.display = 'block';
                document.getElementById('wrong').style.display = 'none';
            } else {
                // Incorrect answer selected
                document.getElementById('correct').style.display = 'none';
                document.getElementById('wrong').style.display = 'block';
            }

            // Update the score display
            document.getElementById('scoretext').textContent = `Score: ${score}`;

            // Remove click event listeners from all answer cells
            for (const img of answerImages) {
                img.onclick = null;
            }

            // Show the explanation
            document.getElementById('explanation').textContent = question.explain;
            document.getElementById('explanation').style.display = 'block';

            // Show the "Next" button
            document.getElementById('next').style.display = 'block';
        };
    }

    // Reset feedback and hide explanation
    document.getElementById('correct').style.display = 'none';
    document.getElementById('wrong').style.display = 'none';
    document.getElementById('explanation').style.display = 'none';

    // Hide the "Next" button until an answer is selected
    document.getElementById('next').style.display = 'none';
}

// Shuffle array elements randomly (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}