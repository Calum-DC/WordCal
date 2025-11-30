import { useEffect } from 'react';
import './Keyboard.css'
import { getKeyboardStates } from '../utils';

const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
]



const Keyboard = ({onKeyPress, keyboardStates, isGameOver}) => {
    useEffect (()=> {
        const handleKeyDown = (event) => {
            if (!isGameOver) {
             const key = event.key;
              
             if (key === 'Backspace' || key === 'Enter' || /^[a-zA-Z]$/.test(key)) {
                    event.preventDefault();
                    console.log(key.toUpperCase());
                    onKeyPress(key.toUpperCase());
            }
        }
        };

        window.addEventListener('keydown', handleKeyDown); 

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onKeyPress]);

    const handleClick = (key) => { 
        if (!isGameOver) {
        console.log(key.toUpperCase())
        onKeyPress(key.toUpperCase());
        }
    };

    return (
        <div className="keyboard">
            {KEYBOARD_ROWS.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="keyboard-row">
                        {row.map((key) => {
                            const state = key.length === 1 ? keyboardStates[key.toLowerCase()] : ''
                            return (
                            <button 
                            key={key}
                                onClick={() => handleClick(key)}
                                className={`keyboard-key ${
                                    key === 'Backspace' || key === 'Enter' 
                                        ? 'keyboard-key-wide' 
                                        : ''
                                }${state}`}
                                
                            >  
                                {key === 'Backspace' ? '←' : key}
                            </button>
                        );
                    })}
                </div>
                );  
            })}
        </div>
    );

};

export default Keyboard



