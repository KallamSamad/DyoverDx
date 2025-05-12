let score = 0;
let questions = [];
let symbols = ["×", "-", "+"];

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
    answersDiv.innerHTML = "";

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

    let questionText;
    if (op === "×") {
        if (number1 === number2) {
            questionText = `${number1}x × ${number2}x (or ${number1}x²)`;
        } else {
            questionText = `${number1}x × ${number2}x`;
        }
    } else {
        questionText = `${number1}x ${op} ${number2}x`;
    }

    output.innerHTML = `<p>Question ${questions[currentQuestionIndex]}: ${questionText}</p>`;

    // Generate 3 fake answers
    let answers = [correctAnswer];
    while (answers.length < 4) {
        let fake = correctAnswer + Math.floor(Math.random() * 11 - 5);
        if (!answers.includes(fake)) {
            answers.push(fake);
        }
    }

    // Shuffle answers
    answers.sort(() => Math.random() - 0.5);

    // Create answer buttons
    answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.className = "answer-btn";

        if (op === "×") {
            btn.textContent = `${answer}x²`;
        } else {
            btn.textContent = `${answer}x`;
        }

        btn.onclick = () => {
            if (answer === correctAnswer) {
                output.innerHTML += "<p>Correct!</p>";
                score++;
            } else {
                output.innerHTML += `<p>Incorrect. Correct answer was ${correctAnswer}${op === "×" ? "x²" : "x"}.</p>`;
            }
            currentQuestionIndex++;
            setTimeout(showQuestion, 1000);
        };

        answersDiv.appendChild(btn);
    });
}

// Start the quiz
showQuestion();
