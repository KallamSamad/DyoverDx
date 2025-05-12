let score=0
let truth=false
questions=[]
answer=[]
let difficulty =0
symbols=["+","-","÷", "×"]
for (let i = 1; i < 21; i++) {
  questions.push(i);
}
function easy(){
    for(const [index, value] of questions.entries()){
        let number =Math.floor((Math.random() * 100)+1)
        const operation = Math.floor(Math.random() * symbols.length)
      ask=("Question " + value + ": " + number + "𝑥" + symbols[operation]+" " + number+"𝑦" )
      console.log(ask)
    }

              
