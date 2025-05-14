let score = 0;
let totalQuestions = 20;
let currentQuestion = 0;

// Dictionary for variable terms (quadratic and mixed terms)
let variables = ['x', 'y', 'z', 'a', 'b', 'c']; // List of variables for terms like x, y, z, a, b, c

// Function to generate a random term with coefficients and variables (including x^2, y^2, and mixed terms like ab)
function generateExpressionTerm() {
    let coeff = Math.floor(Math.random() * 11) - 5; // Coefficients between -5 and 5
    while (coeff === 0) coeff = Math.floor(Math.random() * 11) - 5; // Avoid zero coefficients
    
    let termType = Math.floor(Math.random() * 4); // Randomly decide if the term is linear, quadratic, or mixed
    let term;
    
    if (termType === 0) { // Linear term (e.g., 3x)
        let varIdx = Math.floor(Math.random() * variables.length); // Randomly select a variable
        term = { coeff, variable: variables[varIdx] };
    } else if (termType === 1) { // Quadratic term (e.g., x^2, y^2)
        let varIdx = Math.floor(Math.random() * variables.length); // Randomly select a variable
        term = { coeff, variable: `${variables[varIdx]}^2` };
    } else if (termType === 2) { // Mixed terms (e.g., ab, ac, etc.)
        let var1 = variables[Math.floor(Math.random() * variables.length)];
        let var2 = variables[Math.floor(Math.random() * variables.length)];
        while (var1 === var2) var2 = variables[Math.floor(Math.random() * variables.length)]; // Ensure they are different
        term = { coeff, variable: `${var1}${var2}` };
    }
    return term;
}

// Function to simplify the expression by combining like terms
function simplifyExpression(terms) {
    let simplified = {};
    
    terms.forEach(term => {
        if (!simplified[term.variable]) simplified[term.variable] = 0;
        simplified[term.variable] += term.coeff;
    });
    
    let simplifiedExpression = [];
    for (let variable in simplified) {
        let coeff = simplified[variable];
        if (coeff !== 0) {
            simplifiedExpression.push(
                coeff === 1 ? variable :
                coeff === -1 ? `-${variable}` :
                `${coeff}${variable}`
            );
        }
    }
    
    return simplifiedExpression.length ? simplifiedExpression.join(" + ").replace(/\+\s-\s/g, "- ") : "0";
}

// Function to format the expression for display
function formatExpression(terms) {
    return terms.map(term => `${term.coeff}${term.variable}`).join(" + ").replace(/\+\s-\s/g, "- ");
}

// Function to generate a random mathematical expression
function generateQuestion() {
    const output = document.getElementById("output2");
    const answersDiv = document.getElementById("answers2");
    output.innerHTML = "";
    answersDiv.innerHTML = "";

    if (currentQuestion >= totalQuestions) {
        let percent = Math.round((score / totalQuestions) * 100);
        output.innerHTML = `<h2>Quiz Finished!</h2><p>Your score: ${score}/${totalQuestions} (${percent}%)</p>`;
        output.innerHTML += percent >= 75
            ? "<p>🎉 Great job – you’ve mastered this!</p>"
            : percent >= 50
            ? "<p>Good effort, keep practicing!</p>"
            : "<p>Don’t give up! Try again.</p>";
        return;
    }

    let terms = [];
    let numTerms = Math.floor(Math.random() * 2) + 5; // Generate between 5 to 6 terms
    for (let i = 0; i < numTerms; i++) {
        terms.push(generateExpressionTerm());
    }

    // Format the expression for display
    let expression = formatExpression(terms);
    let correctAnswer = simplifyExpression(terms);
    
    output.innerHTML = `<p>Question ${currentQuestion + 1}: Simplify the expression: <br>${expression}</p>`;

    // Generate 3 fake answers with slight variations
    let answers = [correctAnswer];
    while (answers.length < 4) {
        let fakeAnswer = generateFakeAnswer(correctAnswer);
        if (!answers.includes(fakeAnswer)) answers.push(fakeAnswer);
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
                output.innerHTML += `<p>Incorrect. The correct answer was: ${correctAnswer}</p>`;
            }
            currentQuestion++;
            setTimeout(generateQuestion, 1000); // Show next question after 1s
        };
        answersDiv.appendChild(btn);
    });
}

// Generate fake answers by slightly changing the coefficients
function generateFakeAnswer(correctAnswer) {
    let answerParts = correctAnswer.split(" + ");
    answerParts = answerParts.map(part => {
        let coeff = parseInt(part.replace(/[a-zA-Z^0-9]/g, ""));
        if (Math.random() > 0.5) {
            coeff += Math.floor(Math.random() * 3) - 1; // Randomly adjust coefficient
        }
        return `${coeff}${part.replace(/[0-9^a-zA-Z]/g, "")}`;
    });
    return answerParts.join(" + ").replace(/\+\s-\s/g, "- ");
}

// Start the quiz
generateQuestion();
