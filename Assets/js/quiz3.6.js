(function () {
  let score6 = 0;
  const totalQuestions = 5;
  const letters = ["x", "y", "z"];
  const symbols = ["+", "-"];
  let currentIndex6 = 0;
  let currentAnswerSimplified = "";
  let currentAnswerExpanded = "";

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateBracket(letter) {
    const terms = [];
    const totalTerms = randInt(2, 3);

    for (let i = 0; i < totalTerms; i++) {
      const isVarTerm = Math.random() < 0.5;
      const sign = symbols[randInt(0, 1)];
      const coeff = randInt(1, 9);

      if (isVarTerm) {
        const coeffStr = coeff === 1 ? "" : coeff;
        terms.push(`${sign}${coeffStr}${letter}`);
      } else {
        terms.push(`${sign}${coeff}`);
      }
    }
    terms[0] = terms[0].replace(/^\+/, '');
    return terms.join(' ');
  }

  function parseTerms(expression, letter) {
    const terms = expression.split(/(?=[+-])/).map(t => t.trim());
    let varTerms = [];
    let constTerms = [];

    terms.forEach(term => {
      if (term.includes(letter)) {
        let coeffStr = term.replace(letter, '');
        if (coeffStr === '+' || coeffStr === '') coeffStr = '1';
        else if (coeffStr === '-') coeffStr = '-1';
        varTerms.push(parseInt(coeffStr));
      } else {
        constTerms.push(parseInt(term));
      }
    });

    return { varTerms, constTerms };
  }

  function simplifyAndExpand(letter, bracket, frontCoeff) {
    const { varTerms, constTerms } = parseTerms(bracket, letter);
    const varSum = varTerms.reduce((a, b) => a + b, 0);
    const constSum = constTerms.reduce((a, b) => a + b, 0);

    const linearCoeff = 2 * frontCoeff * varSum;
    const constantCoeff = 2 * frontCoeff * constSum;

    let result = `${linearCoeff}${letter}^2`;
    if (constantCoeff !== 0) {
      result += (constantCoeff > 0 ? `+${constantCoeff}${letter}` : `${constantCoeff}${letter}`);
    }
    return result;
  }

  function fullyExpand(letter, bracket, frontCoeff) {
    const { varTerms, constTerms } = parseTerms(bracket, letter);
    const factor = 2 * frontCoeff;

    const expandedVarTerms = varTerms.map(c => `${c * factor}${letter}^2`);
    const expandedConstTerms = constTerms.map(c => {
      const val = c * factor;
      return (val >= 0 ? `+${val}${letter}` : `${val}${letter}`);
    });

    const combined = [...expandedVarTerms, ...expandedConstTerms].join('');
    return combined.replace(/^\+/, '');
  }

  function normalizeExpression(expr, letter) {
    expr = expr.toLowerCase().replace(/\s+/g, '');
    const terms = expr.match(/[+-]?[^+-]+/g);
    if (!terms) return '';

    let var2 = 0;
    let var1 = 0;

    terms.forEach(term => {
      if (term.includes(`${letter}^2`)) {
        let coeff = term.replace(`${letter}^2`, '');
        if (coeff === '+' || coeff === '') coeff = '1';
        else if (coeff === '-') coeff = '-1';
        var2 += parseInt(coeff);
      } else if (term.includes(letter)) {
        let coeff = term.replace(letter, '');
        if (coeff === '+' || coeff === '') coeff = '1';
        else if (coeff === '-') coeff = '-1';
        var1 += parseInt(coeff);
      }
    });

    let result = '';
    if (var2 !== 0) result += `${var2}${letter}^2`;
    if (var1 !== 0) {
      if (var1 > 0 && result.length > 0) {
        result += `+${var1}${letter}`;
      } else {
        result += `${var1}${letter}`;
      }
    }
    return result;
  }

  function showQuestion6() {
    const letter = letters[randInt(0, letters.length - 1)];
    const frontCoeff = randInt(1, 9);
    const frontStr = frontCoeff === 1 ? `${letter}` : `${frontCoeff}${letter}`;

    const bracket = generateBracket(letter);
    const expression = `${frontStr}(${bracket}) + ${frontStr}(${bracket})`;

    currentAnswerSimplified = normalizeExpression(simplifyAndExpand(letter, bracket, frontCoeff), letter);
    currentAnswerExpanded = normalizeExpression(fullyExpand(letter, bracket, frontCoeff), letter);

    document.getElementById("question6").innerText = `\\(Expand and simplify: ${expression}\\)`; 
    document.getElementById("userAnswer6").value = "";
    document.getElementById("result6").innerText = "";
    MathJax.typesetPromise()
    .catch((err) => console.error('MathJax typeset failed:', err));
  }

  function checkAnswer6() {
    const letter = currentAnswerSimplified.match(/[xyz]/)[0];
    const userAnswerRaw = document.getElementById("userAnswer6").value.trim();
    const userAnswer = normalizeExpression(userAnswerRaw, letter);

    if (userAnswer === currentAnswerSimplified || userAnswer === currentAnswerExpanded) {
      document.getElementById("result6").innerText = "Correct!";
      score6++;
    } else {
      document.getElementById("result6").innerText = `Incorrect, the answer was ${currentAnswerSimplified}`;
    }

    document.getElementById("score6").innerText = `Score: ${score6}`;
    currentIndex6++;

    if (currentIndex6 < totalQuestions) {
      showQuestion6();
    } else {
      const percent = (score6 / totalQuestions) * 100;
      document.getElementById("score6").innerText =
        `Final Score: ${score6} / ${totalQuestions} (${percent.toFixed(1)}%)`;

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
