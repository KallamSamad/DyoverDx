(function () {
  let score5 = 0;
  let question5 = Array.from({ length: 20 }, (_, i) => i + 1);
  let letters = ["x", "y", "z"];
  let symbols = ["+", "-"];
  let currentIndex5 = 0;
  let currentData5 = {};

  // Function to simplify expressions like x(x+a) + x(x+a)
  function expandAndSimplify(letter, c, op) {
    let sign = op === "+" ? 1 : -1;
    let linearCoeff = 2 * c * sign;
    let linearPart = `${Math.abs(linearCoeff)}${letter}`;
    let linearSign = linearCoeff >= 0 ? "+" : "-";

    return `2${letter}^2${linearSign}${linearPart}`;
  }

  // Show question
  function showQuestion5() {
    let letter = letters[Math.floor(Math.random() * letters.length)];
    let op = symbols[Math.floor(Math.random() * symbols.length)];
    let c = Math.floor(Math.random() * 4) + 2; // Random integer from 2 to 5

    let expression = `${letter}(${letter}${op}${c}) + ${letter}(${letter}${op}${c})`;
    let answer = expandAndSimplify(letter, c, op);

    currentData5 = { ans: answer.replace(/\s+/g, '') };

    document.getElementById("question5").innerHTML = `Expand and simplify: \\(${expression}\\)`;
    document.getElementById("userAnswer5").value = "";
    document.getElementById("result5").innerText = "";

    MathJax.typesetPromise().catch((err) => console.error('MathJax typeset failed:', err));
  }

  // Check answer
  function checkAnswer5() {
    let userAnswer = document.getElementById("userAnswer5").value.trim().replace(/\s+/g, '');

    if (userAnswer === currentData5.ans) {
      document.getElementById("result5").innerText = "Correct!";
      score5++;
    } else {
      document.getElementById("result5").innerText = `Incorrect, the answer was ${currentData5.ans}`;
    }

    document.getElementById("score5").innerText = `Score: ${score5}`;
    currentIndex5++;

    if (currentIndex5 < question5.length) {
      showQuestion5();
    } else {
      let percent = (score5 / question5.length) * 100;
      document.getElementById("score5").innerText =
        `Final Score: ${score5} / ${question5.length} (${percent.toFixed(1)}%)`;

      document.getElementById("question5").innerText =
        percent >= 70 ? "Aced it!" : percent > 50 ? "You're getting there!" : "Try again";

      document.getElementById("result5").innerText = "Quiz complete! Well done.";
      document.getElementById("submitBtn5").disabled = true;
      document.getElementById("userAnswer5").value = "";
    }
  }

  // Restart
  function restartQuiz5() {
    score5 = 0;
    currentIndex5 = 0;
    document.getElementById("submitBtn5").disabled = false;
    document.getElementById("score5").innerText = `Score: ${score5}`;
    showQuestion5();
    document.getElementById("result5").innerText = "";
    document.getElementById("userAnswer5").value = "";
  }

  // Event listeners
  document.getElementById("submitBtn5").onclick = checkAnswer5;
  document.getElementById("restartBtn5").onclick = restartQuiz5;
  document.getElementById("userAnswer5").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer5();
    }
  });

  // Start
  showQuestion5();
})();
