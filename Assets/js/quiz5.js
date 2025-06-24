let square = [1,   4,   9,  16,  25,36,  49,  64,  81, 100,121, 144,]
let questionNumber=20
let questionIndex=0

function disc(){
    let state=false
    while (state==false){
       let  b=Math.floor(Math.random()*150)
        let c=Math.floor(Math.random()*150)
        if (square.includes(b**2-(4*c))){
            return{
                p1:b,
                p2:c
            }
        }
    }
}

function questions(){
    
