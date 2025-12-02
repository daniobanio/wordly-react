import { useState } from 'react';
import OnboardingStep from './OnboardingStep';
import { onboardingSteps, setOnboardingCompleted } from '../../constants/onboardingData';

const Onboarding = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = onboardingSteps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === onboardingSteps.length - 1;

  const handleNext = () => {
    if (isLast) {
      setOnboardingCompleted();
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <OnboardingStep
      step={step}
      onNext={handleNext}
      onBack={handleBack}
      isFirst={isFirst}
      isLast={isLast}
    />
  );
};

export default Onboarding;

