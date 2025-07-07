let questionIndex = 0;
let questionLength = 20;
let score = 0;
let currentAns = "";

function showQuestion() {
    let a = Math.floor(Math.random() * 2) + 2;
    let b = Math.floor(Math.random() * 2) + 2;
    let y = Math.floor(Math.random() * 2) + 2;
    let z = Math.floor(Math.random() * 2) + 2;
    document.getElementById("question").textContent = `(${a}x+${y})(${b}x+${z})`;
    currentAns = `${a * b}x^2+${(a * z) + (b * y)}x+${y * z}`;
    document.getElementById("input").value = "";  // clear input
    document.getElementById("output").textContent = "";
}

function checkAnswer() {
    let input = document.getElementById("input").value.trim().replace(/\s+/g, "");
    let correct = currentAns.replace(/\s+/g, "");

    if (input === correct) {
        score++;
        document.getElementById("output").textContent = "Correct!";
    } else {
        document.getElementById("output").textContent = `Incorrect - the answer is ${currentAns}`;
    }
    document.getElementById("score").textContent = `Score: ${score}`;

    questionIndex++;
    if (questionIndex >= questionLength) {
        document.getElementById("output").textContent += `\nThis is the end of the quiz, your score is ${score}/${questionLength}`;
        document.getElementById("submitBtn").disabled = true;
    } else {
        showQuestion();
    }
}

document.getElementById("submitBtn").addEventListener("click", checkAnswer);

showQuestion();  // show first question immediately
