(() => {
    let score = 0;
    let totalQuestions = 20;
    let currentQuestion = 0;

    let variables = ['x', 'y', 'z', 'a', 'b', 'c'];

    function generateExpressionTerm() {
        let coeff = Math.floor(Math.random() * 11) - 5;
        while (coeff === 0) coeff = Math.floor(Math.random() * 11) - 5;

        let termType = Math.floor(Math.random() * 3);
        let term;

        if (termType === 0) {
            let varIdx = Math.floor(Math.random() * variables.length);
            term = { coeff, variable: variables[varIdx] };
        } else if (termType === 1) {
            let varIdx = Math.floor(Math.random() * variables.length);
            term = { coeff, variable: `${variables[varIdx]}^2` };  // Corrected: We now add the coefficient for x^2
        } else if (termType === 2) {
            let var1 = variables[Math.floor(Math.random() * variables.length)];
            let var2 = variables[Math.floor(Math.random() * variables.length)];
            while (var1 === var2) var2 = variables[Math.floor(Math.random() * variables.length)];
            term = { coeff, variable: `${var1}${var2}` };
        }

        return term;
    }

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

        return simplifiedExpression.length
            ? simplifiedExpression.join(" + ").replace(/\+\s-\s/g, "- ")
            : "0";
    }

    function formatExpression(terms) {
        return terms.map(term => {
            if (term.variable.includes("^2")) {
                // Use the <sup> tag to render the exponent in index form
                let variableWithoutCaret = term.variable.replace("^2", "");
                return term.coeff === 1 ? `${variableWithoutCaret}<sup>2</sup>` : `${term.coeff}${variableWithoutCaret}<sup>2</sup>`;
            } else {
                return `${term.coeff}${term.variable}`;
            }
        }).join(" + ").replace(/\+\s-\s/g, "- ");
    }

    function generateFakeAnswer(correctAnswer) {
        let answerParts = correctAnswer.split(" + ");
        return answerParts.map(part => {
            let match = part.match(/^([+-]?\d*)([a-zA-Z^]+)$/);
            if (!match) return part;
            let [, coeffStr, variable] = match;
            let coeff = parseInt(coeffStr || "1");
            coeff += Math.floor(Math.random() * 3) - 1;
            if (coeff === 0) coeff = 1;
            return `${coeff}${variable}`;
        }).join(" + ").replace(/\+\s-\s/g, "- ");
    }

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

            const redoBtn = document.createElement("button");
            redoBtn.textContent = "Redo Quiz";
            redoBtn.className = "answer-btn";
            redoBtn.onclick = () => {
                score = 0;
                currentQuestion = 0;
                generateQuestion();
            };
            answersDiv.appendChild(redoBtn);
            return;
        }

        let terms = [];
        let numTerms = Math.floor(Math.random() * 2) + 5;
        for (let i = 0; i < numTerms; i++) {
            terms.push(generateExpressionTerm());
        }

        let expression = formatExpression(terms);
        let correctAnswer = simplifyExpression(terms);

        output.innerHTML = `<p>Question ${currentQuestion + 1}: Simplify the expression:<br><strong>${expression}</strong></p>`;

        let answers = [correctAnswer];
        while (answers.length < 4) {
            let fake = generateFakeAnswer(correctAnswer);
            if (!answers.includes(fake)) answers.push(fake);
        }

        answers.sort(() => Math.random() - 0.5);

        answers.forEach(answer => {
            const btn = document.createElement("button");
            btn.textContent = answer;
            btn.className = "answer-btn";
            btn.onclick = () => {
                output.innerHTML += answer === correctAnswer
                    ? "<p>✅ Correct!</p>"
                    : `<p>❌ Incorrect. The correct answer was: ${correctAnswer}</p>`;
                score += (answer === correctAnswer) ? 1 : 0;  // Update score
                currentQuestion++; // Move to the next question
                generateQuestion(); // Generate next question immediately after answer
            };
            answersDiv.appendChild(btn);
        });
    }

    // Start Quiz
    generateQuestion();
})();
