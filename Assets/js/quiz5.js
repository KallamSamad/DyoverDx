const squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
const questionNumber = 20;
let questionIndex = 0;
let score = 0;

let b = 0;
let c = 0;
let factorPair = []; // store correct factors for current question

// Generate valid b and c such that discriminant is a perfect square
function disc() {
    let valid = false;
    while (!valid) {
        b = Math.floor(Math.random() * 21) - 10; // allow negative b between -10 and 10
        c = Math.floor(Math.random() * 50) + 1;  // positive c between 1 and 50

        const discriminant = b * b - 4 * c;
        if (squares.includes(discriminant)) {
            // Now check if there are two integer factors of c whose sum is b
            const factors = getFactorPairs(c);
            for (const [f1, f2] of factors) {
                if (f1 + f2 === b) {
                    factorPair = [f1, f2];
                    valid = true;
                    break;
                }
            }
        }
    }
}

// Get all factor pairs of c (including negative pairs) that multiply to c
function getFactorPairs(n) {
    let pairs = [];
    for (let i = 1; i <= Math.abs(n); i++) {
        if (n % i === 0) {
            let j = n / i;
            pairs.push([i, j]);
            pairs.push([-i, -j]); // include negative factor pairs too
        }
    }
    return pairs;
}

function generateQuestion() {
    disc();

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

    const userAnswer = document.getElementById("input").value.trim().replace(/\s+/g, '');

    // Prepare all acceptable answer formats (handle both orderings and plus/minus signs)
    const [x, y] = factorPair;

    const possibleAnswers = [
        `(x+${x})(x+${y})`,
        `(x+${y})(x+${x})`
    ];

    if (possibleAnswers.includes(userAnswer)) {
        score++;
        alert("Correct!");
    } else {
        alert(`Try again! The correct answer was: (x${x >= 0 ? '+' : ''}${x})(x${y >= 0 ? '+' : ''}${y})`);
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
