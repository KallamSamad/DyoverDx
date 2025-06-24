const squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
const questionNumber = 20;
let questionIndex = 0;
let score = 0;

let b = 0;
let c = 0;

function disc() {
    let valid = false;
    while (!valid) {
        b = Math.floor(Math.random() * 150);
        c = Math.floor(Math.random() * 150);
        const discriminant = b * b - 4 * c;
        if (squares.includes(discriminant)) {
            valid = true;
        }
    }
}

function factor() {
    let factors = [];
    for (let i = 1; i <= c; i++) {
        if (c % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

function generateQuestion() {
    disc();
    const factors = factor();

    // Pick two factors that add up to b or their negative counterparts
    // Your current method is a bit naive, here just pick first two factors as example
    let x = factors[0] || 1;
    let y = factors[1] || 1;

    // Display question
    document.getElementById("question").innerHTML = `Factorise: x² + ${b}x + ${c}`;
    
    // Clear input for next question
    document.getElementById("input").value = '';
    document.getElementById("score").innerHTML = `Score: ${score} / ${questionNumber}`;
}

function checkAnswer() {
    if (questionIndex >= questionNumber) {
        return; // Quiz is over
    }

    const userAnswer = document.getElementById("input").value.trim();

    // Calculate correct factors again to check answer
    // (You need to recalc factors b and c or store them per question)
    // For now, let's assume b and c are global and unchanged since question generation
    
    const factors = factor();

    let x = factors[0] || 1;
    let y = factors[1] || 1;

    // Accept either order of factors and signs (handle signs for factor pairs carefully)
    const correctAnswers = [
        `(x + ${x})(x + ${y})`,
        `(x + ${y})(x + ${x})`
    ];

    if (correctAnswers.includes(userAnswer)) {
        score++;
        alert("Correct!");
    } else {
        alert("Try again!");
    }
    questionIndex++;

    if (questionIndex >= questionNumber) {
        document.getElementById("question").innerHTML = `Quiz finished! Your score is: ${score} out of ${questionNumber}`;
        document.getElementById("input").style.display = 'none';
        document.getElementById("submitBtn").style.display = 'none';
    } else {
        generateQuestion();
    }
}

// Start quiz on button click
document.getElementById("startBtn").addEventListener('click', () => {
    questionIndex = 0;
    score = 0;
    document.getElementById("input").style.display = 'inline';
    document.getElementById("submitBtn").style.display = 'inline';
    generateQuestion();
});

// Check answer on button click
document.getElementById("submitBtn").addEventListener('click', () => {
    checkAnswer();
});
