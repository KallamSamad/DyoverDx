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

// Parse user input with optional outside factor and two binomials like "9(2x+1)(2x+1)"
function parseUserInput(input) {
    input = input.replace(/\s+/g, '');

    // Regex:
    // Optional outside coefficient (like "9")
    // Two binomials: (Ax+B)(Cx+D)
    const regex = /^([+-]?\d+)?\(([-+]?[\d\/]*?)x([-+][\d\/]+)\)\(([-+]?[\d\/]*?)x([-+][\d\/]+)\)$/;
    const match = input.match(regex);
    if (!match) return null;

    const outsideCoefStr = match[1];
    const A1Str = match[2];
    const B1Str = match[3];
    const A2Str = match[4];
    const B2Str = match[5];

    const outsideCoef = outsideCoefStr ? parseInt(outsideCoefStr, 10) : 1;
    if (isNaN(outsideCoef)) return null;

    function parseFraction(str) {
        if (str.includes('/')) {
            const [num, den] = str.split('/');
            const numerator = parseFloat(num);
            const denominator = parseFloat(den);
            if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return NaN;
            return numerator / denominator;
        } else {
            return parseFloat(str);
        }
    }

    const A1 = (A1Str === '' || A1Str === '+') ? 1 : A1Str === '-' ? -1 : parseFraction(A1Str);
    const B1 = parseFraction(B1Str);
    const A2 = (A2Str === '' || A2Str === '+') ? 1 : A2Str === '-' ? -1 : parseFraction(A2Str);
    const B2 = parseFraction(B2Str);

    if ([A1, B1, A2, B2].some(x => isNaN(x))) return null;

    return { outsideCoef, A1, B1, A2, B2 };
}

// Expand k*(A1 x + B1)(A2 x + B2)
function expandFactored(outsideCoef, A1, B1, A2, B2) {
    const a = outsideCoef * A1 * A2;
    const b = outsideCoef * (A1 * B2 + B1 * A2);
    const c = outsideCoef * B1 * B2;
    return { a, b, c };
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

    let mnPairs = [];
    for (let i = 0; i < allFactors.length; i++) {
        for (let j = 0; j < allFactors.length; j++) {
            if (allFactors[i] * allFactors[j] === ac && allFactors[i] + allFactors[j] === b) {
                mnPairs.push([allFactors[i], allFactors[j]]);
            }
        }
    }

    if (mnPairs.length === 0) {
        generateQuestion();
        return;
    }

    const [m, n] = mnPairs[0];
    const aFactors = getFactors(a);
    const factorPairs = [];
    aFactors.forEach(p => {
        factorPairs.push([p, a / p]);
    });

    let finalFactors = null;
    outerLoop:
    for (const [p, r] of factorPairs) {
        if (Number.isInteger(m / p) && Number.isInteger(n / r)) {
            let q = m / p;
            let s = n / r;
            if (q * s === c) {
                finalFactors = [p, q, r, s];
                break outerLoop;
            }
        }
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
    if (!userAnswer) return;

    const parsed = parseUserInput(userAnswer);
    const feedbackDiv = document.getElementById("feedback");

    if (!parsed) {
        feedbackDiv.textContent = "Invalid format! Please enter like (2x+3)(x-1) or 3(2x+1)(2x+1)";
        feedbackDiv.style.color = "red";
        return;
    }

    const { outsideCoef, A1, B1, A2, B2 } = parsed;

    // Expand user's input and compare with generated quadratic
    const expanded = expandFactored(outsideCoef, A1, B1, A2, B2);

    if (expanded.a === a && expanded.b === b && expanded.c === c) {
        score++;
        feedbackDiv.textContent = "Correct!";
        feedbackDiv.style.color = "green";
        questionIndex++;
        document.getElementById("score").textContent = `Score: ${score} / ${questionNumber}`;
        if (questionIndex >= questionNumber) {
            document.getElementById("question").textContent = `Quiz finished! Your score is: ${score} out of ${questionNumber}`;
            document.getElementById("input").style.display = 'none';
            document.getElementById("submitBtn").style.display = 'none';
            feedbackDiv.textContent = "";
        } else {
            generateQuestion();
        }
    } else {
        feedbackDiv.textContent = "Incorrect, try again!";
        feedbackDiv.style.color = "red";
    }
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
