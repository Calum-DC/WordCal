// import { useEffect, useState } from 'react'
// import './App.css'
// import Grid from './components/Grid'
// import Keyboard from './components/Keyboard'
// import { getKeyboardStates } from './utils'
// // import { getRandomWord } from './wordService'
// import { getDailyWord } from './wordService'

// function App() {
//   const [guesses, setGuesses] = useState([])
//   const [currentGuess, setCurrentGuess] = useState('')
//   const [solution, setSolution] = useState('')
//   console.log(solution)

//   const [isGameOver, setIsGameOver] = useState(false);

//   // useEffect(() => {
//   //   const getSolution = async () => {
//   //     const newSolution = await getRandomWord();
//   //     setSolution(newSolution);
//   //   };
//   //   getSolution();
//   // }, [])

//   useEffect(() => {
//   const solutionWord = getDailyWord();
//   setSolution(solutionWord);
// }, [])

//   console.log(currentGuess);

//   const handleKeyPress = (key) => {
//     if (guesses.length === 6) {
//       console.log('More than 6 guesses')
//       return;
//     }

//     if (key === 'ENTER') {
//       console.log('Pressed Enter Key')
//       if (currentGuess.length === 7) {
//         setGuesses([...guesses,  currentGuess])

//         if (currentGuess === solution) {
//           setTimeout(() => {
//             alert('Congratulations, you have won!')
//           },1000);
          
//           setIsGameOver(true);

//         } else if (guesses.length === 5) {
//           setTimeout(() => {
//             alert(`Oof. The answer was obviously ${solution}`);
//           },500);
//           setIsGameOver(true);
//         }

//         setCurrentGuess('')
//         console.log('Guesses')
//       }
//     }

//     else if (key === 'BACKSPACE') {
//       console.log('Pressed Backspace Key')
//       setCurrentGuess((prev) => prev.slice(0, -1));
//     }

//     else if (currentGuess.length < 7) {
//       console.log('Pressed any other Key')
//       setCurrentGuess((prev) => prev + key.toLowerCase());
//     }
//   };

//   const keyboardStates = getKeyboardStates(guesses, solution)
//   console.log(keyboardStates);

//   return (
//     <div className='app'>
//       <h1 className="title">WordCal</h1>
//       <Grid guesses={guesses} currentGuess={currentGuess} solution={solution} />
//       <Keyboard isGameOver={isGameOver} onKeyPress={handleKeyPress} keyboardStates={keyboardStates} />
//     </div>
//   );
// }

// export default App

import { useEffect, useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';
import { getKeyboardStates } from './utils';
import { getDailyWord } from './wordService';
import { A_WORDS } from './allowedWords';

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [solution, setSolution] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const getResetKey = () => {
    const now = new Date();
    const reset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 8, 0, 0));
    if (now.getTime() >= reset.getTime()) reset.setUTCDate(reset.getUTCDate() + 1);
    return reset.getTime();
  };

  useEffect(() => {
    const resetKey = getResetKey();
    const storedReset = parseInt(localStorage.getItem('wordcal-reset') || '0', 10);

    if (storedReset !== resetKey) {
      localStorage.setItem('wordcal-reset', resetKey.toString());
      localStorage.removeItem('wordcal-guesses');
      localStorage.removeItem('wordcal-solution');
      localStorage.removeItem('wordcal-gameover');
    }

    const savedGuesses = localStorage.getItem('wordcal-guesses');
    if (savedGuesses) setGuesses(JSON.parse(savedGuesses));

    const savedSolution = localStorage.getItem('wordcal-solution');
    if (savedSolution) {
      setSolution(savedSolution);
    } else {
      const dailyWord = getDailyWord();
      setSolution(dailyWord);
      localStorage.setItem('wordcal-solution', dailyWord);
    }

    const savedGameOver = localStorage.getItem('wordcal-gameover');
    if (savedGameOver === 'true') setIsGameOver(true);
  }, []);

  const handleKeyPress = (key) => {
    if (isGameOver || guesses.length >= 6) return;

    if (key === 'ENTER') {
      if (currentGuess.length === 7) {

        if (!A_WORDS.includes(currentGuess.toLowerCase())) {
          alert('Word not in list!');
          return; 
    }
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        localStorage.setItem('wordcal-guesses', JSON.stringify(newGuesses));

        if (currentGuess === solution) {
          setTimeout(() => alert('Solved!'), 500);
          setIsGameOver(true);
          localStorage.setItem('wordcal-gameover', 'true');
        } else if (newGuesses.length === 6) {
          setTimeout(() => alert(`Oof. The answer was ${solution}`), 500);
          setIsGameOver(true);
          localStorage.setItem('wordcal-gameover', 'true');
        }

        setCurrentGuess('');
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (currentGuess.length < 7) {
      setCurrentGuess((prev) => prev + key.toLowerCase());
    }
  };

  const keyboardStates = getKeyboardStates(guesses, solution);

  return (
    <div className='app'>
      <h1 className="title">caldle</h1>
      <Grid guesses={guesses} currentGuess={currentGuess} solution={solution} />
      <Keyboard isGameOver={isGameOver} onKeyPress={handleKeyPress} keyboardStates={keyboardStates} />
    </div>
  );
}

export default App;
