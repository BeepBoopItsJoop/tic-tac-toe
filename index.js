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
        if (isOver) {console.log('game over'); return}

        let currentSign = getCurrentSign()

        displayController.updateFieldText(currentSign, index)
        gameBoard.setField(index, currentSign)

        checkWinner()

        // if (isOver) playertext method

        if(isOver) {
            displayController.updateWonPlayerText(currentSign)
            return
        }

        round++
        displayController.updatePlayerText(getCurrentSign())

        if (round > 9) {
            // TODO DOM METHOD
            console.log('draw')
            isOver = true
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
                console.log('winner!')
                isOver = true;
            } 
        })
    }

    const reset = () => {
        round = 1
        isOver = false
        
        displayController.updatePlayerText('X')

        gameBoard.reset();
        displayController.reset()
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
 
        document.querySelector('.reset') .addEventListener('click', gameController.reset)
        document.querySelector('.playerText').innerText = 'X'
    })()
    

    const updateFieldText = (playerSign, fieldIndex) => {
        fieldList[fieldIndex].innerText = playerSign
    }

    const updatePlayerText = (playerSign) => {
        const playerText = document.querySelector('.playerText')

        playerText.innerText = playerSign
    }

    const updateWonPlayerText = (playerSign) => {
        const playerText = document.querySelector('.wonPlayerText')

        playerText.innerText = `${playerSign} has won!`
    }

    const reset = () => {
        for (let i = 0; i < fieldList.length; i++) {
            fieldList[i].innerText = ''
        }
    }

    return {
        updatePlayerText,
        updateWonPlayerText,
        updateFieldText,
        reset,
    }
 })()
