(() => {
  let score = 0;
  const totalQuestions = 20;
  let currentQuestion = 0;

  const variables = ['x','y','z','a','b','c'];

  // Generate one random term, including x^2 or mixed terms
  function genTerm() {
    let c = Math.floor(Math.random()*11)-5;
    while (!c) c = Math.floor(Math.random()*11)-5;
    const type = Math.floor(Math.random()*3);
    if (type === 0) {
      const v = variables[Math.floor(Math.random()*variables.length)];
      return {c, v};
    }
    if (type === 1) {
      const v = variables[Math.floor(Math.random()*variables.length)];
      return {c, v: v + '^2'};
    }
    // mixed term
    let a = variables[Math.floor(Math.random()*variables.length)];
    let b = variables[Math.floor(Math.random()*variables.length)];
    while (a === b) b = variables[Math.floor(Math.random()*variables.length)];
    return {c, v: a + b};
  }

  // Simplify like terms
  function simplify(terms) {
    const M = {};
    terms.forEach(({c,v}) => M[v] = (M[v]||0) + c);
    return Object.entries(M)
      .filter(([,c]) => c!==0)
      .map(([v,c]) => (c===1?'':c===-1?'-':c) + v)
      .join(' + ')
      .replace(/\+\s-\s/g,'- ') || '0';
  }

  // Convert any "x^2" into "x<sup>2</sup>"
  function toHTML(expr) {
    return expr
      .split(' + ')
      .map(part => part.replace(/([+-]?\d*)([a-zA-Z]+)\^2/, (_,n,v) => {
        if (n==='+'||n==='') n = '';
        else if (n==='-') n = '-';
        return `${n}${v}<sup>2</sup>`;
      }))
      .join(' + ')
      .replace(/\+\s-\s/g,' - ');
  }

  function nextQuestion() {
    const out = document.getElementById('output2');
    const ans = document.getElementById('answers2');
    out.innerHTML = '';
    ans.innerHTML = '';

    if (currentQuestion >= totalQuestions) {
      const pct = Math.round(score/totalQuestions*100);
      out.innerHTML = `
        <h2>Quiz Finished!</h2>
        <p>Your score: ${score}/${totalQuestions} (${pct}%)</p>
        <p>${pct>=75? ' Aced it!' : pct>=50? ' Keep going!' :  Try again!'}</p>
      `;
      const btn = document.createElement('button');
      btn.textContent = 'Redo Quiz';
      btn.className = 'answer-btn';
      btn.onclick = () => {
        score = 0;
        currentQuestion = 0;
        nextQuestion();
      };
      ans.appendChild(btn);
      return;
    }

    // Build a random expression with 5–6 terms
    const terms = Array.from({length: Math.floor(Math.random()*2)+5}, genTerm);
    const rawExpr = terms.map(t => `${t.c}${t.v}`).join(' + ').replace(/\+\s-\s/g,'- ');
    const correct = simplify(terms);

    out.innerHTML = `
      <p>Q${currentQuestion+1}: Simplify the expression:<br>
      <strong>${toHTML(rawExpr)}</strong></p>
    `;

    // Generate 3 fake answers + the correct one
    const opts = new Set([correct]);
    const MAX_TRIES = 20;
    let tries = 0;
    while (opts.size < 4 && tries++ < MAX_TRIES) {
      let fake = correct.replace(/([+-]?\d+)/, m => {
        let n = parseInt(m,10) + (Math.floor(Math.random()*5)-2);
        return (n===0?1:n).toString();
      });
      opts.add(fake);
    }
    while (opts.size < 4) opts.add('0');

    // Shuffle and render
    Array.from(opts).sort(() => Math.random()-0.5)
      .forEach(opt => {
        const b = document.createElement('button');
        b.innerHTML = toHTML(opt);
        b.className = 'answer-btn';
        b.onclick = () => {
          if (opt === correct) {
            out.innerHTML += '<p>✅ Correct!</p>';
            score++;
          } else {
            out.innerHTML += `<p>❌ Incorrect. The correct answer was: ${toHTML(correct)}</p>`;
          }
          currentQuestion++;
          setTimeout(nextQuestion, 800);
        };
        ans.appendChild(b);
      });
  }

  // Kick off
  nextQuestion();
})();
