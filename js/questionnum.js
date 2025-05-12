let score = 0;
let questions = [];
let symbols = ["×", "-", "+"];

for (let i = 1; i < 21; i++) {
    questions.push(i);
}

function evaluate(n1, n2, op) {
    switch (op) {
        case "+": return n1 + n2;
        case "-": return n1 - n2;
        case "×": return n1 * n2;
        default: return 0;
    }
}

let currentQuestionIndex = 0; // Track the current question

// Function to show a question and check the answer
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // All questions answered, show final score
        let percentage = (score / 20) * 100;
        document.getElementById("output").innerHTML += `<p>You scored ${score}/20 which is ${percentage}%</p>`;

        if (percentage >= 75) {
            document.getElementById("output").innerHTML += "<p>Well done, you've aced this topic.</p>";
        } else {
            if (percentage > 50) {
                document.getElementById("output").innerHTML += "<p>You're getting there... Try more times to master this topic.</p>";
            } else {
                document.getElementById("output").innerHTML += "<p>Try again! Practice makes perfect.</p>";
            }
        }
        return; // End the function if all questions are answered
    }

    // Display the next question
    let number1 = Math.floor((Math.random() * 10) + 1);
    let number2 = Math.floor((Math.random() * 10) + 1);
    const operation = Math.floor(Math.random() * symbols.length);
    let op = symbols[operation];
    let questionText = `Question ${questions[currentQuestionIndex]}: ${number1}x ${op} ${number2}x`;

    document.getElementById("output").innerHTML = `<p>${questionText}</p>`;
    
    // Enable the submit button for the current question
    document.getElementById("submit-answer").onclick = function() {
        let userAnswer = document.getElementById("user-answer").value;
        let correctAnswer = evaluate(number1, number2, op) + "x";

        if (userAnswer === correctAnswer) {
            document.getElementById("output").innerHTML += "<p>Correct</p>";
            score++;
        } else {
            document.getElementById("output").innerHTML += "<p>Incorrect</p>";
        }

        // Clear the input field and move to the next question
        document.getElementById("user-answer").value = "";
        currentQuestionIndex++;

        // Call showQuestion again to show the next question
        showQuestion();
    };
}

// Start the first question
showQuestion();
