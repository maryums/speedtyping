import React, { useState, useEffect } from 'react'

const App = () => {
    const STARTING_TIME = 15

    const [text, setText] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [game, setGame] = useState(false)
    const [wordCount, setwordCount] = useState(0)
    const [textAreadisabled, setTextAreaDisabled] = useState(true)


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
        if (game && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if (timeRemaining === 0) {
            setTextAreaDisabled(!textAreadisabled)
            console.log("Am I disabled?")
            wordCounter(text)

        }
    }, [timeRemaining, game, wordCount])

    const startGame = () => {
        setGame(!game)
        setTextAreaDisabled(!textAreadisabled)
    }

    const handleRest = () => {
        setTextAreaDisabled(!textAreadisabled)
        setGame(!game)
        setText('')
        setTimeRemaining(STARTING_TIME)
        setwordCount(0)
    }


    return (
        <div>
            <h1>Speed Typing Test</h1>

            <textarea
                disabled={textAreadisabled}
                onChange={(e) => handleChange(e)}
                value={text}
            />


            {wordCount > 0 && <h2> Word Count: {wordCount} </h2>}

            <h4>Time Remaining: {timeRemaining}</h4>

            {wordCount > 0 && <button
                onClick={() => handleRest()}
            > Restart Game</button>}

            {wordCount === 0 && <button
                onClick={() => startGame(text)}
            > Start Game</button>}




        </div>
    )
}

export default App