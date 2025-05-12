 let score = 0;
let questions = [];
let symbols = ["×", "+", "-"];
let currentQuestionIndex = 0;

for (let i = 1; i <= 10; i++) {
    questions.push(i);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatTerm(coeff, power) {
    if (power === 0) return `${coeff}`;
    if (power === 1) return `${coeff}x`;
    return `${coeff}x\u207${power}`;
}

function evaluateExpression(n1, p1, n2, p2, op) {
    switch (op) {
        case "+":
            if (p1 !== p2) return null; // can't combine unlike terms
            return { coeff: n1 + n2, power: p1 };
        case "-":
            if (p1 !== p2) return null;
            return { coeff: n1 - n2, power: p1 };
        case "×":
            return { coeff: n1 * n2, power: p1 + p2 };
        default:
            return { coeff: 0, power: 0 };
    }
}

function showQuestion() {
    const output = document.getElementById("output");
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    if (currentQuestionIndex >= questions.length) {
        let percentage = (score / questions.length) * 100;
        output.innerHTML = `<p>You scored ${score}/10 (${percentage}%)</p>`;

        if (percentage >= 75) {
            output.innerHTML += "<p>Well done, you've aced this topic.</p>";
        } else if (percentage > 50) {
            output.innerHTML += "<p>You're getting there. Keep practicing!</p>";
        } else {
            output.innerHTML += "<p>Try again — practice makes perfect.</p>";
        }
        return;
    }

    const number1 = getRandomInt(1, 9);
    const number2 = getRandomInt(1, 9);
    const power1 = getRandomInt(0, 2);
    const power2 = getRandomInt(0, 2);
    const op = symbols[Math.floor(Math.random() * symbols.length)];

    const expr1 = formatTerm(number1, power1);
    const expr2 = formatTerm(number2, power2);
    const correct = evaluateExpression(number1, power1, number2, power2, op);

    let questionText = `Question ${questions[currentQuestionIndex]}: ${expr1} ${op} ${expr2}`;

    // If invalid operation (like adding unlike powers), regenerate
    if (!correct) {
        showQuestion();
        return;
    }

    const correctAnswer = formatTerm(correct.coeff, correct.power);
    output.innerHTML = `<p>${questionText}</p>`;

    let answers = [correctAnswer];
    while (answers.length < 4) {
        let fakeCoeff = correct.coeff + getRandomInt(-4, 4);
        let fakePower = correct.power + getRandomInt(-1, 1);
        if (fakeCoeff < 1) fakeCoeff = 1;
        if (fakePower < 0) fakePower = 0;

        let fakeAnswer = formatTerm(fakeCoeff, fakePower);
        if (!answers.includes(fakeAnswer)) {
            answers.push(fakeAnswer);
        }
    }

    answers.sort(() => Math.random() - 0.5);

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
            setTimeout(showQuestion, 1200);
        };
        answersDiv.appendChild(btn);
    });
}

// Start quiz
showQuestion();
