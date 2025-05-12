let score = 0;
let questions = [];
let symbols = ["×", "-", "+"];

// Create 20 questions
for (let i = 1; i <= 20; i++) {
    questions.push(i);
}

let currentQuestionIndex = 0;

function evaluate(n1, n2, op) {
    switch (op) {
        case "+": return n1 + n2;
        case "-": return n1 - n2;
        case "×": return n1 * n2;
        default: return 0;
    }
}

function showQuestion() {
    const output = document.getElementById("output");
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = ""; // Clear old buttons

    if (currentQuestionIndex >= questions.length) {
        let percentage = (score / questions.length) * 100;
        output.innerHTML = `<p>You scored ${score}/20 (${percentage}%)</p>`;

        if (percentage >= 75) {
            output.innerHTML += "<p>Well done, you've aced this topic.</p>";
        } else if (percentage > 50) {
            output.innerHTML += "<p>You're getting there. Keep practicing!</p>";
        } else {
            output.innerHTML += "<p>Try again — practice makes perfect.</p>";
        }
        return;
    }

    let number1 = Math.floor((Math.random() * 10) + 1);
    let number2 = Math.floor((Math.random() * 10) + 1);
    let op = symbols[Math.floor(Math.random() * symbols.length)];
    let correctAnswer = evaluate(number1, number2, op);

    // Format question text with x² hint if needed
    let questionText;
    if (op === "×" && number1 === number2) {
        questionText = `${number1} × ${number2} (or ${number1}<sup>2</sup>)`;
    } else {
        questionText = `${number1} ${op} ${number2}`;
    }

    output.innerHTML = `<p>Question ${questions[currentQuestionIndex]}: ${questionText}</p>`;

    // Generate 3 fake answers
    let answers = [correctAnswer];
    while (answers.length < 4) {
        let fake = correctAnswer + Math.floor(Math.random() * 11 - 5); // ±5 range
        if (!answers.includes(fake)) {
            answers.push(fake);
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
                output.innerHTML += `<p>Incorrect. Correct answer was ${correctAnswer}.</p>`;
            }
            currentQuestionIndex++;
            setTimeout(showQuestion, 1000); // Show next question after 1s
        };
        answersDiv.appendChild(btn);
    });
}

// Start the quiz
showQuestion();
