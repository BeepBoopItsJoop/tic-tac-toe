 const gameBoard = (() => {
    const boardArray = new Array(9)

    const getBoard = () => boardArray

    const setBoard = (pos, sign) => {
        boardArray[pos] = sign
    } 

    const reset = () => {boardArray = new Array(9)}

    return {
        getBoard,
        setBoard,
        reset,
    }
 })()

const Player = (sign) => {

    const getSign = () => sign

    return {
        getSign,
    }
}


const gameController = (() => {
    
    const playerX = Player('X')
    const playerO = Player('O')

    let round = 1
    let isOver = false

    const playRound = (pos) => {

        gameBoard.setBoard(pos, getCurrentSign())
        document.querySelector('data-index')

        round++

    }

    const getCurrentSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    }


    const reset = () => {
        round = 1
        isOver = false
    }

    return {
        playRound,
        reset
    }

})()

const displayController = (() => {
    
    return {}
 })()
