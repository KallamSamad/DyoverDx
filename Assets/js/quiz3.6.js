(function () {
  let score6 = 0;
  let question6 = Array.from({ length: 20 }, (_, i) => i + 1);
  let letters = ["x", "y", "z"];
  let symbols = ["+", "-"];
  let currentIndex6 = 0;
  let currentData6 = {};

  // Helper: generate random integer from min to max inclusive
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateBracket(letter) {
    let terms = [];
    let totalTerms = randInt(2, 3); // 2 or 3 terms

    for (let i = 0; i < totalTerms; i++) {
      let type = Math.random() < 0.5 ? "var" : "num";
      let sign = symbols[Math.floor(Math.random() * symbols.length)];
      let coeff = randInt(1, 9);

      if (type === "var") {
        // e.g. +3x or -1x (omit 1)
        let coeffStr = (coeff === 1) ? "" : coeff;
        terms.push(`${sign}${coeffStr}${letter}`);
      } else {
        // e.g. +5 or -2
        terms.push(`${sign}${coeff}`);
      }
    }

    // Remove leading + from first term
    let cleanTerms = terms.map((t, i) => i === 0 ? t.replace(/^\+/, '') : t);
    return cleanTerms.join(' ');
  }

  function simplifyAndExpand(letter, bracket, frontCoeff) {
    // Parse terms in bracket
    let terms = bracket.split(/(?=[+-])/).map(t => t.trim());

    let varCoeff = 0;
    let numTotal = 0;

    terms.forEach(term => {
      if (term.includes(letter)) {
        // Extract coefficient before letter
        let coeffStr = term.replace(letter, '').replace(/\s+/g, '');
        if (coeffStr === '+' || coeffStr === '') coeffStr = '1';
        else if (coeffStr === '-') coeffStr = '-1';
        varCoeff += parseInt(coeffStr);
      } else {
        numTotal += parseInt(term);
      }
    });

    // Expression:  a*letter * ( ... ) + a*letter * ( ... )
    // = 2 * a * varCoeff * letter^2 + 2 * a * numTotal * letter

    let linearCoeff = 2 * frontCoeff * varCoeff;
    let constantCoeff = 2 * frontCoeff * numTotal;

    let result = `${linearCoeff}${letter}^2`;
    if (constantCoeff !== 0) {
      result += (constantCoeff > 0 ? `+${constantCoeff}${letter}` : `${constantCoeff}${letter}`);
    }

    return result;
  }

  function showQuestion6() {
    let letter = letters[Math.floor(Math.random() * letters.length)];

    // Random coefficient in front: a
    let frontCoeff = randInt(1, 9);
    let frontStr = (frontCoeff === 1) ? `${letter}` : `${frontCoeff}${letter}`;

    let bracket = generateBracket(letter);
    let expression = `${frontStr}(${bracket}) + ${frontStr}(${bracket})`;
    let answer = simplifyAndExpand(letter, bracket, frontCoeff);

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
