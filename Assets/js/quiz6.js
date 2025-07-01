const smallSquares =  [4, 9, 16, 25, 36, 49];
const mediumSquares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
const fullSquares = [
  0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100,
  121, 144, 169, 196, 225, 256, 289, 324, 361, 400
];

const questionNumber = 20;
let questionIndex = 0;
let score = 0;
let a = 0;
let b = 0;
let c = 0;

function disc() {
    let valid = false;
    while (!valid) {
        a = smallSquares[Math.floor(Math.random() * smallSquares.length)];
        b = fullSquares[Math.floor(Math.random() * fullSquares.length)];
        c = mediumSquares[Math.floor(Math.random() * mediumSquares.length)];

        const discriminant = b * b - (4 * a * c);
        if (discriminant >= 0 && fullSquares.includes(discriminant)) {
            valid = true;
        }
    }
}

function getFactors(n) {
    let factors = [];
    for (let i = 1; i <= Math.abs(n); i++) {
        if (n % i === 0) factors.push(i);
    }
    return factors;
}

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function generateQuestion() {
    disc();

    const ac = a * c;
    const acFactors = getFactors(ac);
    const allFactors = [];
    acFactors.forEach(f => {
        allFactors.push(f);
        allFactors.push(-f);
    });

    // Find pairs (m,n) such that m*n=ac and m+n=b
    let mnPairs = [];
    for (let i = 0; i < allFactors.length; i++) {
        for (let j = 0; j < allFactors.length; j++) {
            if (allFactors[i] * allFactors[j] === ac && allFactors[i] + allFactors[j] === b) {
                mnPairs.push([allFactors[i], allFactors[j]]);
            }
        }
    }

    if (mnPairs.length === 0) {
        // No valid pairs, regenerate question
        generateQuestion();
        return;
    }

    const [m, n] = mnPairs[0]; // pick first valid pair

    // Factor a into pairs (p, r)
    const aFactors = getFactors(a);
    const factorPairs = [];
    aFactors.forEach(p => {
        factorPairs.push([p, a / p]);
    });

    // Find p, q, r, s such that (px + q)(rx + s) = ax^2 + bx + c
    // Using m and n to find q and s
    let finalFactors = null;

    outerLoop:
    for (const [p, r] of factorPairs) {
        // Try q = m/p, s = n/r
        if (Number.isInteger(m / p) && Number.isInteger(n / r)) {
            let q = m / p;
            let s = n / r;
            if (q * s === c) {
                finalFactors = [p, q, r, s];
                break outerLoop;
            }
        }
        // Try q = n/p, s = m/r
        if (Number.isInteger(n / p) && Number.isInteger(m / r)) {
            let q = n / p;
            let s = m / r;
            if (q * s === c) {
                finalFactors = [p, q, r, s];
                break outerLoop;
            }
        }
    }

    if (!finalFactors) {
        // No suitable factorization, regenerate question
        generateQuestion();
        return;
    }

    window.currentFactors = finalFactors;

    document.getElementById("question").textContent = `Factorise: ${a}x² + ${b}x + ${c}`;
    document.getElementById("input").value = '';
    document.getElementById("feedback").textContent = '';
    document.getElementById("score").textContent = `Score: ${score} / ${questionNumber}`;
}

function checkAnswer() {
    if (questionIndex >= questionNumber) return;

    let userAnswer = document.getElementById("input").value.trim();
    // Remove spaces for easier matching
    userAnswer = userAnswer.replace(/\s+/g, '');

    const [p, q, r, s] = window.currentFactors;

    const formatTerm = (coef, variable) => {
        if (coef === 0) return '';
        if (coef === 1) return variable;
        if (coef === -1) return '-' + variable;
        return coef + variable;
    };

    // Construct binomials
    const binomial1 = `(${formatTerm(p, 'x')}${q >= 0 ? '+' : ''}${q})`;
    const binomial2 = `(${formatTerm(r, 'x')}${s >= 0 ? '+' : ''}${s})`;

    // Compute gcd of p and r to find outside constant factor if any
    const outsideFactor = gcd(Math.abs(p), Math.abs(r));

    // Prepare correct answers with and without outside factor
    const correctAnswers = [
        `${outsideFactor > 1 ? outsideFactor : ''}${binomial1}${binomial2}`,
        `${outsideFactor > 1 ? outsideFactor : ''}${binomial2}${binomial1}`,
        `${binomial1}${binomial2}`,
        `${binomial2}${binomial1}`
    ];

    // Also consider a more relaxed check ignoring parentheses (for flexibility)
    const simpleUserAnswer = userAnswer.replace(/[()]/g, '');
    const simpleCorrectAnswers = correctAnswers.map(ans => ans.replace(/[()]/g, ''));

    const isCorrect = correctAnswers.includes(userAnswer) || simpleCorrectAnswers.includes(simpleUserAnswer);

    const feedbackDiv = document.getElementById("feedback");

    if (isCorrect) {
        score++;
        feedbackDiv.textContent = "Correct!";
        feedbackDiv.style.color = "green";
    } else {
        feedbackDiv.textContent = "Try again!";
        feedbackDiv.style.color = "red";
        return; // let user retry same question
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
