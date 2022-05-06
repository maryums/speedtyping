import React, { useState, useEffect, useRef, useContext } from 'react'
import { ThemeContext } from './themeContext'

const App = () => {
    const STARTING_TIME = 15

    const [text, setText] = useState('')
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [game, setGame] = useState(false)
    const [wordCount, setwordCount] = useState(0)
    const textRef = useRef(null)


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
            wordCounter(text)
            setGame(false)
        }
    }, [timeRemaining, game, wordCount])

    const startGame = () => {
        setGame(true)
        textRef.current.disabled = false
        textRef.current.focus()
    }

    const handleRest = () => {
        setGame(false)
        setText('')
        setTimeRemaining(STARTING_TIME)
        setwordCount(0)
    }

    const theme = useContext(ThemeContext)
    console.log(theme)

    return (

        <div className={`${theme.theme}-theme`}>
            <button
                onClick={theme.toggleTheme}
            // className={`${theme.theme}-theme` }
            >
                Switch Theme
            </button>

            <h1>Speed Typing Test</h1>

            <textarea
                ref={textRef}
                disabled={!game}
                onChange={(e) => handleChange(e)}
                value={text}

            />


            {wordCount > 0 && <h2> Word Count: {wordCount} </h2>}

            <h4>Time Remaining: {timeRemaining}</h4>

            {wordCount > 0 && <button
                onClick={() => handleRest()}
            > Restart Game</button>}

            {wordCount === 0 && <button
                disabled={game}
                onClick={() => startGame(text)}
            > Start Game</button>}

        </div>
    )
}

export default App