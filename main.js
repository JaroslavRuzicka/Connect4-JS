let boardBox = document.querySelector(".boardContainer")
let testSquare = document.getElementsByClassName("square")
// let firstLine = document.querySelector(".line0").children
let columnCoordinates = {}

let playerTurn = 1

//How to check for draw,
//Upon reaching 10 squares left, start checking every square if it has possible connectinons. 
//if there is no square that has a connection left then the game is a draw

// the circles bug out when you resize windows after they are already placed




let boardStateObject = {
    column0: [0,0,0,0,0,0],
    column1: [0,0,0,0,0,0],
    column2: [0,0,0,0,0,0],
    column3: [0,0,0,0,0,0],
    column4: [0,0,0,0,0,0],
    column5: [0,0,0,0,0,0],
    column6: [0,0,0,0,0,0],
}


function main(){
    
    createBoard()
    


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

    calculateCoordinatesOfRows()
    window.addEventListener("resize", event => {
        calculateCoordinatesOfRows()
        // console.log(columnCoordinates);
    })

    window.addEventListener("mousedown", event =>{
        let columnNumber = findTheHoveredColumn(event.pageX)

        let checkLastColumn = checkIfColumnsAreFull(columnNumber)
        // let checkLastColumn = checkIfColumnsAreFull(columnNumber)

        if (columnNumber != null && checkLastColumn === false){
            createACircle(columnNumber)
            let rowNumber = changeTheBoardState(columnNumber)
            checkForWin(columnNumber, rowNumber)
            changeTurn()
        }

    })

}

