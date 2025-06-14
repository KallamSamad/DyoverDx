
(() => {
  class FactorisationQuiz {
    constructor(suffix) {
      this.score = 0;
      this.currentQuestion = 0;
      this.totalQuestions = 20;
      this.suffix = suffix;

      this.symbols = ["+", "-"];
      this.elements = {
        question: document.getElementById(`question-${suffix}`),
        input: document.getElementById(`input-${suffix}`),
        submitBtn: document.getElementById(`submitBtn-${suffix}`),
        redoBtn: document.getElementById(`redoBtn-${suffix}`),
        output: document.getElementById(`output-${suffix}`),
        score: document.getElementById(`score-${suffix}`),
      };

      this.elements.submitBtn.addEventListener("click", () => this.checkAnswer());
      this.elements.redoBtn.addEventListener("click", () => this.redoQuiz());
      this.elements.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (!this.elements.submitBtn.disabled) this.checkAnswer();
        }
      });

      this.showQuestion();
    }

    gcd(a, b) {
      if (b === 0) return a;
      return this.gcd(b, a % b);
    }

    generateFactorisableNumbers() {
      const commonFactor = Math.floor(Math.random() * 5) + 2; // 2 to 6
      const a = (Math.floor(Math.random() * 5) + 1) * commonFactor;
      const b = (Math.floor(Math.random() * 5) + 1) * commonFactor;
      return [a, b];
    }

    generateQuestion() {
      const isFactorisable = Math.random() < 0.7;
      if (isFactorisable) {
        [this.currentX, this.currentY] = this.generateFactorisableNumbers();
      } else {
        this.currentX = Math.floor(Math.random() * 10) + 1;
        this.currentY = Math.floor(Math.random() * 10) + 1;
      }
      this.currentOpp = this.symbols[Math.floor(Math.random() * this.symbols.length)];
    }

    getCorrectAnswer(x, y, opp) {
      const z = this.gcd(x, y);
      const sign = (opp === "+") ? "+" : "-";

      if (z === 1) {
        return `${x}x${sign}${y}`;
      } else {
        const a = x / z;
        const b = y / z;
        const insideX = (a === 1) ? "x" : `${a}x`;
        return `${z}(${insideX}${sign}${b})`;
      }
    }

    showQuestion() {
      if (this.currentQuestion >= this.totalQuestions) {
        this.endQuiz();
        return;
      }
      this.generateQuestion();
      const z = this.gcd(this.currentX, this.currentY);
      const prefix = (z === 1) ? "Simplify" : "Factorise";
      const ask = `${prefix} (${this.currentX}x ${this.currentOpp} ${this.currentY})`;

      this.elements.question.innerText = ask;
      this.elements.input.value = "";
      this.elements.output.innerText = "";
      this.elements.input.focus();
    }

    checkAnswer() {
      let userans = this.elements.input.value.trim();
      if (!userans) {
        this.elements.output.innerText = "Please enter an answer.";
        return;
      }

      let trueans = this.getCorrectAnswer(this.currentX, this.currentY, this.currentOpp);

      const cleanUserAns = userans.replace(/\s+/g, "");
      const cleanTrueAns = trueans.replace(/\s+/g, "");

      if (cleanUserAns === cleanTrueAns) {
        this.elements.output.innerText = "Correct!";
        this.score++;
      } else {
        this.elements.output.innerText = `Incorrect! Correct answer: ${trueans}`;
      }

      this.currentQuestion++;
      this.elements.score.innerText = `Score: ${this.score} / ${this.totalQuestions}`;

      setTimeout(() => this.showQuestion(), 1500);
    }

    endQuiz() {
      let percent = (this.score / this.totalQuestions) * 100;
      this.elements.question.innerText =
        percent >= 70 ? "Aced it!" : percent > 50 ? "You're getting there!" : "Try again";
      this.elements.output.innerText = "Quiz complete! Well done.";
      this.elements.submitBtn.disabled = true;
      this.elements.redoBtn.style.display = "inline-block";
    }

    redoQuiz() {
      this.score = 0;
      this.currentQuestion = 0;
      this.elements.submitBtn.disabled = false;
      this.elements.redoBtn.style.display = "none";
      this.elements.score.innerText = `Score: 0 / ${this.totalQuestions}`;
      this.elements.output.innerText = "";
      this.showQuestion();
    }
  }

  // Instantiate two quizzes:
  const quiz1 = new FactorisationQuiz("quiz1");
  const quiz2 = new FactorisationQuiz("quiz2");
})();
