let score = 0;
let question = [];
let letter = ["x", "y", "z"];
let symbol = ["+", "-"];

function sum(a, b, c, op, letter1) {
  switch (op) {
    case "+": return (a * b) + letter1 + op + (a * c);
    case "-": return (a * b) + letter1 + op + (a * c);
  }
}

// Prepare 20 questions (just indexes)
for (let i = 0; i < 20; i++) {
  question.push(i + 1);
}

let currentQuestionIndex = 0;
let currentQuestionData = {};

function showQuestion() {
  let p = Math.floor(Math.random() * 10 + 1);
  let q = Math.floor(Math.random() * 10 + 1);
  let r = Math.floor(Math.random() * 10 + 1);
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

document.getElementById("submitBtn").onclick = function() {
  let ask = document.getElementById("userAnswer").value.trim();

  if (ask === currentQuestionData.ans) {
    document.getElementById("result").innerText = "Correct!";
    score++;
  } else {
    document.getElementById("result").innerText = `Incorrect, the answer was ${currentQuestionData.ans}`;
  }

  document.getElementById("score").innerText = `Score: ${score}`;

  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    document.getElementById("question").innerText = "Quiz finished!";
    document.getElementById("submitBtn").disabled = true;
  }
}

showQuestion();
</script>
