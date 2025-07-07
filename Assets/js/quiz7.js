let question=[]
let questIndex=0
let questionLength=20
let score =0

function algorithm (){
    let a = Math.floor((Math.random()*2)+2)
    let b = Math.floor((Math.random()*2)+2)
    let y = Math.floor((Math.random()*2)+2)
    let z = Math.floor((Math.random()*2)+2)
    let quest=document.getElementById("question").innerHTML=`(${a}x+${y})(${b}x+${z})`
    let ans = `${a*b}x^2+${(a*z)+(b*y)}x+${y*z}`
    let input=document.getElementById("input").value
    if (input ==ans){
        score++
    }
    else{
        let corAns=document.getElementById("output").innerHTML=`Incorrect - the answer is ${ans}`
    }
    score =document.getElementById("score").innerHTML
    questionIndex++
}

algorithm()


if questionLength==questionIndex{
    let final=document.getElementById("output").innerHTML=`This is the end of the quiz, your score is ${score}/20`
