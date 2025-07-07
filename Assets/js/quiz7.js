let questionIndex = 0;
let questionLength = 20;
let score = 0;

function algorithm() {
    let a = Math.floor((Math.random() * 2) + 2);
    let b = Math.floor((Math.random() * 2) + 2);
    let y = Math.floor((Math.random() * 2) + 2);
    let z = Math.floor((Math.random() * 2) + 2);

    document.getElementById("question").textContent = `(${a}x+${y})(${b}x+${z})`;
    let ans = `${a * b}x^2+${(a * z) + (b * y)}x+${y * z}`;
    
    let input = document.getElementById("input").value.trim();

    if (input === ans) {
        score++;
        document.getElementById("output").textContent = "Correct!";
    } else {
        document.getElementById("output").textContent = `Incorrect - the answer is ${ans};
    }

    document.getElementById("score").textContent = `Score: ${score}`;
    questionIndex++;
    document.getElementById("input").value = ""; 
}

document.getElementById("submitBtn").addEventListener('click', () => {
    algorithm();
    if (questionIndex === questionLength) {
        document.getElementById("output").textContent = `This is the end of the quiz, your score is ${score}/${questionLength}`;
        document.getElementById("submitBtn").disabled = true;
    }
});

algorithm();
