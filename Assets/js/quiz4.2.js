(() => {
  class ThreeTermFactorisationQuiz {
    constructor() {
      this.score = 0;
      this.totalQuestions = 10;
      this.currentQuestion = 0;
      this.input = document.getElementById('answer2');
      this.submitBtn = document.getElementById('submitBtn2');
      this.questionEl = document.getElementById('question2');
      this.scoreEl = document.getElementById('score2');
      this.resultEl = document.getElementById('result2');

      this.submitBtn.addEventListener('click', () => this.checkAnswer());
      this.input.addEventListener('keypress', e => {
        if (e.key === 'Enter') this.checkAnswer();
      });

      this.nextQuestion();
    }

    generateQuestion() {
      const baseFactor = Math.floor(Math.random() * 9) + 2;
      const coeffs = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
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
        baseFactor,
        questionStr: signedTerms.join(' '),
        correctAnswer: `${baseFactor}x(${signedCoeffs.join(' ')})`
      };
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

  new ThreeTermFactorisationQuiz();
})();
