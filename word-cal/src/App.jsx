import { useEffect, useState } from 'react'
import './App.css'
import Grid from './components/Grid'
import Keyboard from './components/Keyboard'
import { getKeyboardStates } from './utils'
// import { getRandomWord } from './wordService'
import { getDailyWord } from './wordService'

function App() {
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [solution, setSolution] = useState('')
  console.log(solution)

  const [isGameOver, setIsGameOver] = useState(false);

  // useEffect(() => {
  //   const getSolution = async () => {
  //     const newSolution = await getRandomWord();
  //     setSolution(newSolution);
  //   };
  //   getSolution();
  // }, [])

  useEffect(() => {
  const solutionWord = getDailyWord();
  setSolution(solutionWord);
}, [])

  console.log(currentGuess);

  const handleKeyPress = (key) => {
    if (guesses.length === 6) {
      console.log('More than 6 guesses')
      return;
    }

    if (key === 'ENTER') {
      console.log('Pressed Enter Key')
      if (currentGuess.length === 7) {
        setGuesses([...guesses,  currentGuess])

        if (currentGuess === solution) {
          setTimeout(() => {
            alert('Congratulations, you have won!')
          },1000);
          
          setIsGameOver(true);

        } else if (guesses.length === 5) {
          setTimeout(() => {
            alert(`Oof. The answer was obviously ${solution}`);
          },500);
          setIsGameOver(true);
        }

        setCurrentGuess('')
        console.log('Guesses')
      }
    }

    else if (key === 'BACKSPACE') {
      console.log('Pressed Backspace Key')
      setCurrentGuess((prev) => prev.slice(0, -1));
    }

    else if (currentGuess.length < 7) {
      console.log('Pressed any other Key')
      setCurrentGuess((prev) => prev + key.toLowerCase());
    }
  };

  const keyboardStates = getKeyboardStates(guesses, solution)
  console.log(keyboardStates);

  return (
    <div className='app'>
      <h1 className="title">WordCal</h1>
      <Grid guesses={guesses} currentGuess={currentGuess} solution={solution} />
      <Keyboard isGameOver={isGameOver} onKeyPress={handleKeyPress} keyboardStates={keyboardStates} />
    </div>
  );
}

export default App