function createBoard(){
    
    for (let lineNumber = 5; lineNumber >= 0; lineNumber--){
        let boardLine = document.createElement("div")
        boardLine.classList.add(`line${lineNumber}`)
        boardBox.appendChild(boardLine)
        
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

function createACircle(columnNumber){
    let circle = document.querySelector(`.line5 .square${columnNumber}`).getBoundingClientRect()

    let token = document.createElement ("div")
    token.classList.add("token")

    let tokenHeight = 100
    let topCoordinate = circle.top + circle.height/2 - tokenHeight/2
    // console.log(topCoordinate);
    token.style.top = `${topCoordinate}px`
    
    let tokenWidth = 100
    //circle with is 75% of square container, so 7,5% margin on each side
    //The width has to be that much smaller to not overshoot the center
    let circleWidth = circle.width*0.965
    let leftCoordinate = circle.left + circleWidth/2 - tokenWidth/2
    // console.log(leftCoordinate);
    token.style.left = `${leftCoordinate}px`

    if(playerTurn === 2){
        token.style.backgroundColor = `green`
    }
    
    boardBox.appendChild(token)
}

function calculateCoordinatesOfRows(){

    let firstLine = document.querySelector(".line5").children
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

function findTheHoveredColumn(xMouseCoordinate) {
    let numOfColumns = Object.keys(columnCoordinates).length
    let coordinateKeys = Object.keys(columnCoordinates)
    
    for (let i = 0; i < numOfColumns; i++){
        if (i === 0){
         if(xMouseCoordinate >= columnCoordinates[coordinateKeys[i]].leftCoordinate 
            && xMouseCoordinate <= columnCoordinates[coordinateKeys[i]].rightCoordinate){
            console.log(`Match${i}`);
            return i   
            
            }   
        }        

        if(xMouseCoordinate > columnCoordinates[coordinateKeys[i]].leftCoordinate 
            && xMouseCoordinate <= columnCoordinates[coordinateKeys[i]].rightCoordinate){
            console.log(`Match${i}`);
            return i   
            
        }

    }
    
    console.log("No match")
    return null
}

function changeTheBoardState(columnNumber){
    let numOfColumns = 6
    let changedSquareNumber = 0


    
    for(let i = 0; i < numOfColumns; i++){
        let squareState = boardStateObject[`column${columnNumber}`][i]

        if(squareState === 0 && playerTurn === 1){
            boardStateObject[`column${columnNumber}`][i] = 1
            changedSquareNumber = i
            break
        }else if(squareState === 0 && playerTurn === 2){
            boardStateObject[`column${columnNumber}`][i] = 2
            changedSquareNumber = i
            break
        }
    }

    
    moveTokenToCorrectRow(columnNumber, changedSquareNumber)
    return changedSquareNumber

    
}

function changeTurn(){
    if(playerTurn === 1){
        playerTurn = 2
    }else if(playerTurn === 2){
        playerTurn = 1
    } 
}

function checkIfColumnsAreFull(columnNumber){
    if(columnNumber === null){
        return false
    }
    
    if(boardStateObject[`column${columnNumber}`][5] !== 0){
        return true
    }else{
        return false
    }
}

function moveTokenToCorrectRow(columnNumber, rowNumber){
    let tokenList = document.querySelectorAll(".token")
    let token = tokenList[tokenList.length -1]

    let squareCoodinates = document.querySelector(`.line${rowNumber} .square${columnNumber}`).getBoundingClientRect().top + 10

    let topOfBoardBox = boardBox.getBoundingClientRect().top

    function moveCircle (topCoordinates){
        if (topCoordinates === Math.trunc(squareCoodinates/10)*10){
            token.style.top =`${squareCoodinates}px` 
        }else{
            token.style.top =`${topCoordinates}px` 
            setTimeout(() =>{
                moveCircle(topCoordinates + 5)
            }, "5")

        }
  
    }

    token.classList = `token ${columnNumber}${rowNumber}`
    
    moveCircle(topOfBoardBox)

    // token.style.top = `${squareCoodinates + 10}px`
    // console.log(Math.trunc(squareCoodinates/10)*10, token);
}

function checkForWin(columnNumber, rowNumber){

    let tokenCount = 0    

    checkHorizontalWinUp(columnNumber, rowNumber+1)
    tokenCount = 0
    checkSideWinRight(columnNumber+1, rowNumber+1)
    tokenCount = 0
    checkSideWinLeft(columnNumber-1, rowNumber+1)
    tokenCount = 0
    checkWinLeftRightL(columnNumber+1, rowNumber)
    tokenCount = 0
    
    function checkTokenCont(){
        if(tokenCount >= 4){
            console.log("YOU WIN");
            return true
        }else{
            return false
        }
    }

    function checkHorizontalWinUp(columnNumber2, rowNumber2){
        if (rowNumber2 < 6){
            let token = boardStateObject[`column${columnNumber2}`][rowNumber2]
            console.log(token, `tokencount ${tokenCount}`);
            if (token === playerTurn ){
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkHorizontalWinUp(columnNumber2, rowNumber2+1)
                }
    
            }else{
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkHorizontalWinDown(columnNumber, rowNumber-1)
                } 
            }
        }else{
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkHorizontalWinDown(columnNumber, rowNumber-1)
                }
        }
        
        
    }
    function checkHorizontalWinDown(columnNumber2, rowNumber2){
        let token = boardStateObject[`column${columnNumber2}`][rowNumber2]
        console.log(token, `tokencount ${tokenCount}`, `player number ${playerTurn}`);
        console.log(columnNumber2, rowNumber2);
        if (token === playerTurn ){
            console.log("yes");
            tokenCount += 1
            checkTokenCont()
            checkHorizontalWinDown(columnNumber2, rowNumber2-1)
        }
        
    }


    function checkSideWinRight(columnNumber2, rowNumber2){
        if(rowNumber2 < 6 && columnNumber2 < 7){
            let token = boardStateObject[`column${columnNumber2}`][rowNumber2]
            if (token === playerTurn){
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkSideWinRight(columnNumber2+1, rowNumber2+1)
                }
            }else{
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkSideWinRightDown(columnNumber-1, rowNumber-1)
                }
            }
        }else{
            tokenCount += 1
            if(checkTokenCont() === false){
                checkSideWinRightDown(columnNumber-1, rowNumber-1)
            }
        }
        
    }
    function checkSideWinRightDown(columnNumber2, rowNumber2){
        if (columnNumber2 >= 0 && rowNumber2 >= 0){
            let token = boardStateObject[`column${columnNumber2}`][rowNumber2]
            if(token === playerTurn){
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkSideWinRightDown(columnNumber2-1, rowNumber2-1)
                }
            }
        }
    }
    

    function checkSideWinLeft(columnNumber2, rowNumber2){
        if(rowNumber2 < 6 && columnNumber2 >= 0){
            let token = boardStateObject[`column${columnNumber2}`][rowNumber2]
            if (token === playerTurn){
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkSideWinLeft(columnNumber2-1, rowNumber2+1)
                }
            }else{
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkSideWinLeftDown(columnNumber+1, rowNumber-1)
                }
            }
        }else{
            tokenCount += 1
            if(checkTokenCont() === false){
                checkSideWinLeftDown(columnNumber+1, rowNumber-1)
            }
        }
        
    }

    function checkSideWinLeftDown(columnNumber2, rowNumber2){
        if (columnNumber2 < 7 && rowNumber2 >= 0){
            let token = boardStateObject[`column${columnNumber2}`][rowNumber2]
            if(token === playerTurn){
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkSideWinLeftDown(columnNumber2+1, rowNumber2-1)
                }
            }
        }
    }


    function checkWinLeftRightL(columnNumber2, rowNumber2){
        if(rowNumber2 < 6 && columnNumber2 < 7){
            let token = boardStateObject[`column${columnNumber2}`][rowNumber2]
            if (token === playerTurn){
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkWinLeftRightL(columnNumber2+1, rowNumber2)
                }
            }else{
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkWinLeftRightR(columnNumber-1, rowNumber)
                }
            }
        }else{
            tokenCount += 1
            if(checkTokenCont() === false){
                checkWinLeftRightR(columnNumber-1, rowNumber)
            }
        }
        
    }
    function checkWinLeftRightR(columnNumber2, rowNumber2){
        if (columnNumber2 >= 0 && rowNumber2 >= 0){
            let token = boardStateObject[`column${columnNumber2}`][rowNumber2]
            if(token === playerTurn){
                tokenCount += 1
                if(checkTokenCont() === false){
                    checkWinLeftRightR(columnNumber2-1, rowNumber2)
                }
            }
        }
    }


    
}

window.onload = main()



