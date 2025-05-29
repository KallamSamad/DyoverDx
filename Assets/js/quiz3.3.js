(function () {
  let score3 = 0;
  let question3 = Array.from({ length: 20 }, (_, i) => i + 1);
  let letters = ["x", "y", "z"];
  let symbols = ["+", "-"];
  let currentIndex3 = 0;
  let currentData3 = {};

  // Function to generate the expanded form of letter * (letter op c)
  function expandType2(letter, c, op) {
    let sign = op === "+" ? "+" : "-";
    // Return something like: x^2 + 3x
    return `${letter}^2${sign}${c}${letter}`;
  }

  // Show one question with MathJax rendering
  function showQuestion3() {
    // Pick random letter, operator, and constant
    let letter = letters[Math.floor(Math.random() * letters.length)];
    let op = symbols[Math.floor(Math.random() * symbols.length)];
    let c = Math.floor(Math.random() * 9) + 1;

    // Expression to display (in LaTeX style)
    let display = `${letter}(${letter}${op}${c})`;

    // Calculate answer and store in currentData3 (remove spaces for comparison)
    let answer = expandType2(letter, c, op).replace(/\s+/g, '');

    currentData3 = { ans: answer };

    // Set the question text with LaTeX delimiters and proper HTML injection for MathJax
    document.getElementById("question3").innerHTML = `Expand: \\(${display}\\)`;

    // Clear input and result for new question
    document.getElementById("userAnswer3").value = "";
    document.getElementById("result3").innerText = "";

    // Typeset MathJax on updated content
    MathJax.typesetPromise()
      .catch((err) => console.error('MathJax typeset failed:', err));
  }

  // Check user's answer
  function checkAnswer3() {
    let userAnswer = document.getElementById("userAnswer3").value.trim().replace(/\s+/g, '');

    if (userAnswer === currentData3.ans) {
      document.getElementById("result3").innerText = "Correct!";
      score3++;
    } else {
      document.getElementById("result3").innerText = `Incorrect, the answer was ${currentData3.ans}`;
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

  // Restart quiz
  function restartQuiz3() {
    score3 = 0;
    currentIndex3 = 0;
    document.getElementById("submitBtn3").disabled = false;
    document.getElementById("score3").innerText = `Score: ${score3}`;
    showQuestion3();
    document.getElementById("result3").innerText = "";
    document.getElementById("userAnswer3").value = "";
  }

  // Hook up buttons and enter key
  document.getElementById("submitBtn3").onclick = checkAnswer3;
  document.getElementById("restartBtn3").onclick = restartQuiz3;
  document.getElementById("userAnswer3").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer3();
    }
  });

  // Start the quiz
  showQuestion3();
})();
