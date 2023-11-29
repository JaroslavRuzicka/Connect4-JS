let pageBody = document.querySelector(".boardContainer")
let testSquare = document.getElementsByClassName("square")
// let firstLine = document.querySelector(".line0").children
let columnCoordinates = {}


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
    Adding the event listener seems to be easier choice programing vise, but it feels like I am using way to much memory for nothing
    and the calculation that I want to do in the first step are propably done behind the scenes and I wont even have to think about then
    Since I have no concept of knowing whitch solutin is better performace wise, I have decided to go and do the coordinates one
    since that one seem more complicated on paper. 
    I didnt study no sience of them puters
    */
    window.addEventListener("mousedown", event =>{
        //console.log(event.clientX)
        findTheHoveredColumn(event.clientX)
    })

    calculateCoordinatesOfRows()
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

     
    //console.log("I selected stuff", e.target)
}

function calculateCoordinatesOfRows(){

    let firstLine = document.querySelector(".line0").children
    let  numOfElementsInFirstLine = firstLine.length
    for(let i = 0; i < numOfElementsInFirstLine; i++){
        let xLeftCoordinate = firstLine[i].getBoundingClientRect().left
        let xRightCoordinate = firstLine[i].getBoundingClientRect().right
        let columnName = firstLine[i].className.split(" ")[1]

        columnCoordinates[columnName] = {
            leftCoordinate: xLeftCoordinate,
            rightCoordinate: xRightCoordinate

        
        }
    }

}

//I still have to add functionality to this, right now it olny prints to the console log
function findTheHoveredColumn(xMouseCoordinate) {
    let numOfColumns = Object.keys(columnCoordinates).length
    let coordinateKeys = Object.keys(columnCoordinates)
    
    for (let i = 0; i < numOfColumns; i++){
        if (i == 0){
         if(xMouseCoordinate >= columnCoordinates[coordinateKeys[i]].leftCoordinate && xMouseCoordinate <= columnCoordinates[coordinateKeys[i]].rightCoordinate){
            console.log(`Match${i}`);
            return 0   
            
            }   
        }        


        if(xMouseCoordinate > columnCoordinates[coordinateKeys[i]].leftCoordinate && xMouseCoordinate <= columnCoordinates[coordinateKeys[i]].rightCoordinate){
            console.log(`Match${i}`);
            return 0   
            
        }

    }
    
    console.log("No match")
}


window.onload = main()



