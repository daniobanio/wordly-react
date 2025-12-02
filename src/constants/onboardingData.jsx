import onboarding1 from '../assets/img/onboarding/onboarding-1.png';
import onboarding2 from '../assets/img/onboarding/onboarding-2.png';
import onboarding3 from '../assets/img/onboarding/onboarding-3.png';
import onboarding4 from '../assets/img/onboarding/onboarding-4.png';

const ONBOARDING_COMPLETED_KEY = 'onboardingCompleted';

// Helper functions for localStorage
export const isOnboardingCompleted = () => {
  return localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true';
};

export const setOnboardingCompleted = () => {
  localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
};

export const resetOnboarding = () => {
  localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
};

export const onboardingSteps = [
  {
    id: 1,
    title: "How to play!",
    content: (
      <>
        Each guess must be a <span className="font-semibold text-[#31A134]">valid 5-letter word.</span>
        <br />Hit <span className="font-semibold text-[#31A134]">Enter</span> to submit your guess.
      </>
    ),
    image: onboarding1,
    showBack: false,
  },
  {
    id: 2,
    title: "How to play!",
    content: (
      <>
        The color of the tiles will change to show<br />how close your guess was to the word.
      </>
    ),
    image: onboarding2,
    showBack: true,
  },
  {
    id: 3,
    title: "Example",
    content: (
      <>
          <span className="text-[#B5B5B5] text-3xl font-semibold">V</span> is not in the word at all.<br />
          <span className="text-[#31A134] text-3xl font-semibold">A</span> is in the word and in the correct spot.<br />
          <span className="text-[#CFA912] text-3xl font-semibold">L I D</span> are in the word but in the wrong spots.
      </>
    ),
    image: onboarding3,
    showBack: true,
  },
  {
    id: 4,
    title: "Good Luck!",
    content: (
      <>
        You get <span className="font-semibold text-[#31A134]">6 tries</span> to guess the word.<br />
        You can use <span className="font-semibold text-[#31A134]">Hints</span> if you get stuck!
      </>
    ),
    image: onboarding4,
    showBack: true,
    isLast: true,
  },
];

