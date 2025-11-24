import enWords from '../data/en.txt';
import esWords from '../data/es.txt';

export const languages = {
  EN: {
    label: 'English',
    code: 'EN',
    wordList: enWords,
    keys: {
      line1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      line2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      line3: ["Z", "X", "C", "V", "B", "N", "M"]
    },
    translations: {
      enter: 'ENTER',
      delete: 'DELETE',
      hint: 'Hint',
      wordNotValid: 'Word not valid',
      hintsTitle: 'Hints',
      continue: 'Continue',
      youWon: 'You Won!',
      youLost: 'You lost.',
      guessedIn: (word, attempts) => `You guessed ${word} in ${attempts} attempt${attempts > 1 ? "s" : ""}!`,
      correctWas: (word) => `The correct word was ${word}`,
      streak: 'Win Streak:',
      bestStreak: 'Your highest streak:',
      playAgain: 'Play Again'
    }
  },
  ES: {
    label: 'Español',
    code: 'ES',
    wordList: esWords,
    encoding: 'iso-8859-1',
    keys: {
      line1: ["Ó", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Í"],
      line2: ["Ñ", "A", "S", "D", "F", "G", "H", "J", "K", "L", "É"],
      line3: ["Á", "Ú", "Ü", "Z", "X", "C", "V", "B", "N", "M"]
    },
    translations: {
      enter: 'Ir',
      delete: 'Borrar',
      hint: 'Pista',
      wordNotValid: 'Palabra no válida',
      hintsTitle: 'Pistas',
      continue: 'Continuar',
      youWon: '¡Ganaste!',
      youLost: 'Perdiste.',
      guessedIn: (word, attempts) => `¡Adivinaste ${word} en ${attempts} intento${attempts > 1 ? "s" : ""}!`,
      correctWas: (word) => `La palabra correcta era ${word}`,
      streak: 'Racha de victorias:',
      bestStreak: 'Tu mejor racha:',
      playAgain: 'Jugar de nuevo'
    }
  }
};
