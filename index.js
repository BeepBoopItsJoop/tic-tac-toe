 const gameBoard = (() => {
    const boardArray = new Array(9)
    const getBoard = () => boardArray

    // sets a square(pos) to the selected player's sign(player)
    const setBoard = (pos, player) => {
        const HTMLField = document.querySelector(`.container div:nth-child(${pos + 1})`)
        playerSign = player.getSign()
        HTMLField.innerText = boardArray[pos] = playerSign
    }

    return {
        getBoard,
        setBoard
    }
 })()

const Player = (isFirst, isBot) => {
    let sign
    if (isFirst) sign = 'X'; else sign = 'O'

    const getSign = () => sign

    return {
        isFirst, 
        isBot, 
        getSign
    }
}

let Player1 = Player(true, false)
let Player2 = Player(false, false)

const displayController = (() => {
    const list = document.querySelector('.container').children
    const boardArray = gameBoard.getBoard()


    const init = () => {
        // for (let i = 0; i < list.length; i++) {
        //     list[i].addEventListener('click', setBoard())
        // }
    }

    const update = () => {
        const displayArray = list
        for (let i = 0; i < displayArray.length; i++) {
            displayArray[i].innerText = boardArray[i]
            
        }
    }

    return {
        update,
    }
 })()

const gameController = (() => {
    let stepCount = 1

    const makeStep = () => {
    
    }

    return {

    }
})()