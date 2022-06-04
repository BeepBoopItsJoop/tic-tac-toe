 const gameBoard = (() => {
    const boardArray = new Array(9)

    const getBoard = () => boardArray

    const setBoard = (pos, sign) => {
        if (pos > boardArray.length) return;
        boardArray[pos] = sign
    } 

    const reset = () => boardArray = new Array(9)

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
        if (gameBoard.getBoard()[pos] !== undefined) {console.log('field alreay played'); return}

        gameBoard.setBoard(pos, getCurrentSign())
        // TODO
        // DOM METHOD

        checkWinner()
        round++

        if (round > 9) {
            // TODO DOM METHOD
            console.log('draw')
            gameController.reset
            gameBoard.reset
            return
        }
    }

    const getCurrentSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    }

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
       
    }

    const reset = () => {
        round = 1
        isOver = false
    }

    return {
        playRound,
        reset,
    }

})()

const displayController = (() => {

    const fieldList = document.querySelectorAll('.field')
    
    for (let i = 0; i < fieldList.length; i++) {
        fieldList[i].addEventListener('click', (e) => {
            gameController.playRound(parseInt(e.target.dataset.index))
        })
    }

    return {}
 })()
