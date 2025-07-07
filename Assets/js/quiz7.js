let questionIndex = 0;
let questionLength = 20;
let score = 0;
let currentAns = "";

function showQuestion() {
    let a = Math.floor(Math.random() * 4) + 2; // 2 to 5
    let b = Math.floor(Math.random() * 4) + 2;
    let y = Math.floor(Math.random() * 9) + 1; // 1 to 9
    let z = Math.floor(Math.random() * 9) + 1;

    document.getElementById("question").innerHTML = `\\((${a}x + ${y})(${b}x + ${z})\\)`;

    // Store correct answer (for input comparison)
    currentAns = `${a * b}x^2+${(a * z + b * y)}x+${y * z}`;

    document.getElementById("input").value = "";
    document.getElementById("output").innerHTML = "";

    MathJax.typeset();
}

function checkAnswer() {
    let input = document.getElementById("input").value
        .trim()
        .replace(/\s+/g, "")
        .replace(/\\\(|\\\)/g, "")
        .toLowerCase();

    let correct = currentAns.toLowerCase().replace(/\s+/g, "");

    if (input === correct) {
        score++;
        document.getElementById("output").innerHTML = `<span style="color: green;">Correct!</span>`;
    } else {
        document.getElementById("output").innerHTML = 
          `<span style="color: red;">Incorrect</span> – the correct answer is: \\(${currentAns}\\)`;
    }

    document.getElementById("score").textContent = `Score: ${score}`;
    questionIndex++;

    if (questionIndex >= questionLength) {
        document.getElementById("output").innerHTML += `<br><b>Quiz Complete!</b> Final Score: ${score}/${questionLength}`;
        document.getElementById("submitBtn").disabled = true;

        // Show restart button
        const restartBtn = document.createElement("button");
        restartBtn.id = "restartBtn";
        restartBtn.textContent = "Restart Quiz";
        restartBtn.style.marginTop = "10px";
        restartBtn.onclick = restartQuiz;
        document.body.appendChild(restartBtn);
    } else {
        setTimeout(showQuestion, 1200); // brief delay before next question
    }

    MathJax.typeset();
}

function restartQuiz() {
    score = 0;
    questionIndex = 0;
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("submitBtn").disabled = false;
    document.getElementById("output").innerHTML = "";
    document.getElementById("input").value = "";

    const btn = document.getElementById("restartBtn");
    if (btn) btn.remove(); // Remove restart button if present

    showQuestion();
}

document.getElementById("submitBtn").addEventListener("click", checkAnswer);

showQuestion();
