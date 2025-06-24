const squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
const questionNumber = 20;
let questionIndex = 0;
let score = 0;
let b = 0;
let c = 0;

// Generate valid b, c so discriminant is a perfect square
function disc() {
    let valid = false;
    while (!valid) {
        b = Math.floor(Math.random() * 150) - 75; // allow negative b for more variety
        c = Math.floor(Math.random() * 150) - 75; // allow negative c
        const discriminant = b * b - 4 * c;
        if (squares.includes(discriminant)) {
            valid = true;
        }
    }
}

// Find factor pairs of c that sum to b
function findFactors() {
    let factorPairs = [];
    for (let i = -Math.abs(c); i <= Math.abs(c); i++) {
        if (i !== 0 && c % i === 0) {
            let j = c / i;
            if (i + j === b) {
                factorPairs.push([i, j]);
            }
        }
    }
    return factorPairs;
}

// Display the current question
function displayQuestion() {
    disc();
    document.getElementById("question").innerText = `Factorise: x² + ${b}x + ${c}`;
    document.getElementById("input").value = "";
    document.getElementById("score").innerText = `Score: ${score} / ${questionIndex}`;
}

// Check user's answer
function checkAnswer() {
    const userAnswer = document.getElementById("input").value.trim();
    const factors = findFactors();
    
    // Accept either order of factors
    let correct = false;
    for (const [x, y] of factors) {
        let correctAnswer1 = `(x + ${x})(x + ${y})`;
        let correctAnswer2 = `(x + ${y})(x + ${x})`;
        if (userAnswer === correctAnswer1 || userAnswer === correctAnswer2) {
            correct = true;
            break;
        }
    }

    if (correct) {
        score++;
        alert("Correct!");
    } else {
        alert("Try again!");
    }

    questionIndex++;

    if (questionIndex >= questionNumber) {
        document.getElementById("question").innerText = `Quiz finished! Your score is: ${score} out of ${questionNumber}`;
        document.getElementById("submitBtn").disabled = true;
        document.getElementById("input").disabled = true;
    } else {
        displayQuestion();
    }
}

// Event listeners
document.getElementById("startBtn").addEventListener("click", () => {
    questionIndex = 0;
    score = 0;
    document.getElementById("submitBtn").disabled = false;
    document.getElementById("input").disabled = false;
    displayQuestion();
});

document.getElementById("submitBtn").addEventListener("click", () => {
    checkAnswer();
});
