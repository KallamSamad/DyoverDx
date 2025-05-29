(function () {
  let score2 = 0;
  let question2 = Array.from({ length: 20 }, (_, i) => i + 1);
  let letter = ["x", "y", "z"];
  let symbol = ["+", "-"];
  let currentIndex2 = 0;
  let currentData2 = {};

  function sum2(a, b, c, op, letter1) {
    let first = a * b;
    let second = a * c;
    return `${first}${letter1}${op}${Math.abs(second)}${letter1}`;
  }

  function showQuestion2() {
    let p = Math.floor(Math.random() * 21) - 10;
    let q = Math.floor(Math.random() * 21) - 10;
    let r = Math.floor(Math.random() * 21) - 10;
    let letter1 = letter[Math.floor(Math.random() * letter.length)];
    let sym1 = symbol[Math.floor(Math.random() * symbol.length)];

    currentData2 = {
      p, q, r, letter1, sym1,
      ans: sum2(p, q, r, sym1, letter1)
    };

    document.getElementById("question2").innerText =
      `Expand: ${p}(${q}${letter1}${sym1}${r})`;
    document.getElementById("userAnswer2").value = "";
    document.getElementById("result2").innerText = "";
  }

  function checkAnswer2() {
    let ask = document.getElementById("userAnswer2").value.trim();
    if (ask === currentData2.ans) {
      document.getElementById("result2").innerText = "Correct!";
      score2++;
    } else {
      document.getElementById("result2").innerText =
        `Incorrect, the answer was ${currentData2.ans}`;
    }

    document.getElementById("score2").innerText = `Score: ${score2}`;
    currentIndex2++;

    if (currentIndex2 < question2.length) {
      showQuestion2();
    } else {
      let percent = (score2 / question2.length) * 100;
      document.getElementById("score2").innerText =
        `Final Score: ${score2} / ${question2.length} (${percent.toFixed(1)}%)`;

      document.getElementById("question2").innerText =
        percent >= 70 ? "Aced it!" : percent > 50 ? "You're getting there!" : "Try again";

      document.getElementById("result2").innerText = "Quiz complete! Well done.";
      document.getElementById("submitBtn2").disabled = true;
      document.getElementById("userAnswer2").value = "";
    }
  }

  function restartQuiz2() {
    score2 = 0;
    currentIndex2 = 0;
    document.getElementById("submitBtn2").disabled = false;
    document.getElementById("score2").innerText = `Score: ${score2}`;
    showQuestion2();
    document.getElementById("result2").innerText = "";
    document.getElementById("userAnswer2").value = "";
  }

  document.getElementById("submitBtn2").onclick = checkAnswer2;
  document.getElementById("restartBtn2").onclick = restartQuiz2;
  document.getElementById("userAnswer2").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer2();
    }
  });

  showQuestion2();
})();
