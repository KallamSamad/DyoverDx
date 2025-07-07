let question=[]
let questIndex=0
let score =0

function algorithm (){
    let a = Math.floor((Math.random()*2)+2)
    let b = Math.floor((Math.random()*2)+2)
    let y = Math.floor((Math.random()*2)+2)
    let z = Math.floor((Math.random()*2)+2)
    let quest= `\((${a}x+${y})(${b}x+${z})\)`
    let ans = `\(${a*b}x^2+${(a*z)+(b*y)}x+${y*z}`\)
    let input=getElementById("input").value
    if (input ==ans){
        score++
    else{
        let corAns=getElementById("output").innerHtml=`Incorrect - the answer is ${ans}`
    }
    let score =getElementById("score").innerHtml 
}
algorithm()
if (question=questionIndex){
    


