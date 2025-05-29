(function () {
  let score3 = 0;
  let question3 = Array.from({ length: 20 }, (_, i) => i + 1);
  let letters = ["x", "y", "z"];  // random letter each question
  let symbols = ["+", "-"];
  let currentIndex3 = 0;
  let currentData3 = {};

  // Calculate expansion of a(b*letter ± c)
  function sum3(a, b, c, op, letter1) {
    let firstCoef = a * b;
    let secondCoef = a * c;
    let secondSign = op === "+" ? "+" : "-";
    return `${firstCoef}${letter1}${secondSign}${Math.abs(secondCoef)}`;
  }

  function showQuestion3() {
    let p = Math.floor(Math.random() * 10) + 1; // outside multiplier
    let q = Math.floor(Math.random() * 10) + 1; // coeff of letter inside
    let r = Math.floor(Math.random() * 10) + 1; // constant inside
    let letter1 = letters[Math.floor(Math.random() * letters.length)];
    let sym1 = symbols[Math.floor(Math.random() * symbols.length)];

    currentData3 = {
      p, q, r, letter1, sym1,
      ans: sum3(p, q, r, sym1, letter1)
    };

    document.getElementById("question3").innerText =
      `Expand: ${p}(${q}${letter1}${sym1}${r})`;
    document.getElementById("userAnswer3").value = "";
    document.getElementById("result3").innerText = "";
  }

  function checkAnswer3() {
    let userAns = document.getElementById("userAnswer3").value.trim();
    // Normalize: remove spaces before comparing
    let normalizedUserAns = userAns.replace(/\s+/g, '');
    let normalizedCorrectAns = currentData3.ans.replace(/\s+/g, '');

    if (normalizedUserAns === normalizedCorrectAns) {
      document.getElementById("result3").innerText = "Correct!";
      score3++;
    } else {
      document.getElementById("result3").innerText =
        `Incorrect, the answer was ${currentData3.ans}`;
    }

    document.getElementById("score3").innerText = `Score: ${score3}`;
    currentIndex3++;

    if (currentIndex3 < question3.length) {
      showQuestion3();
    } else {
      let percent = (score3 / question3.length) * 100;
      document.getElementById("score3").innerText =
        `Final Score: ${score3} / ${question3.length} (${percent.toFixed(1)}%)`;

      document.getElementById("question3").innerText =
        percent >= 70 ? "Aced it!" : percent > 50 ? "You're getting there!" : "Try again";

      document.getElementById("result3").innerText = "Quiz complete! Well done.";
      document.getElementById("submitBtn3").disabled = true;
      document.getElementById("userAnswer3").value = "";
    }
  }

  function restartQuiz3() {
    score3 = 0;
    currentIndex3 = 0;
    document.getElementById("submitBtn3").disabled = false;
    document.getElementById("score3").innerText = `Score: ${score3}`;
    showQuestion3();
    document.getElementById("result3").innerText = "";
    document.getElementById("userAnswer3").value = "";
  }

  document.getElementById("submitBtn3").onclick = checkAnswer3;
  document.getElementById("restartBtn3").onclick = restartQuiz3;
  document.getElementById("userAnswer3").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer3();
    }
  });

  showQuestion3();
})();
