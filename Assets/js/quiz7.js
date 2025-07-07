function algorithm (){
    let a = Math.floor((Math.random()*2)+2)
    let b = Math.floor((Math.random()*2)+2)
    let y = Math.floor((Math.random()*2)+2)
    let z = Math.floor((Math.random()*2)+2)
    let quest= `(${a}x+${y})(${b}x+${z})`
    let ans = `${a*b}x^2+${(a*z)+(b*y)}x+${y*z}`
    console.log(quest)
    console.log(ans)
}
algorithm()
