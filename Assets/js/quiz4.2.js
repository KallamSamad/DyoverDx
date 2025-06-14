(() => {
  class ThreeTermFactorisationQuiz {
    constructor() {
      this.score = 0;
      this.totalQuestions = 10;
      this.currentQuestion = 0;

      this.input = document.getElementById('userAnswer2');
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

    getUniqueVariables(count = 3) {
      const vars = ['x', 'y', 'z', 'xy', 'xz', 'yz', 'xyz'];
      const shuffled = vars.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    getRandomSign() {
      return Math.random() < 0.5 ? '+' : '-';
    }

    generateQuestion() {
      const baseFactor = Math.floor(Math.random() * 9) + 2;
      const coeffs = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10) + 1);
      const variables = this.getUniqueVariables(3);
      const signs = [ '+', this.getRandomSign(), this.getRandomSign() ];

      const terms = coeffs.map((c, i) => `${c * baseFactor}${variables[i]}`);
      const signedTerms = [
        terms[0],
        `${signs[1]} ${terms[1]}`,
        `${signs[2]} ${terms[2]}`
      ];

      const signedCoeffs = [
        `${coeffs[0]}${variables[0]}`,
        `${signs[1]} ${coeffs[1]}${variables[1]}`,
        `${signs[2]} ${coeffs[2]}${variables[2]}`
      ];

      return {
        baseFactor,
        questionStr: signedTerms.join(' '),
        correctAnswer: `${baseFactor}(${signedCoeffs.join(' ')})`
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
      const percentage = (this.score / this.totalQuestions) * 100;
      let feedback = '';

      if (percentage === 100) {
        feedback = "Perfect score! You’re an algebra wizard 🧠✨";
      } else if (percentage >= 80) {
        feedback = "Excellent job! You're nearly perfect 💯";
      } else if (percentage >= 60) {
        feedback = "Great effort! A little more practice and you'll ace it.";
      } else if (percentage >= 40) {
        feedback = "Not bad! Review the topic and try again.";
      } else {
        feedback = "Keep going! Algebra takes practice—you’ll get there. 📘";
      }

      this.questionEl.innerHTML = `
        Quiz complete!<br>
        Your final score: <strong>${this.score} / ${this.totalQuestions}</strong><br>
        <strong>${feedback}</strong>
      `;
      this.input.style.display = 'none';
      this.submitBtn.style.display = 'none';
      this.resultEl.textContent = '';
    }
  }

  new ThreeTermFactorisationQuiz();
})();
 
