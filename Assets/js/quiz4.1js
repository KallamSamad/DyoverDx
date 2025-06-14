let score = 0;
let currentQuestion = 0;
const totalQuestions = 20;
const symbols = ["+", "-"];
let currentX, currentY, currentOpp;

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function getCorrectAnswer(x, y, opp) {
  const z = gcd(x, y);
  const sign = (opp === "+") ? "+" : "-";

  if (z === 1) {
    // gcd is 1, no factorisation
    return `${x}x${sign}${y}`;
  } else {
    const a = x / z;
    const b = y / z;
    const insideX = (a === 1) ? "x" : `${a}x`;
    return `${z}(${insideX}${sign}${b})`;
  }
}

function generateFactorisableNumbers() {
  const commonFactor = Math.floor(Math.random() * 5) + 2; // Common factor between 2 and 6
  const a = (Math.floor(Math.random() * 5) + 1) * commonFactor;
  const b = (Math.floor(Math.random() * 5) + 1) * commonFactor;
  return [a, b];
}

function generateQuestion() {
  // 70% chance of generating factorisable question
  const isFactorisable = Math.random() < 0.7;

  if (isFactorisable) {
    [currentX, currentY] = generateFactorisableNumbers();
  } else {
    currentX = Math.floor(Math.random() * 10) + 1;
    currentY = Math.floor(Math.random() * 10) + 1;
  }

  currentOpp = symbols[Math.floor(Math.random() * symbols.length)];
}

function showQuestion() {
  if (currentQuestion >= totalQuestions) {
    endQuiz();
    return;
  }

  generateQuestion();
  const z = gcd(currentX, currentY);
  const prefix = (z === 1) ? "Simplify" : "Factorise";
  const ask = `${prefix} \\(${currentX}x ${currentOpp} ${currentY}\\)`;

  document.getElementById("question").innerHTML = ask;

  if (window.MathJax) {
    MathJax.typesetPromise();
  }

  document.getElementById("input").value = "";
  document.getElementById("output").innerText = "";
  document.getElementById("input").focus();
}

function checkAnswer() {
  let userans = document.getElementById("input").value.trim();
  if (!userans) {
    document.getElementById("output").innerText = "Please enter an answer.";
    return;
  }

  let trueans = getCorrectAnswer(currentX, currentY, currentOpp);

  const cleanUserAns = userans.replace(/\s+/g, "");
  const cleanTrueAns = trueans.replace(/\s+/g, "");

  if (cleanUserAns === cleanTrueAns) {
    document.getElementById("output").innerText = "Correct!";
    score++;
  } else {
    document.getElementById("output").innerText = `Incorrect! Correct answer: ${trueans}`;
  }

  currentQuestion++;
  document.getElementById("score").innerText = `Score: ${score} / ${totalQuestions}`;

  setTimeout(showQuestion, 1500);
}

function endQuiz() {
  let percent = (score / totalQuestions) * 100;
  document.getElementById("question").innerText =
    percent >= 70 ? "Aced it!" : percent > 50 ? "You're getting there!" : "Try again";
  document.getElementById("output").innerText = "Quiz complete! Well done.";
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("redoBtn").style.display = "inline-block";
}

function redoQuiz() {
  score = 0;
  currentQuestion = 0;
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("redoBtn").style.display = "none";
  document.getElementById("score").innerText = `Score: 0 / ${totalQuestions}`;
  document.getElementById("output").innerText = "";
  showQuestion();
}

document.getElementById("submitBtn").addEventListener("click", checkAnswer);
document.getElementById("redoBtn").addEventListener("click", redoQuiz);

document.getElementById("input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (!document.getElementById("submitBtn").disabled) {
      checkAnswer();
    }
  }
});

// Start the quiz
showQuestion();
