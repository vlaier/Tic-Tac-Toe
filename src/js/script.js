const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningScreen = document.getElementById('winningMessage')
const winningMessage = document.querySelector('[data-winning-message-text]')
const newGameButtton = document.getElementById('restartButton')
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn
startGame()
function startGame(){
    circleTurn = true
    cellElements.forEach(cell => {
        cell.addEventListener('click',handleClick, {once: true})
    })
    newGameButtton.addEventListener('click',restart)
    setBoardHoverClass()

}

function restart(){
    cellElements.forEach(cell => {
        cell.classList.remove(CIRCLE_CLASS)
        cell.classList.remove(X_CLASS)
    })
    winningScreen.classList.remove('show')
    startGame()
}

function handleClick(event){
    const cell = event.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        winningScreen.classList.add('show')
        winningMessage.textContent = `${currentClass}'s wins`
    }
    if(draw()){
        winningScreen.classList.add('show')
        winningMessage.textContent = `DRAW`        
    }
    swapTurns()
    setBoardHoverClass()
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)    
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
function draw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}