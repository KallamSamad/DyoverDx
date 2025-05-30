(function () {
  let score5 = 0;
  let question5 = Array.from({ length: 20 }, (_, i) => i + 1);
  let letters = ["x", "y", "z"];
  let symbols = ["+", "-"];
  let currentIndex5 = 0;
  let currentData5 = {};

  // Function to generate the expanded form of letter * (letter op c) + letter * (letter op c)
  function expandType2(letter, c, op) {
    let value = op === "+" ? c : -c;
    let term1 = `2${letter}^2`;
    let term2 = Math.abs(value * 2);
    let sign = value >= 0 ? "+" : "-";

    return `${term1}${sign}${term2}${letter}`;
  }

  // Show one question with MathJax rendering
  function showQuestion5() {
    let letter = letters[Math.floor(Math.random() * letters.length)];
    let op = symbols[Math.floor(Math.random() * symbols.length)];
    let c = 4; // Replace 3 with 4 for the constant

    let expression = `${letter}(${letter}${op}${c}) + ${letter}(${letter}${op}${c})`;
    let answer = expandType2(letter, c, op).replace(/\s+/g, '');

    currentData5 = { ans: answer };

    document.getElementById("question5").innerHTML = `Expand and simplify: \\(${expression}\\)`;
    document.getElementById("userAnswer5").value = "";
    document.getElementById("result5").innerText = "";

    MathJax.typesetPromise()
      .catch((err) => console.error('MathJax typeset failed:', err));
  }

  // Check user's answer
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

  // Restart quiz
  function restartQuiz5() {
    score5 = 0;
    currentIndex5 = 0;
    document.getElementById("submitBtn5").disabled = false;
    document.getElementById("score5").innerText = `Score: ${score5}`;
    showQuestion5();
    document.getElementById("result5").innerText = "";
    document.getElementById("userAnswer5").value = "";
  }

  // Hook up buttons and Enter key
  document.getElementById("submitBtn5").onclick = checkAnswer5;
  document.getElementById("restartBtn5").onclick = restartQuiz5;
  document.getElementById("userAnswer5").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer5();
    }
  });

  // Start quiz
  showQuestion5();
})();
