(function () {
  let score6 = 0;
  let question6 = Array.from({ length: 20 }, (_, i) => i + 1);
  let letters = ["x", "y", "z"];
  let symbols = ["+", "-"];
  let currentIndex6 = 0;
  let currentData6 = {};

  function generateBracket(letter) {
    let terms = [];
    let totalTerms = Math.floor(Math.random() * 2) + 2; // 2 or 3 terms

    for (let i = 0; i < totalTerms; i++) {
      let type = Math.random() < 0.5 ? "var" : "num";
      let sign = symbols[Math.floor(Math.random() * symbols.length)];

      if (type === "var") {
        terms.push(`${sign}6${letter}`);
      } else {
        terms.push(`${sign}6`);
      }
    }

    let cleanTerms = terms.map((t, i) => i === 0 ? t.replace(/^[+]/, '') : t);
    return cleanTerms.join(' ');
  }

  function simplifyAndExpand(letter, bracket) {
    let terms = bracket.split(/(?=[+-])/).map(t => t.trim());

    let varCoeff = 0;
    let numTotal = 0;

    terms.forEach(term => {
      if (term.includes(letter)) {
        varCoeff += parseInt(term.replace(letter, '').replace(/\s+/g, '')) || 6;
      } else {
        numTotal += parseInt(term) || 0;
      }
    });

    let a = 6;
    let linearCoeff = 2 * a * varCoeff;
    let constantCoeff = 2 * a * numTotal;

    let result = `${linearCoeff}${letter}^2`;
    if (constantCoeff !== 0) {
      result += constantCoeff > 0 ? `+${constantCoeff}${letter}` : `${constantCoeff}${letter}`;
    }

    return result;
  }

  function showQuestion6() {
    let letter = letters[Math.floor(Math.random() * letters.length)];

    let bracket = generateBracket(letter);
    let front = `6${letter}`;
    let expression = `${front}(${bracket}) + ${front}(${bracket})`;
    let answer = simplifyAndExpand(letter, bracket);

    currentData6 = { ans: answer.replace(/\s+/g, '') };

    document.getElementById("question6").innerHTML = `Expand and simplify: \\(${expression}\\)`;
    document.getElementById("userAnswer6").value = "";
    document.getElementById("result6").innerText = "";

    MathJax.typesetPromise().catch((err) => console.error('MathJax typeset failed:', err));
  }

  function checkAnswer6() {
    let userAnswer = document.getElementById("userAnswer6").value.trim().replace(/\s+/g, '');

    if (userAnswer === currentData6.ans) {
      document.getElementById("result6").innerText = "Correct!";
      score6++;
    } else {
      document.getElementById("result6").innerText = `Incorrect, the answer was ${currentData6.ans}`;
    }

    document.getElementById("score6").innerText = `Score: ${score6}`;
    currentIndex6++;

    if (currentIndex6 < question6.length) {
      showQuestion6();
    } else {
      let percent = (score6 / question6.length) * 100;
      document.getElementById("score6").innerText =
        `Final Score: ${score6} / ${question6.length} (${percent.toFixed(1)}%)`;

      document.getElementById("question6").innerText =
        percent >= 70 ? "Aced it!" : percent > 50 ? "You're getting there!" : "Try again";

      document.getElementById("result6").innerText = "Quiz complete! Well done.";
      document.getElementById("submitBtn6").disabled = true;
      document.getElementById("userAnswer6").value = "";
    }
  }

  function restartQuiz6() {
    score6 = 0;
    currentIndex6 = 0;
    document.getElementById("submitBtn6").disabled = false;
    document.getElementById("score6").innerText = `Score: ${score6}`;
    showQuestion6();
    document.getElementById("result6").innerText = "";
    document.getElementById("userAnswer6").value = "";
  }

  document.getElementById("submitBtn6").onclick = checkAnswer6;
  document.getElementById("restartBtn6").onclick = restartQuiz6;
  document.getElementById("userAnswer6").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer6();
    }
  });

  showQuestion6();
})();
