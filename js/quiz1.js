 
(() => {
    let score = 0;
    let currentQuestionIndex = 0;
    let symbols = ["×", "-", "+"];

    function evaluate(n1, n2, op) {
        switch (op) {
            case "+": return `${n1 + n2}x`;
            case "-": return `${n1 - n2}x`;
            case "×": return `${n1 * n2}x²`;
            default: return "0x";
        }
    }

    function showQuestion() {
        const output = document.getElementById("output1");
        const answersDiv = document.getElementById("answers1");
        answersDiv.innerHTML = "";

        if (currentQuestionIndex >= questions.length) {
            let percentage = (score / questions.length) * 100;
            output.innerHTML = `<p>You scored ${score}/20 (${percentage}%)</p>` +
                (percentage >= 75
                    ? "<p>Well done, you've aced this topic.</p>"
                    : percentage > 50
                        ? "<p>You're getting there. Keep practicing!</p>"
                        : "<p>Try again — practice makes perfect.</p>");

            const redoBtn = document.createElement("button");
            redoBtn.textContent = "Redo Quiz";
            redoBtn.className = "answer-btn";
            redoBtn.onclick = () => {
                score = 0;
                currentQuestionIndex = 0;
                showQuestion();
            };
            answersDiv.appendChild(redoBtn);
            return;
        }

        let n1 = Math.floor(Math.random() * 10 + 1);
        let n2 = Math.floor(Math.random() * 10 + 1);
        let op = symbols[Math.floor(Math.random() * symbols.length)];
        let correctAnswer = evaluate(n1, n2, op);

        const n1Str = `${n1}x`;
        const n2Str = `${n2}x`;
        output.innerHTML = `<p>Question ${questions[currentQuestionIndex]}: ${n1Str} ${op} ${n2Str}</p>`;

        let answers = [correctAnswer];
        while (answers.length < 4) {
            let fakeNum = eval(correctAnswer.replace(/[^\d-]/g, '')) + Math.floor(Math.random() * 11 - 5);
            let fakeAnswer = (op === "×") ? `${fakeNum}x²` : `${fakeNum}x`;
            if (!answers.includes(fakeAnswer)) answers.push(fakeAnswer);
        }

        answers.sort(() => Math.random() - 0.5);

        answers.forEach(answer => {
            const btn = document.createElement("button");
            btn.textContent = answer;
            btn.className = "answer-btn";
            btn.onclick = () => {
                output.innerHTML += answer === correctAnswer
                    ? "<p>Correct!</p>"
                    : `<p>Incorrect. Correct answer was ${correctAnswer}.</p>`;
                currentQuestionIndex++;
                setTimeout(showQuestion, 1000);
            };
            answersDiv.appendChild(btn);
        });
    }

    showQuestion();
})();
