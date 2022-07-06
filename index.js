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

        // Prevent playing after the game is over
        if (isOver) return

        let currentSign = getCurrentSign()

        // Updating board and stuff...
        gameBoard.setField(index, currentSign)
        displayController.updateFieldText(currentSign, index)
        
        checkWinner()
        round++
        
        // Generating status text for next turn
        displayController.generateTurnText(getCurrentSign())
        // Generating status text for next turn
        if (isOver == true) {displayController.generateGameOverText(currentSign)}

        // Draw logic
        if (round > 9 && isOver == false) {
            displayController.generateDrawText()
            isOver = true
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
    // Rewrite someday, is a bit faulty at times
    const checkWinner = () => {
        winConditions.forEach((item, index) => { // [0, 1, 2, 3, 4, 5, 6, 7]
            if (gameBoard.get()[item[0]] === getCurrentSign() && gameBoard.get()[item[1]] === getCurrentSign() && gameBoard.get()[item[2]] === getCurrentSign()) {
                isOver = true;
            } 
        })
    }

    const reset = () => {
        round = 1
        isOver = false

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

    // TODO
    // Tidy up this ugly mess

    const updateSignText = (playerSign) => {
        const signText = document.querySelector('.signText')
        signText.innerText = playerSign
    }

    const generateTurnText = (playerSign) => {
        const statusText = document.querySelector('.statusText')
        statusText.replaceChildren()

        const TurnText = document.createElement('span')
        TurnText.innerHTML = "It's <span class='signText'></span>'s turn"

        statusText.append(TurnText)
        updateSignText(playerSign)
    }

    const generateGameOverText = (playerSign) => {
        const statusText = document.querySelector('.statusText')
        statusText.replaceChildren()

        const gameOverText = document.createElement('span')
        gameOverText.innerHTML = "<span class='signText'></span> has won!"

        statusText.append(gameOverText)
        updateSignText(playerSign)
    }

    const generateDrawText = () => {
        const statusText = document.querySelector('.statusText')

        const drawText = document.createElement('span')
        drawText.innerText = "It's a draw!"
        statusText.replaceChildren(drawText)
    }

    const init = (() => {

        // Add the event listeners
        for (let i = 0; i < fieldList.length; i++) {
            fieldList[i].addEventListener('click', (e) => {
            gameController.playRound(parseInt(e.target.dataset.index))
            })
        }
        document.querySelector('.reset').addEventListener('click', gameController.reset)

        generateTurnText('X')
    })()
    

    const updateFieldText = (playerSign, fieldIndex) => {
        fieldList[fieldIndex].innerText = playerSign
    }

    const reset = () => {
        for (let i = 0; i < fieldList.length; i++) {
            fieldList[i].innerText = ''
        }
        generateTurnText('X')
    }

    return {
        generateTurnText,
        generateGameOverText,
        generateDrawText,

        updateSignText,
        updateFieldText,
        reset,
    }
 })()
