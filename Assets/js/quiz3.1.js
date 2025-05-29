function showQuestion1() {
  let p = Math.floor(Math.random() * 10) + 1;
  let q = Math.floor(Math.random() * 10) + 1;
  let r = Math.floor(Math.random() * 10) + 1;
  let letter1 = letter[Math.floor(Math.random() * letter.length)];
  let sym1 = symbol[Math.floor(Math.random() * symbol.length)];

  currentData1 = {
    p, q, r, letter1, sym1,
    ans: sum1(p, q, r, sym1, letter1)
  };

  // Proper MathJax rendering
  let questionLatex = `Expand: \\(${p}(${q}${letter1}${sym1}${r})\\)`;
  document.getElementById("question1").innerHTML = questionLatex;

  document.getElementById("userAnswer1").value = "";
  document.getElementById("result1").innerText = "";

  // Tell MathJax to typeset the new expression
  MathJax.typeset();
}

  function checkAnswer1() {
    let ask = document.getElementById("userAnswer1").value.trim();
    if (ask === currentData1.ans) {
      document.getElementById("result1").innerText = "Correct!";
      score1++;
    } else {
      document.getElementById("result1").innerText =
        `Incorrect, the answer was ${currentData1.ans}`;
    }

    document.getElementById("score1").innerText = `Score: ${score1}`;
    currentIndex1++;

    if (currentIndex1 < question1.length) {
      showQuestion1();
    } else {
      let percent = (score1 / question1.length) * 100;
      document.getElementById("score1").innerText =
        `Final Score: ${score1} / ${question1.length} (${percent.toFixed(1)}%)`;

      document.getElementById("question1").innerText =
        percent >= 70 ? "Aced it!" : percent > 50 ? "You're getting there!" : "Try again";

      document.getElementById("result1").innerText = "Quiz complete! Well done.";
      document.getElementById("submitBtn1").disabled = true;
      document.getElementById("userAnswer1").value = "";
    }
  }

  function restartQuiz1() {
    score1 = 0;
    currentIndex1 = 0;
    document.getElementById("submitBtn1").disabled = false;
    document.getElementById("score1").innerText = `Score: ${score1}`;
    showQuestion1();
    document.getElementById("result1").innerText = "";
    document.getElementById("userAnswer1").value = "";
  }

  document.getElementById("submitBtn1").onclick = checkAnswer1;
  document.getElementById("restartBtn1").onclick = restartQuiz1;
  document.getElementById("userAnswer1").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer1();
    }
  });

  showQuestion1();
})();
