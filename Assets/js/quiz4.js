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
  const g = gcd(x, y);
  const a = x / g;
  const b = y / g;
  const sign = (opp === "+") ? "+" : "-";
  return `${g}(x${sign}${b})`;
}

function showQuestion() {
  if (currentQuestion >= totalQuestions) {
    endQuiz();
    return;
  }

  currentX = Math.floor(Math.random() * 10) + 1;
  currentY = Math.floor(Math.random() * 10) + 1;
  currentOpp = symbols[Math.floor(Math.random() * symbols.length)];

  let ask = `Factorise \\(${currentX}x ${currentOpp} ${currentY}\\)`;
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

// Add Enter key submission
document.getElementById("input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (!document.getElementById("submitBtn").disabled) {
      checkAnswer();
    }
  }
});

// Start quiz on page load
showQuestion();
