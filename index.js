let pageBody = document.querySelector(".boardContainer")
let boardStateObject = {}


function main(){

    createBoard()

    createACircle()
}



function createBoard(){
    // div.textContent = "here kitty kitty"
    
    for (let lineNumber = 0; lineNumber < 6; lineNumber++){
        let boardLine = document.createElement("div")
        boardLine.classList.add(`line${lineNumber}`)
        pageBody.appendChild(boardLine)
        
        for(let squareNumber = 0; squareNumber < 7; squareNumber++){
            let boardSquare = document.createElement("div")
            boardSquare.classList.add(`square`)
            boardSquare.classList.add(`square${squareNumber}`)
            
            let circleInsideSquare = document.createElement("div")
            circleInsideSquare.classList.add("circle")
            boardSquare.appendChild(circleInsideSquare)

            
            boardLine.appendChild(boardSquare)

        }
        
    }
}

function createACircle(){
    let circle = document.querySelector(".line0 .square0").getBoundingClientRect()

    let token = document.createElement ("div")
    token.classList.add("token")

    let tokenHeight = 100
    let topCoordinate = circle.top + circle.height/2 - tokenHeight/2
    console.log(topCoordinate);
    token.style.top = `${topCoordinate}px`
    
    let tokenWidth = 100
    //circle with is 75% of square container, so 7,5% margin on each side
    //The width has to be that much smaller to not overshoot the center
    let circleWidth = circle.width*0.965
    let leftCoordinate = circle.left + circleWidth/2 - tokenWidth/2
    console.log(leftCoordinate);
    token.style.left = `${leftCoordinate}px`
    
    pageBody.appendChild(token)
}


window.onload = main()



