(() => {
  let score = 0;
  const totalQuestions = 20;
  let currentQuestion = 0;
  const symbols = ["×", "-", "+"];

  // Generate a single term (including x^2)
  function genTerm() {
    let c = Math.floor(Math.random()*11)-5;
    while(!c) c = Math.floor(Math.random()*11)-5;
    const vars = ['x','y','z','a','b','c'];
    const type = Math.floor(Math.random()*3);
    if(type===0) return {c, v: vars[Math.floor(Math.random()*vars.length)]};
    if(type===1) return {c, v: vars[Math.floor(Math.random()*vars.length)] + "^2"};
    // mixed
    let a = vars[Math.floor(Math.random()*vars.length)],
        b = vars[Math.floor(Math.random()*vars.length)];
    while(a===b) b = vars[Math.floor(Math.random()*vars.length)];
    return {c, v: a+b};
  }

  // Simplify like terms
  function simplify(terms) {
    const M = {};
    terms.forEach(({c,v}) => M[v]=(M[v]||0)+c);
    return Object.entries(M)
      .filter(([v,c])=>c!==0)
      .map(([v,c])=> (c===1?"" : c===-1?"-":c) + v )
      .join(" + ")
      .replace(/\+\s-\s/g,"- ")
      || "0";
  }

  // Convert "x^2" to HTML "x<sup>2</sup>"
  function toHTML(expr) {
    return expr
      .split(" + ")
      .map(part => {
        return part.replace(/([+-]?\d*)([a-zA-Z]+)\^2/, (_, num, v) => {
          // num may be "" or "-"; default to 1
          if(num===""||num==="+") num=""; 
          else if(num==="-") num="-";
          return `${num}${v}<sup>2</sup>`;
        });
      })
      .join(" + ")
      .replace(/\+\s-\s/g, " - ");
  }

  function next() {
    const out = document.getElementById("output2");
    const ansDiv = document.getElementById("answers2");
    out.innerHTML = "";
    ansDiv.innerHTML = "";

    if(currentQuestion>=totalQuestions) {
      const pct = Math.round(score/totalQuestions*100);
      out.innerHTML = `<h2>Done!</h2>
        <p>You scored ${score}/${totalQuestions} (${pct}%)</p>
        ${pct>=75? "<p>🎉 Aced it!</p>" : pct>=50? "<p>Keep Going!</p>" : "<p>Try Again!</p>"}`;
      const btn = document.createElement("button");
      btn.textContent="Redo Quiz";
      btn.onclick=()=>{ score=0; currentQuestion=0; next(); };
      ansDiv.appendChild(btn);
      return;
    }

    // build question
    const terms = Array.from({length: Math.floor(Math.random()*2)+5}, genTerm);
    const expr = terms.map(t=>`${t.c}${t.v}`).join(" + ").replace(/\+\s-\s/g,"- ");
    const correct = simplify(terms);

    out.innerHTML = `<p>Q${currentQuestion+1}: Simplify:<br>
      <strong>${ toHTML(expr) }</strong></p>`;

    // build answers
    const opts = new Set([correct]);
    while(opts.size<4) {
      // tweak one coefficient
      let fake = correct.replace(/([+-]?\d*)([a-zA-Z]+)/g, (_,n,v)=>{
        let k=parseInt(n||"1") + (Math.floor(Math.random()*3)-1);
        if(k===0) k=1;
        return k+v;
      });
      opts.add(fake);
    }

    Array.from(opts).sort(()=>Math.random()-0.5)
      .forEach(opt=>{
        const b = document.createElement("button");
        b.innerHTML = toHTML(opt);
        b.onclick = () => {
          if(opt===correct){ out.innerHTML += "<p>✅ Correct!</p>"; score++; }
          else          { out.innerHTML += `<p>❌ Wrong, it was ${toHTML(correct)}</p>`; }
          currentQuestion++;
          setTimeout(next, 1000);
        };
        ansDiv.appendChild(b);
      });
  }

  // kick things off
  next();
})();
