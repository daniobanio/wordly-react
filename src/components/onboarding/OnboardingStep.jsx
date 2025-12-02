import { playSound } from '../../utils/sounds';

const OnboardingStep = ({ step, onNext, onBack, isFirst, isLast }) => {
  const handleNext = () => {
    if (isLast) {
      playSound('onboardComplete');
    }
    onNext();
  };

  return (
    <div className="modal-overlay">
      <div className="onboarding-modal">
        <h1>{step.title}</h1>
        <p className="text-white text-2xl">
          {step.content}
        </p>
        {step.image && (
          <img 
            className="w-[500px] !mt-5" 
            src={step.image} 
            alt={step.title}
          />
        )}
        
        <div className="flex gap-5 !mt-5 onboarding-nav">
          {step.showBack && !isFirst && (
            <button 
              className="!bg-gray-500" 
              onClick={onBack}
            >
              Back
            </button>
          )}
          <button onClick={handleNext}>
            {isLast ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep;
