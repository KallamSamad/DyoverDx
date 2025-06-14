(() => {
  class ThreeTermFactorisationQuiz {
    constructor() {
      this.score = 0;
      this.currentQuestion = 0;
      this.totalQuestions = 10;
      this.elements = {
        question: document.getElementById("question"),
        input: document.getElementById("input"),
        submitBtn: document.getElementById("submitBtn"),
        redoBtn: document.getElementById("redoBtn"),
        output: document.getElementById("output"),
        score: document.getElementById("score"),
      };

      this.elements.submitBtn.addEventListener("click", () => this.checkAnswer());
      this.elements.redoBtn.addEventListener("click", () => this.redoQuiz());
      this.elements.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (!this.elements.submitBtn.disabled) this.checkAnswer();
        }
      });

      this.symbols = ["+", "-"];
      this.showQuestion();
    }

    gcd(a, b) {
      if (b === 0) return a;
      return this.gcd(b, a % b);
    }

    gcd3(a, b, c) {
      return this.gcd(this.gcd(a, b), c);
    }

    generateQuestion() {
      // Generate common factor between 2 and 6
      this.commonFactor = Math.floor(Math.random() * 5) + 2;

      // Generate three random numbers multiplied by common factor
      this.a = (Math.floor(Math.random() * 5) + 1) * this.commonFactor;
      this.b = (Math.floor(Math.random() * 5) + 1) * this.commonFactor;
      this.c = (Math.floor(Math.random() * 5) + 1) * this.commonFactor;

      // Random signs for second and third terms
      this.signs = [this.symbols[Math.floor(Math.random() * this.symbols.length)],
                    this.symbols[Math.floor(Math.random() * this.symbols.length)]];

      // Build expression string
      this.expression = `${this.a}x ${this.signs[0]} ${this.b}x ${this.signs[1]} ${this.c}`;

      // Calculate simplified inside bracket after factorisation
      this.aSimple = this.a / this.commonFactor;
      this.bSimple = this.b / this.commonFactor;
      this.cSimple = this.c / this.commonFactor;
    }

    getCorrectAnswer() {
      // Format inside bracket string, handle sign display

      const formatTerm = (coeff, variable = "x") => {
        if (coeff === 1) return variable;
        else return `${coeff}${variable}`;
      };

      const signToSymbol = (sign) => sign === "+" ? "+" : "-";

      const bTerm = formatTerm(this.bSimple, "x");
      const cTerm = this.cSimple;

      // Compose inside bracket with signs
      let inside = formatTerm(this.aSimple, "x");
      inside += ` ${signToSymbol(this.signs[0])} ${bTerm}`;
      inside += ` ${signToSymbol(this.signs[1])} ${cTerm}`;

      return `${this.commonFactor}(${inside})`;
    }

    showQuestion() {
      if (this.currentQuestion >= this.totalQuestions) {
        this.endQuiz();
        return;
      }
      this.generateQuestion();
      this.elements.question.innerText = `Factorise: ${this.expression}`;
      this.elements.input.value = "";
      this.elements.output.innerText = "";
      this.elements.input.focus();
    }

    checkAnswer() {
      const userAns = this.elements.input.value.trim().replace(/\s+/g, "");
      if (!userAns) {
        this.elements.output.innerText = "Please enter an answer.";
        return;
      }

      const correctAns = this.getCorrectAnswer().replace(/\s+/g, "");

      if (userAns === correctAns) {
        this.elements.output.innerText = "Correct!";
        this.score++;
      } else {
        this.elements.output.innerText = `Incorrect! Correct answer: ${this.getCorrectAnswer()}`;
      }

      this.currentQuestion++;
      this.elements.score.innerText = `Score: ${this.score} / ${this.totalQuestions}`;

      setTimeout(() => this.showQuestion(), 1500);
    }

    endQuiz() {
      const percent = (this.score / this.totalQuestions) * 100;
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

  new ThreeTermFactorisationQuiz();
})();
