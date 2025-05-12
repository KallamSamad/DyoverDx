// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
let score=0
let truth=false
questions=[]
answer=[]
symbols=["×","-","+"]
const operation = Math.floor(Math.random() * symbols.length);
for (let i = 1; i < 21; i++) {
  questions.push(i);
}
function evaluate(n1, n2, op) {
    switch(op) {
        case "+": return n1 + n2 ;
        case "-": return n1  -  n2 ;
        case "×": return n1  *  n2 ;
        ; 
    }
}
function questionloop(){
    for(const [index, value] of questions.entries()){
        let number1 =Math.floor((Math.random() * 10)+1);
        let number2=Math.floor((Math.random() * 10)+1);
        let op=symbols[operation]
        ask = `Question ${value}: ${number1}𝑥 ${op} ${number2}𝑥`
        console.log(ask)
        let solution=evaluate(number1,number2,op);
        let useranswer=prompt("solution?")
        if (useranswer==solution+ "x"){
             console.log("correct");
        }else{
            console.log("incorrect");
        }
        }
        
        
    }
    questionloop()
