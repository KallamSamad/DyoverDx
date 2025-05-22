let score =0;
let question=[];
let letter =["x","y","z"];
symbol=["+","-"]
 function sum(a,b,op){
     switch (op) {
         case "+": return ((a*b)+(a*C));
         case "-": return ((a*b)-(a*C));
     }
 }
for (let i=0; i<20;i++) {
 question.push(i+1);
}

 for (x in question){
    let p= Math.floor(Math.random() * 10 + 1);
    let q = Math.floor(Math.random() * 10 + 1);
    let r = Math.floor(Math.random() * 10 + 1);
    let sym1 = letter[Math.floor(Math.random() * letter.length)];
    let sym2 = letter[Math.floor(Math.random() * letter.length)];

    let ans=sum(p,q)
     console.log("Compute: " + p + "("+ q+sym1+"+"+r+")");
    } 
    
