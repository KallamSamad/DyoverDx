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

  document.getElementById("question1").innerText =
    `Expand: ${p}(${q}${letter1}${sym1}${r})`;
  document.getElementById("userAnswer1").value = "";
  document.getElementById("result1").innerText = "";
}

function checkAnswer() {
  let ask = document.getElementById("userAnswer1").value.trim();

  // Check if user answer matches expected answer (exact string match)
  if (ask === currentQuestionData.ans) {
    document.getElementById("result1").innerText = "Correct!";
    score++;
  } else {
    document.getElementById("result1").innerText =
      `Incorrect, the answer was ${currentQuestionData.ans}`;
  }

  // Update current score display
  document.getElementById("score1").innerText = `Score: ${score}`;

  currentQuestionIndex++;

  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    // Quiz ended - calculate percentage
    let percentage = (score / question.length) * 100;

    // Show final score and percentage
    document.getElementById("score1").innerText = `Final Score: ${score} / ${question.length} (${percentage.toFixed(1)}%)`;

    // Show motivational message
    if (percentage >= 70) {
      document.getElementById("question1").innerText = "Aced it!";
    } else if (percentage > 50) {
      document.getElementById("question1").innerText = "You're getting there!";
    } else {
      document.getElementById("question1").innerText = "Try again";
    }

    // Indicate quiz completion
    document.getElementById("result1").innerText = "Quiz complete! Well done.";

    // Disable submit button to prevent more answers
    document.getElementById("submitBtn1").disabled = true;

    // Clear user input
    document.getElementById("userAnswer1").value = "";
  }
}



function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("submitBtn1").disabled = false;
  document.getElementById("score1").innerText = `Score: ${score}`;
  showQuestion();
  document.getElementById("result1").innerText = "";
  document.getElementById("userAnswer1").value = "";
}

// Event listeners
document.getElementById("submitBtn1").onclick = checkAnswer;
document.getElementById("restartBtn1").onclick = restartQuiz;

// Allow Enter key to submit answer
document.getElementById("userAnswer1").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();  // Prevent form submission if inside a form
    checkAnswer();
  }
});

// Start first question
showQuestion();
