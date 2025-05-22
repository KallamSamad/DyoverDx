let score =0;
let question=[];
let symbol = ["+","-","*"];
let letter =["x","y","z"];
for (let i=0; i<20;i++) {
 question.push(i+1);
 function sum(a,b,op){
     switch (op) {
         case "*": return (a*b);
         case "+": return (a*b);
         case "-": return (a*b);
 }
 for (x in question){
    let p= Math.floor(Math.random() * 10 + 1);
    let q = Math.floor(Math.random() * 10 + 1);
    let ans=sum(p,q)
     console.log("Compute: " + p +"+" + "("+ q+"x"+r+")");
    }
     console.log(question);
    } 
    
}
