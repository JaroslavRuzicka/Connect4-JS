let pageBody = document.querySelector(".boardContainer")
let testSquare = document.getElementsByClassName("square")

let boardStateObject = {}


function main(){
    
    createBoard()
    
    createACircle()
    // selectSquare() 
    pageBody.addEventListener("click", selectSquare)
    // window.addEventListener("mousemove", event =>{
    //     console.log(event.clientY)
    // })

    //When the event in anonymouse funtion and the event inside the function are not the same, event will be crossed over
    //that is because the event is deprecated, https://stackoverflow.com/questions/72069923/my-variable-is-crossed-out-in-visual-code
    //use this in the video


    //if I use coordinates to select everytime someone resizes window I will have to recalculate coordinates of my squares 
    /*If I use the event listener on every square, I will have to add a crap ton of eventlistener otherwise I wont be able to target specific square if
    I hit the border of the board.
    */
    window.addEventListener("mousedown", event =>{
        console.log(event.clientX)
    })
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

function selectSquare(e){
    // console.log(testSquare);

     
    console.log("I selected stuff", e.target)
}



window.onload = main()



