let square = [1,   4,   9,  16,  25,36,  49,  64,  81, 100,121, 144,]
let questionNumber=20
let questionIndex=0
let score=0
let x=1
let y=1
function disc(){
    let state=false
    while (state==false){
       let  b=Math.floor(Math.random()*150)
        let c=Math.floor(Math.random()*150)
        if (square.includes(b**2-(4*c))){
            state=true
            x=b
            y=c
            }
        }
    }
}

function finding(x,y){
    if (x+y==c){
            return {x: x, y: y}
    }
        if (x-y==c){

return {x: x, y: y}
    }
        if (-x+y==c){
            return {x: x, y: y}
    }
        if (-x-y==c){
            return {x: x, y: y}
    }

function factor(c){
    let factors=[]
    for (let x=1;x<c+1;x++){
        let a=c%x
        if (a ==0){
            b=c/x
            factors.push(x)
        }
    }
    return factors
    finding()
}
    
}
disc()
let c=y
let b=x
factor()

function main(){
    document.getElementById("question").innerHTML=`factorise: +x**2+${x}x+${y}`
    answer=document.getElementById("input").value
    if answer==
    if (questionNumber==questionIndex){
        document.getElementById("question").innerHTML=`Your score is:${score}`
    }
}
main()
