(() => {
  class MixedFactorisationQuiz {
    constructor() {
      this.score = 0;
      this.totalQuestions = 10;
      this.currentQuestion = 0;
      this.input = document.getElementById('userAnswer3');
      this.submitBtn = document.getElementById('submitBtn3');
      this.questionEl = document.getElementById('question3');
      this.scoreEl = document.getElementById('score3');
      this.resultEl = document.getElementById('result3');

      this.submitBtn.addEventListener('click', () => this.checkAnswer());
      this.input.addEventListener('keypress', e => {
        if (e.key === 'Enter') this.checkAnswer();
      });

      this.nextQuestion();
    }

    generateQuestion() {
      const isThreeTerm = Math.random() < 0.5;

      if (isThreeTerm) {
        // Three-term factorisation (e.g., 6x + 9x + 12x)
        const baseFactor = Math.floor(Math.random() * 6) + 2;
        const coeffs = Array.from({ length: 3 }, () => Math.floor(Math.random() * 5) + 1);
        const terms = coeffs.map(c => c * baseFactor);
        const signs = [ "+", Math.random() < 0.5 ? "+" : "-", Math.random() < 0.5 ? "+" : "-" ];

        const signedTerms = [
          `${terms[0]}x`,
          `${signs[1]} ${Math.abs(terms[1])}x`,
          `${signs[2]} ${Math.abs(terms[2])}x`
        ];

        const signedCoeffs = [
          `${coeffs[0]}`,
          `${signs[1]} ${Math.abs(coeffs[1])}`,
          `${signs[2]} ${Math.abs(coeffs[2])}`
        ];

        return {
          questionStr: signedTerms.join(' '),
          correctAnswer: `${baseFactor}x(${signedCoeffs.join(' ')})`
        };
      } else {
        // Two-term factorisation (e.g., 6x + 9)
        const factor = Math.floor(Math.random() * 10) + 2;
        const coeff1 = Math.floor(Math.random() * 9) + 1;
        const coeff2 = Math.floor(Math.random() * 9) + 1;
        const term1 = `${factor * coeff1}x`;
        const term2 = `${factor * coeff2}`;
        const sign = Math.random() < 0.5 ? '+' : '-';

        return {
          questionStr: `${term1} ${sign} ${Math.abs(term2)}`,
          correctAnswer: `${factor}(${coeff1}x ${sign} ${coeff2})`
        };
      }
    }

    nextQuestion() {
      if (this.currentQuestion >= this.totalQuestions) {
        this.showFinalScore();
        return;
      }

      this.currentQuestion++;
      this.resultEl.textContent = '';
      this.input.value = '';
      this.input.style.display = 'inline';
      this.submitBtn.style.display = 'inline';
      this.input.focus();

      this.currentQ = this.generateQuestion();
      this.questionEl.innerHTML = `Factorise: $${this.currentQ.questionStr}$`;
      this.scoreEl.textContent = `Score: ${this.score}`;
      MathJax.typesetPromise();
    }

    checkAnswer() {
      const userAnswer = this.input.value.trim().replace(/\s+/g, '');
      const correctAnswer = this.currentQ.correctAnswer.replace(/\s+/g, '');

      if (!userAnswer) {
        alert("Please enter an answer.");
        return;
      }

      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        this.resultEl.style.color = 'green';
        this.resultEl.textContent = 'Correct!';
        this.score++;
      } else {
        this.resultEl.style.color = 'red';
        this.resultEl.innerHTML = `Wrong! Correct answer: $${this.currentQ.correctAnswer}$`;
        MathJax.typesetPromise();
      }

      this.scoreEl.textContent = `Score: ${this.score}`;
      setTimeout(() => this.nextQuestion(), 1500);
    }

    showFinalScore() {
      this.questionEl.innerHTML = `Quiz complete! Your final score: ${this.score} / ${this.totalQuestions}`;
      this.input.style.display = 'none';
      this.submitBtn.style.display = 'none';
      this.resultEl.textContent = '';
    }
  }

  new MixedFactorisationQuiz();
})();
