(function () {
  let score3 = 0;
  let question3 = Array.from({ length: 20 }, (_, i) => i + 1);
  let letters = ["x", "y", "z"];
  let symbols = ["+", "-"];
  let currentIndex3 = 0;
  let currentData3 = {};

  function expandType1(a, b, c, op, letter) {
    let first = a * b;
    let second = a * c;
    let sign = op === "+" ? "+" : "-";
    return `${first}${letter}${sign}${Math.abs(second)}`;
  }

  function expandType2(letter, c, op) {
    let sign = op === "+" ? "+" : "-";
    let secondCoef = op === "+" ? c : -c;
    return `${letter}^2${sign}${Math.abs(secondCoef)}${letter}`;
  }

  function showQuestion3() {
    let questionType = Math.random() < 0.5 ? "type1" : "type2"; // 50/50 chance
    let letter = letters[Math.floor(Math.random() * letters.length)];
    let op = symbols[Math.floor(Math.random() * symbols.length)];

    let display, answer;

      let c = Math.floor(Math.random() * 9) + 1;
      display = `${letter}(${letter}${op}${c})`;
      answer = expandType2(letter, c, op);
    }

    currentData3 = { ans: answer.replace(/\s+/g, '') };

    document.getElementById("question3").innerText = `Expand: ${display}`;
    document.getElementById("userAnswer3").value = "";
    document.getElementById("result3").innerText = "";
  }

  function checkAnswer3() {
    let userAns = document.getElementById("userAnswer3").value.trim().replace(/\s+/g, '');
    let correctAns = currentData3.ans;

    if (userAns === correctAns) {
      document.getElementById("result3").innerText = "Correct!";
      score3++;
    } else {
      document.getElementById("result3").innerText =
        `Incorrect, the answer was ${correctAns}`;
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
