import React, { useState, useEffect } from 'react'

const App = () => {
    const [text, setText] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(5)
    const [game, setGame] = useState(false)
    const [wordCount, setwordCount] = useState(0)

    function handleChange(e) {
        setText(e.target.value)
    }

    const wordCounter = (text) => {
        setwordCount((text
            .trim()
            .split(' '))
            .filter(word => word !== "")
            .length)
    }

    useEffect(() => {
        if (game === true && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } if (timeRemaining === 0) {
            wordCounter(text)
        }
    }, [timeRemaining, game, wordCount])

    const startGame = () => {
        setGame(!game)
    }

    const handleRest = () => {
        setGame(!game)
        setText('')
        setTimeRemaining(5)
        setwordCount(0)
    }

    return (
        <div>
            <h1>Speed Typing Test</h1>

            <textarea
                onChange={(e) => handleChange(e)}
                value={text}
            />

            <h4>{timeRemaining}</h4>

            {wordCount > 0 && <button
                onClick={() => handleRest()}
            > Restart Game</button>}

            {wordCount === 0 && <button
                onClick={() => startGame(text)}
            > Start Game</button>}

            {wordCount > 0 && <h1> Word Count: {wordCount} </h1>}


        </div>
    )
}

export default App