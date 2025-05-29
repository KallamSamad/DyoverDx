let score = 0;
let question = [];
let letter = ["x", "y", "z"];
let symbol = ["+", "-"];

function sum(a, b, c, op, letter1) {
  switch (op) {
    case "+":
    case "-":
      return (a * b) + letter1 + op + (a * c);
  }
}


for (let i = 0; i < 20; i++) {
  question.push(i + 1);
}

let currentQuestionIndex = 0;
let currentQuestionData = {};

function showQuestion() {
  let p = Math.floor(Math.random() *10 )+10;
  let q = Math.floor(Math.random() * 10) +10 ;
  let r = Math.floor(Math.random() * 10 )+10 ;
  let letter1 = letter[Math.floor(Math.random() * letter.length)];
  let sym1 = symbol[Math.floor(Math.random() * symbol.length)];

  currentQuestionData = {
    p, q, r, letter1, sym1,
    ans: sum(p, q, r, sym1, letter1)
  };

  document.getElementById("question").innerText =
    `Compute: ${p}(${q}${letter1}${sym1}${r})`;
  document.getElementById("userAnswer").value = "";
  document.getElementById("result").innerText = "";
}

function checkAnswer() {
  let ask = document.getElementById("userAnswer").value.trim();

  // Check if user answer matches expected answer (exact string match)
  if (ask === currentQuestionData.ans) {
    document.getElementById("result").innerText = "Correct!";
    score++;
  } else {
    document.getElementById("result").innerText =
      `Incorrect, the answer was ${currentQuestionData.ans}`;
  }

  // Update current score display
  document.getElementById("score").innerText = `Score: ${score}`;

  currentQuestionIndex++;

  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    // Quiz ended - calculate percentage
    let percentage = (score / question.length) * 100;

    // Show final score and percentage
    document.getElementById("score").innerText = `Final Score: ${score} / ${question.length} (${percentage.toFixed(1)}%)`;

    // Show motivational message
    if (percentage >= 70) {
      document.getElementById("question").innerText = "Aced it!";
    } else if (percentage > 50) {
      document.getElementById("question").innerText = "You're getting there!";
    } else {
      document.getElementById("question").innerText = "Try again";
    }

    // Indicate quiz completion
    document.getElementById("result").innerText = "Quiz complete! Well done.";

    // Disable submit button to prevent more answers
    document.getElementById("submitBtn").disabled = true;

    // Clear user input
    document.getElementById("userAnswer").value = "";
  }
}



function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("score").innerText = `Score: ${score}`;
  showQuestion();
  document.getElementById("result").innerText = "";
  document.getElementById("userAnswer").value = "";
}

// Event listeners
document.getElementById("submitBtn").onclick = checkAnswer;
document.getElementById("restartBtn").onclick = restartQuiz;

// Allow Enter key to submit answer
document.getElementById("userAnswer").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();  // Prevent form submission if inside a form
    checkAnswer();
  }
});

// Start first question
showQuestion();
