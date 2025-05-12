// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
let score=0
questions=[]
answer=[]
symbols=["×","-","+"]
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
       const operation = Math.floor(Math.random() * symbols.length);
        let op=symbols[operation]
        ask = `Question ${value}: ${number1}𝑥 ${op} ${number2}𝑥`
        console.log(ask)
        let solution=evaluate(number1,number2,op);
        let useranswer=prompt("solution?")
        if (useranswer==solution+ "x"){
             console.log("correct");
             score=score+1
        }else{
            console.log("incorrect");
        }
        }
        
        
    }
    questionloop()
percentage=(score/20)*100
finalscore=console.log("You scored " + score+ "/20" + " which is "+ percentage+"%")
if (percentage>=75){
    console.log("Well done, you've aced this topic.")
}
else{
        if(percentage>50){
            console.log("You're getting there...Try more times to master this topic")
        }
    else {
        if(percentage<50){
            console.log("Try again! Practice makes perfect.")
        }
    }
}
