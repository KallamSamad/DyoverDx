let score =0;
let question=[];
let letter =["x","y","z"];
symbol=["+","-"]
 function sum(a,b,c,op,letter1,letter2){
     switch (op) {
         case "+": return ((a*b)+letter1)+((a*c)+letter2);
         case "-": return ((a*b)+letter1)-((a*c)+letter2);
     }
 }
for (let i=0; i<20;i++) {
 question.push(i+1);
}

 for (x in question){
    let p= Math.floor(Math.random() * 10 + 1);
    let q = Math.floor(Math.random() * 10 + 1);
    let r = Math.floor(Math.random() * 10 + 1);
    let letter1 = letter[Math.floor(Math.random() * letter.length)];
    let letter2 = letter[Math.floor(Math.random() * letter.length)];
    let sym1 = symbol[Math.floor(Math.random() * symbol.length)];

    let ans=sum(p,q,r,sym1,letter)
    let ask=console.log(prompt("Compute: " + p+"("+q+letter1+sym1+r+")")) 
    if (ask ==ans){
     console.log("correct")
    }
    else {
     console.log("incorrect, the asnwer was " + ans)
    }
    } 
    
