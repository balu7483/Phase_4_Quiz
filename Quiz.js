fetch('Questions.json')
.then(response => response.json())
.then(data => {
    const QuizContainer = document.getElementById('Quiz-Container');
    const QuestionElement = document.getElementById('Question');
    const ChoiceElement = document.getElementById('Choices');
    const SubmitButton = document.getElementById('Next');
    const ReviewButton = document.getElementById('Review'); // Added Review button
    const ResultContainer = document.getElementById('Result-Container');
    const ResultElement = document.getElementById('Result');

    let Score = 0;
    let currentQuestionIndex = 0;
    let userAnswers = []; // Array to store user's answers

    function loadQuestion() {
        const currentQuestion = data.questions[currentQuestionIndex];
        QuestionElement.textContent = currentQuestion.question;
        ChoiceElement.innerHTML = '';

        currentQuestion.choices.forEach(choice => {
            const li = document.createElement('li');
            const input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'answer');
            input.setAttribute('value', choice);

            li.appendChild(input);
            li.appendChild(document.createTextNode(choice));
            ChoiceElement.appendChild(li);
        });
    }

    function checkAnswer() {
        const selectAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectAnswer) {
            const userAnswer = selectAnswer.value;
            const currentQuestion = data.questions[currentQuestionIndex];
            if (userAnswer === currentQuestion.correctAns) {
                Score++;
            }
            userAnswers.push(userAnswer); 
            currentQuestionIndex++;
            if (currentQuestionIndex < data.questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }
    }

    function showResult() {
        QuizContainer.style.display = 'none';
        ResultContainer.style.display = 'block';
        ResultElement.textContent = `Your Score is ${Score}`;
        ReviewButton.style.display = 'block'; 
    }

    function reviewAnswers() {
        QuizContainer.style.display = 'none';
        ResultContainer.style.display = 'block';
        ResultElement.innerHTML = '<h2>Review Answers</h2>';
        
        for (let i = 0; i < data.questions.length; i++) {
            const question = data.questions[i];
            const userAnswer = userAnswers[i];
            const isCorrect = userAnswer === question.correctAns;

            const questionElement = document.createElement('p');
            questionElement.textContent = `Q${i+1}. ${question.question}`;
            ResultElement.appendChild(questionElement);

            const userAnswerElement = document.createElement('p');
            userAnswerElement.textContent = `Your Answer: ${userAnswer}`;
            userAnswerElement.classList.add(isCorrect ? 'correct' : 'incorrect');
            ResultElement.appendChild(userAnswerElement);

            const correctAnswerElement = document.createElement('p');
            correctAnswerElement.textContent = `Correct Answer: ${question.correctAns}`;
            correctAnswerElement.classList.add('correct');
            ResultElement.appendChild(correctAnswerElement);

            ResultElement.appendChild(document.createElement('hr'));
        }
    }

    SubmitButton.addEventListener('click', checkAnswer);
    ReviewButton.addEventListener('click', reviewAnswers); 
    loadQuestion();
})
.catch(error => {
    console.error('Error:', error);
});
