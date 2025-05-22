import React from 'react'

import { useMultiStepFormStore } from '../../stores/MultiStepFormStore'

import PersonalInfo from '../../components/MultiStepForm.tsx/PersonalInfo'
import ThankYou from '../../components/MultiStepForm.tsx/ThankYou'
import SelectPlan from '../../components/MultiStepForm.tsx/SelectPlan'
import PickAddOns from '../../components/MultiStepForm.tsx/PickAddOns'

const STEPS = [
  {
    id: 1,
    step: 1,
    title: 'Personal info',
    description: 'Please provide your name, email address, and phone number.'
  },
  {
    id: 2,
    step: 2,
    title: ' Select your plan',
    description: 'You have the option of monthly or yearly billing.'
  },
  {
    id: 3,
    step: 3,
    title: 'Pick add-ons',
    description: 'Add-ons help enhance your gaming experience.'
  },
  {
    id: 4,
    step: 4,
    title: 'Finishing up',
    description: 'Double-check everything looks OK before confirming.'
  }
] as const

const MultiStepForm: React.FC = () => {
  const { currentStep, finished, setFinished, currentStepSubmitFn, goToPreviousStep } = useMultiStepFormStore((s) => {
    // console.log(s)
    return s
  })

  const currentStepData = STEPS.find((step) => step.step === currentStep)

  const handleNext = () => {
    if (currentStepSubmitFn) {
      currentStepSubmitFn()
      setFinished()
    }
  }

  return (
    <main className="w-full max-w-screen min-h-dvh bg-[#f0f5ff]">
      <div className="w-full bg-[url('/multi-step-form/bg-sidebar-mobile.svg')] h-50 bg-center bg-cover bg-no-repeat py-10 relative">
        <ul className="flex items-center justify-center gap-6">
          {STEPS.map((step) => (
            <li key={step.id}>
              <button
                onClick={() => {}}
                className={`w-10 h-10 cursor-pointer rounded-full flex items-center justify-center border-2 font-bold text-lg ${
                  step.step === currentStep
                    ? 'bg-[#bfe2fd] border-[#bfe2fd] text-[#02295a]'
                    : 'bg-transparent border-white text-white'
                }`}
              >
                {step.step}
              </button>
            </li>
          ))}
        </ul>
        <section className="w-[calc(100%-48px)] max-w-xl bg-white rounded-lg shadow-lg absolute top-[56%] left-1/2 transform -translate-x-1/2 p-6">
          {!finished && (
            <div className="space-y-3 mb-4">
              <h1 className="text-[#02295a] font-bold text-xl sm:text-3xl">{currentStepData?.title}</h1>
              <p className="text-[#9996ab] font-medium text-sm sm:text-base">{currentStepData?.description}</p>
            </div>
          )}

          <div>
            {currentStep === 1 && <PersonalInfo />}
            {currentStep === 2 && <SelectPlan />}
            {currentStep === 3 && <PickAddOns />}
            {currentStep === 4 ? !finished ? <div>Step 4</div> : <ThankYou /> : null}
          </div>
        </section>
      </div>
      <div
        className={`w-full fixed bottom-0 max-w-screen bg-white p-6 flex items-center ${
          currentStep > 1 ? 'justify-between' : 'justify-end'
        } h-auto`}
      >
        {currentStep > 1 && (
          <button
            onClick={goToPreviousStep}
            className="text-[#9699ab] hover:text-[#9699ab]/70 transition-all duration-200"
          >
            Go Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="text-white bg-[#02295a] hover:bg-[#02295a]/80 transition-all duration-200 px-4 py-2 rounded-md"
        >
          {currentStep === 4 ? 'Confirm' : 'Next Step'}
        </button>
      </div>
    </main>
  )
}
export default MultiStepForm
