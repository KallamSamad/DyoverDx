let questionIndex = 0;
let questionLength = 20;
let score = 0;
let currentAns = "";

function showQuestion() {
    let a = Math.floor(Math.random() * 4) + 2;
    let b = Math.floor(Math.random() * 4) + 2;
    let y = Math.floor(Math.random() * 9) + 1;
    let z = Math.floor(Math.random() * 9) + 1;

    // Generate question expression
    document.getElementById("question").innerHTML = `\\((${a}x + ${y})(${b}x + ${z})\\)`;

    currentAns = `\\(${a * b}x^2 + ${(a * z) + (b * y)}x + ${y * z}\\)`;

    document.getElementById("input").value = "";
    document.getElementById("output").textContent = "";

    MathJax.typeset(); // Refresh MathJax rendering
}

function checkAnswer() {
    let input = document.getElementById("input").value.trim().replace(/\s+/g, "");
    let correct = currentAns.replace(/\\\(|\\\)/g, "").replace(/\s+/g, ""); // Remove \( \)

    if (input === correct) {
        score++;
        document.getElementById("output").textContent = "Correct!";
    } else {
        document.getElementById("output").innerHTML = `Incorrect – the answer is ${currentAns}`;
    }

    document.getElementById("score").textContent = `Score: ${score}`;
    questionIndex++;

    if (questionIndex >= questionLength) {
        document.getElementById("output").innerHTML += `<br>This is the end of the quiz. Final score: ${score}/${questionLength}`;
        document.getElementById("submitBtn").disabled = true;
    } else {
        showQuestion();
    }

    MathJax.typeset(); // Re-render output if needed
}

document.getElementById("submitBtn").addEventListener("click", checkAnswer);

showQuestion();  // show the first question
