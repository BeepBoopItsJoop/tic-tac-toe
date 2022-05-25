 const gameBoard = (() => {
    const boardArray = ['X', 'O', 'O', 'X', 'O', 'X', 'X', 'O', 'X']
    const getBoard = () => boardArray
    return {
        getBoard
    }
 })()

 const displayController = (() => {
    const list = document.querySelector('.container').children

    const update = () => {
        const boardArray = gameBoard.getBoard()
        const displayArray = list
        for (let i = 0; i < displayArray.length; i++) {
            displayArray[i].innerText = boardArray[i]
            
        }
    }
    return {
        update,
    }
 })()
 displayController.update()




const Player = (isFirst, isBot) => {
    let score
    

    // const isFirst = () => isFirst
    // const isBot = () => isBot

    const getSign = () => {
        let sign 
        if (isFirst) {
            sign = 'X'
        } else {
            sign = 'O'
        }
        return sign
    }

    const makePick = (boardPos) => {
        
    }

    return {isFirst, isBot, getSign, makePick}
}

let Player1 = Player(true, false)
let Player2 = Player(false, false)

// for (let i = 0; i < list.length; i++) {
//     list[i].addEventListener('click', Player.makePick(e))
// }