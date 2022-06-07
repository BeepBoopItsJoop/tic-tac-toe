 const gameBoard = (() => {
    let boardArray = new Array(9)

    const get = () => boardArray

    const setField = (index, sign) => {
        if (index > boardArray.length) return;
        boardArray[index] = sign
    } 

    const reset = () => boardArray = new Array(9)

    return {
        get,
        setField,
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

    const playRound = (index) => {
        // Prevent playing a field more than once.
        if (gameBoard.get()[index] !== undefined) return

        gameBoard.setField(index, getCurrentSign())
        // TODO
        // DOM METHOD

        if(checkWinner() === true) {
            // dom method
            gameBoard.reset()
            gameController.reset()
        }

        round++

        displayController.updatePlayerText(getCurrentSign(), index)

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

    // TODO
    // rewrite this someday 
    const checkWinner = () => {
        winConditions.forEach((item, index) => { // [0, 1, 2, 3, 4, 5, 6, 7]
            if (gameBoard.get()[item[0]] === getCurrentSign() && gameBoard.get()[item[1]] === getCurrentSign() && gameBoard.get()[item[2]] === getCurrentSign()) {
                console.log('winner!');
                gameBoard.reset()
                gameController.reset()
            } 
        })
    }

    const reset = () => {
        round = 1
        isOver = false
    }

    return {
        playRound,
        reset,
        checkWinner
    }

})()

const displayController = (() => {

    const fieldList = document.querySelectorAll('.field')

    const init = (() => {
    
        for (let i = 0; i < fieldList.length; i++) {
            fieldList[i].addEventListener('click', (e) => {
            gameController.playRound(parseInt(e.target.dataset.index))
                
            })
        }
    })()
    

    const updatePlayerText = (playerSign, fieldIndex) => {
        const playerText = document.querySelector('.playerText')

        playerText.innerHTML = playerSign
        fieldList[fieldIndex].innerText = playerSign
    }

    return {
        updatePlayerText,
    }
 })()
