let score = 0;
let questions = [];
let answer = [];
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

function questionloop() {
    for (const [index, value] of questions.entries()) {
        let number1 = Math.floor((Math.random() * 10) + 1);
        let number2 = Math.floor((Math.random() * 10) + 1);
        const operation = Math.floor(Math.random() * symbols.length);
        let op = symbols[operation];
        let ask = `Question ${value}: ${number1} × ${op} ${number2}`;
        
        let solution = evaluate(number1, number2, op);
        let useranswer = prompt("Solution?");
        
        document.getElementById("output").innerHTML += `<p>${ask} Your answer: ${useranswer}</p>`;
        
        if (useranswer == solution + "x") {
            document.getElementById("output").innerHTML += "<p>Correct</p>";
            score = score + 1;
        } else {
            document.getElementById("output").innerHTML += "<p>Incorrect</p>";
        }
    }
}

questionloop();

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
