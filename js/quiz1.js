let score = 0;
let questions = [];
let symbols = ["×", "-", "+"];

for (let i = 1; i <= 20; i++) {
    questions.push(i);
}

let currentQuestionIndex = 0;

function evaluate(n1, n2, op) {
    switch (op) {
        case "+": return ${n1 + n2}x;
        case "-": return ${n1 - n2}x;
        case "×": return ${n1 * n2}x²;
        default: return "0x";
    }
}

function showQuestion() {
    const output = document.getElementById("output1");
    const answersDiv = document.getElementById("answers1");
    answersDiv.innerHTML = ""; // Clear old buttons

    if (currentQuestionIndex >= questions.length) {
        let percentage = (score / questions.length) * 100;
        output.innerHTML = <p>You scored ${score}/20 (${percentage}%)</p>;

        if (percentage >= 75) {
            output.innerHTML += "<p>Well done, you've aced this topic.</p>";
        } else if (percentage > 50) {
            output.innerHTML += "<p>You're getting there. Keep practicing!</p>";
        } else {
            output.innerHTML += "<p>Try again — practice makes perfect.</p>";
        }

        // Add "Redo Quiz" button
        const redoBtn = document.createElement("button");
        redoBtn.textContent = "Redo Quiz";
        redoBtn.className = "answer-btn";
        redoBtn.onclick = () => {
            score = 0;
            currentQuestionIndex = 0;
            showQuestion();
        };
        answersDiv.appendChild(redoBtn);

        return;
    }

    let number1 = Math.floor((Math.random() * 10) + 1);
    let number2 = Math.floor((Math.random() * 10) + 1);
    let operation = Math.floor(Math.random() * symbols.length);
    let op = symbols[operation];
    let correctAnswer = evaluate(number1, number2, op);

    const n1Str = ${number1}x;
    const n2Str = ${number2}x;

    output.innerHTML = <p>Question ${questions[currentQuestionIndex]}: ${n1Str} ${op} ${n2Str}</p>;

    // Generate 3 fake answers
    let answers = [correctAnswer];
    while (answers.length < 4) {
        let fakeNum = eval(correctAnswer.replace(/[^\d-]/g, '')) + Math.floor(Math.random() * 11 - 5);
        let fakeAnswer = (op === "×") ? ${fakeNum}x² : ${fakeNum}x;

        if (!answers.includes(fakeAnswer)) {
            answers.push(fakeAnswer);
        }
    }

    // Shuffle answers
    answers.sort(() => Math.random() - 0.5);

    // Create answer buttons
    answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.className = "answer-btn";
        btn.onclick = () => {
            if (answer === correctAnswer) {
                output.innerHTML += "<p>Correct!</p>";
                score++;
            } else {
                output.innerHTML += <p>Incorrect. Correct answer was ${correctAnswer}.</p>;
            }
            currentQuestionIndex++;
            setTimeout(showQuestion, 1000); // Show next question after 1s
        };
        answersDiv.appendChild(btn);
    });
}

// Start the quiz
showQuestion();c
