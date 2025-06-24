const squares = [1,4,9,16,25,36,49,64,81,100,121,144];
const questionNumber = 20;
let questionIndex = 0;
let score = 0;

let b = 0;
let c = 0;

function disc() {
    let valid = false;
    while (!valid) {
        b = Math.floor(Math.random() * 20) - 10;
        c = Math.floor(Math.random() * 50) + 1;
        const discriminant = b * b - 4 * c;
        if (squares.includes(discriminant)) valid = true;
    }
}

function factor() {
    let factors = [];
    for (let i = 1; i <= Math.abs(c); i++) {
        if (c % i === 0) factors.push(i);
    }
    return factors;
}

function generateQuestion() {
    disc();
    const factors = factor();

    let x = 1, y = c;

    outerLoop:
    for (let i = 0; i < factors.length; i++) {
        for (let j = i; j < factors.length; j++) {
            const a = factors[i], d = factors[j];
            if (a + d === b) {
                x = a; y = d;
                break outerLoop;
            }
            if (-a + -d === b) {
                x = -a; y = -d;
                break outerLoop;
            }
            if (a + -d === b) {
                x = a; y = -d;
                break outerLoop;
            }
            if (-a + d === b) {
                x = -a; y = d;
                break outerLoop;
            }
        }
    }

    window.currentFactors = [x, y];

    document.getElementById("question").textContent = `Factorise: x² + ${b}x + ${c}`;
    document.getElementById("input").value = '';
    document.getElementById("feedback").textContent = '';
    document.getElementById("score").textContent = `Score: ${score} / ${questionNumber}`;
}

function checkAnswer() {
    if (questionIndex >= questionNumber) return;

    const userAnswer = document.getElementById("input").value.trim().replace(/\s+/g, '');

    const [x, y] = window.currentFactors;

    const correctAnswers = [
        `(x+${x})(x+${y})`,
        `(x+${y})(x+${x})`
    ];

    const feedbackDiv = document.getElementById("feedback");

    if (correctAnswers.includes(userAnswer)) {
        score++;
        feedbackDiv.textContent = "Correct!";
        feedbackDiv.style.color = "green";
    } else {
        feedbackDiv.textContent = "";  // No "Try again" message
    }

    questionIndex++;

    if (questionIndex >= questionNumber) {
        document.getElementById("question").textContent = `Quiz finished! Your score is: ${score} out of ${questionNumber}`;
        document.getElementById("input").style.display = 'none';
        document.getElementById("submitBtn").style.display = 'none';
        feedbackDiv.textContent = "";
    } else {
        generateQuestion();
    }

    document.getElementById("score").textContent = `Score: ${score} / ${questionNumber}`;
}

document.getElementById("startBtn").addEventListener('click', () => {
    questionIndex = 0;
    score = 0;
    document.getElementById("input").style.display = 'inline';
    document.getElementById("submitBtn").style.display = 'inline';
    generateQuestion();
});

document.getElementById("submitBtn").addEventListener('click', () => {
    checkAnswer();
});
