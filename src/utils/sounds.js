import { Howl } from 'howler';
import chooseModeSound from '../assets/sound/chooseMode.mp3';
import errorSound from '../assets/sound/error.mp3';
import flipSound from '../assets/sound/flip.mp3';
import flipCorrectSound from '../assets/sound/flipCorrect.mp3';
import gameoverCorrectSound from '../assets/sound/gameoverCorrect.mp3';
import gameoverWrongSound from '../assets/sound/gameoverWrong.mp3';
import hintSound from '../assets/sound/hint.mp3';
import iconHoverSound from '../assets/sound/iconHover.mp3';
import iconClickSound from '../assets/sound/iconClick.mp3';
import keyHoverSound from '../assets/sound/keyHover.mp3';
import keyPressSound from '../assets/sound/keyPress.mp3';
import modalCloseSound from '../assets/sound/modalClose.mp3';
import onboardCompleteSound from '../assets/sound/onboardComplete.mp3';

const sounds = {
  chooseMode: new Howl({ src: [chooseModeSound] }),
  error: new Howl({ src: [errorSound] }),
  flip: new Howl({ src: [flipSound] }),
  flipCorrect: new Howl({ src: [flipCorrectSound] }),
  gameoverCorrect: new Howl({ src: [gameoverCorrectSound] }),
  gameoverWrong: new Howl({ src: [gameoverWrongSound] }),
  hint: new Howl({ src: [hintSound] }),
  iconHover: new Howl({ src: [iconHoverSound] }),
  iconClick: new Howl({ src: [iconClickSound] }),
  keyHover: new Howl({ src: [keyHoverSound] }),
  keyPress: new Howl({ src: [keyPressSound] }),
  modalClose: new Howl({ src: [modalCloseSound] }),
  onboardComplete: new Howl({ src: [onboardCompleteSound] }),
};

export const playSound = (soundName) => {
  const sound = sounds[soundName];
  if (sound) {
    sound.play();
  }
};

