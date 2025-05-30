(function () {
  let score5 = 0;
  let question5 = Array.from({ length: 20 }, (_, i) => i + 1);
  let letters = ["x", "y", "z"];
  let symbols = ["+", "-"];
  let currentIndex5 = 0;
  let currentData5 = {};

  function expandWithCoefficients(letter, a, innerCoeff, c, op) {
    let sign = op === "+" ? 1 : -1;
    let effectiveC = sign * c;

    let quadCoeff = 2 * a * innerCoeff;
    let linearCoeff = 2 * a * effectiveC;

    let quadTerm = `${quadCoeff}${letter}^2`;
    let linearSign = linearCoeff >= 0 ? "+" : "-";
    let linearTerm = `${Math.abs(linearCoeff)}${letter}`;

    return `${quadTerm}${linearSign}${linearTerm}`;
  }

  function showQuestion5() {
    let letter = letters[Math.floor(Math.random() * letters.length)];
    let op = symbols[Math.floor(Math.random() * symbols.length)];

    let a = Math.floor(Math.random() * 3) + 1;          // 1 to 3
    let innerCoeff = Math.floor(Math.random() * 3) + 1; // 1 to 3
    let c = Math.floor(Math.random() * 4) + 1;          // 1 to 4

    let bracket = `${innerCoeff === 1 ? '' : innerCoeff}${letter}${op}${c}`;
    let front = `${a === 1 ? '' : a}${letter}`;

    let expression = `${front}(${bracket}) + ${front}(${bracket})`;
    let answer = expandWithCoefficients(letter, a, innerCoeff, c, op);

    currentData5 = { ans: answer.replace(/\s+/g, '') };

    document.getElementById("question5").innerHTML = `Expand and simplify: \\(${expression}\\)`;
    document.getElementById("userAnswer5").value = "";
    document.getElementById("result5").innerText = "";

    MathJax.typesetPromise().catch((err) => console.error('MathJax typeset failed:', err));
  }

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

  function restartQuiz5() {
    score5 = 0;
    currentIndex5 = 0;
    document.getElementById("submitBtn5").disabled = false;
    document.getElementById("score5").innerText = `Score: ${score5}`;
    showQuestion5();
    document.getElementById("result5").innerText = "";
    document.getElementById("userAnswer5").value = "";
  }

  document.getElementById("submitBtn5").onclick = checkAnswer5;
  document.getElementById("restartBtn5").onclick = restartQuiz5;
  document.getElementById("userAnswer5").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer5();
    }
  });

  showQuestion5();
})();
