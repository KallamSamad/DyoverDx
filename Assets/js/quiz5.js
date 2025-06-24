const squares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
const questionNumber = 20;
let questionIndex = 0;
let score = 0;

let b = 0;
let c = 0;

 function disc() {
    let valid = false;
    while (!valid) {
        b = Math.floor(Math.random() * 150);
        c = Math.floor(Math.random() * 150);
        const discriminant = b * b - 4 * c;
        if (squares.includes(discriminant)) {
            valid = true;
        }
    }
}

 function factor() {
    let factors = [];
    for (let i = 1; i <= c; i++) {
        if (c % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

 
function main() {
    disc();
    let factors = factor();

 
    let x = factors[0] || 1;
    let y = factors[1] || 1;

 
    document.getElementById("question").innerHTML = `Factorise: x² + ${b}x + ${c}`;
 
    const userAnswer = document.getElementById("input").value.trim();

 
    if (userAnswer === `(x + ${x})(x + ${y})` || userAnswer === `(x + ${y})(x + ${x})`) {
        score++;
        questionIndex++;
        alert("Correct!");
    } else {
        questionIndex++;
        alert("Try again!");
    }

    if (questionIndex >= questionNumber) {
        document.getElementById("question").innerHTML = `Quiz finished! Your score is: ${score} out of ${questionNumber}`;
    }
}
 
main();
