let score=0
let symbol=["+","-"]
let question=[]
let CurrentQuestion=[]

for (let i=0;i<21;i++){
  question.push(i)
         }
function gcd(a,b){
  if (b==0){
    return a}
  else{
    return gcd(b,a%b)
  }
}

function showQuestion(){
  let x=Math.floor(Math.random()*10)+1
  let y=Math.floor(Math.random()*10)+1
  let z=gcd(x,y)
  let opp = symbol[Math.floor(Math.random() * symbol.length)]; 
  let ask=`Factorise \\(${x}x${opp}${y}//)`
  document.getElementById("question").innerHTML=ask
  let userans=document.getElementById("input").value
  trueans=`${gcd(x,y)}(${x}x${opp}${y}`
  if (userans===trueans){
    document.getElementById("output").innerHTML="Correct"
    document.getElementById("score").innerText=`score:${score++}`
  }
  else{
    document.getElementById("output").innerHTML="Incorrect"
  document.getElementById("score").innerHTML=`score: ${score}`
  Currentquestion++;
    document.getElementById("score1").innerText = `Score: ${score1}`;
    currentIndex1++;

    if (Currentquestion< question.length) {
      showQuestion1();
    } else {
      let percent = (score1 / question1.length) * 100;
      document.getElementById("score1").innerText =
        `Final Score: ${score1} / ${question1.length} (${percent.toFixed(1)}%)`;

      document.getElementById("question1").innerText =
        percent >= 70 ? "Aced it!" : percent > 50 ? "You're getting there!" : "Try again";

      document.getElementById("output").innerText = "Quiz complete! Well done.";
      document.getElementById("submitBtn").disabled = true;
      document.getElementById("userAnswer").value = "";
    }
  }
