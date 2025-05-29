(function () {
  let score4 = 0;
  let question4 = Array.from({ length: 20 }, (_, i) => i + 1);
  let letters = ["x", "y", "z"];
  let symbols = ["+", "-"];
  let currentIndex4 = 0;
  let currentData4 = {};

  function expandType2(letter, c, op) {
    let sign = op === "+" ? "+" : "-";
    return `${letter}^2${sign}${c}${letter}`;
  }

  function showQuestion4() {
    let letter = letters[Math.floor(Math.random() * letters.length)];
    let op = symbols[Math.floor(Math.random() * symbols.length)];

    // Generate a random integer from -10 to 10 excluding 0
    let c;
    do {
      c = Math.floor(Math.random() * 21) - 10; // -10 to +10
    } while (c === 0);

    let display = `${letter}(${letter}${op}${c})`;

    // Normalize the operation sign for the answer
    let actualOp, absC;
    if (op === '+') {
      if (c < 0) {
        actualOp = '-';
        absC = Math.abs(c);
      } else {
        actualOp = '+';
        absC = c;
      }
    } else { // op === '-'
      if (c < 0) {
        actualOp = '+';
        absC = Math.abs(c);
      } else {
        actualOp = '-';
        absC = c;
      }
    }

    let answer = expandType2(letter, absC, actualOp).replace(/\s+/g, '');

    currentData4 = { ans: answer };

    document.getElementById("question4").innerHTML = `Expand: \\(${display}\\)`;

    document.getElementById("userAnswer4").value = "";
    document.getElementById("result4").innerText = "";

    MathJax.typesetPromise()
      .catch((err) => console.error('MathJax typeset failed:', err));
  }

  function checkAnswer4() {
    let userAnswer = document.getElementById("userAnswer4").value.trim().replace(/\s+/g, '');

    if (userAnswer === currentData4.ans) {
      document.getElementById("result4").innerText = "Correct!";
      score4++;
    } else {
      document.getElementById("result4").innerText = `Incorrect, the answer was ${currentData4.ans}`;
    }

    document.getElementById("score4").innerText = `Score: ${score4}`;

    currentIndex4++;

    if (currentIndex4 < question4.length) {
      showQuestion4();
    } else {
      let percent = (score4 / question4.length) * 100;
      document.getElementById("score4").innerText =
        `Final Score: ${score4} / ${question4.length} (${percent.toFixed(1)}%)`;

      document.getElementById("question4").innerText =
        percent >= 70 ? "Aced it!" : percent > 50 ? "You're getting there!" : "Try again";

      document.getElementById("result4").innerText = "Quiz complete! Well done.";
      document.getElementById("submitBtn4").disabled = true;
      document.getElementById("userAnswer4").value = "";
    }
  }

  function restartQuiz4() {
    score4 = 0;
    currentIndex4 = 0;
    document.getElementById("submitBtn4").disabled = false;
    document.getElementById("score4").innerText = `Score: ${score4}`;
    showQuestion4();
    document.getElementById("result4").innerText = "";
    document.getElementById("userAnswer4").value = "";
  }

  document.getElementById("submitBtn4").onclick = checkAnswer4;
  document.getElementById("restartBtn4").onclick = restartQuiz4;
  document.getElementById("userAnswer4").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer4();
    }
  });

  showQuestion4();
})();
