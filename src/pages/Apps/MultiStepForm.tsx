import React from 'react'

import { useMultiStepFormStore } from '../../stores/MultiStepFormStore'

import PersonalInfo from '../../components/MultiStepForm.tsx/PersonalInfo'
import ThankYou from '../../components/MultiStepForm.tsx/ThankYou'
import SelectPlan from '../../components/MultiStepForm.tsx/SelectPlan'
import PickAddOns from '../../components/MultiStepForm.tsx/PickAddOns'
import FinishedScreen from '../../components/MultiStepForm.tsx/FinishedScreen'

const STEPS = [
  {
    id: 1,
    step: 1,
    title: 'Personal info',
    desktopTitle: 'Your Info',
    description: 'Please provide your name, email address, and phone number.'
  },
  {
    id: 2,
    step: 2,
    title: ' Select your plan',
    desktopTitle: 'Select Plan',
    description: 'You have the option of monthly or yearly billing.'
  },
  {
    id: 3,
    step: 3,
    title: 'Pick add-ons',
    desktopTitle: 'Add-ons',
    description: 'Add-ons help enhance your gaming experience.'
  },
  {
    id: 4,
    step: 4,
    title: 'Finishing up',
    desktopTitle: 'Summary',
    description: 'Double-check everything looks OK before confirming.'
  }
] as const

const MultiStepForm: React.FC = () => {
  const { currentStep, finished, setFinished, currentStepSubmitFn, goToPreviousStep, setStep, lastCompletedStep } =
    useMultiStepFormStore((s) => s)

  const currentStepData = STEPS.find((step) => step.step === currentStep)

  const handleNext = () => {
    if (currentStepSubmitFn) {
      currentStepSubmitFn()
      setFinished()
    } else {
      console.log('No submit function defined for this step.')
    }
  }

  return (
    <main className="w-full max-w-screen min-h-dvh bg-[#f0f5ff] md:flex md: justify-center md:items-center md:h-full">
      {/* MOBILE DESIGN */}
      <div className="w-full bg-[url('/multi-step-form/bg-sidebar-mobile.svg')] h-50 bg-center bg-cover bg-no-repeat py-10 relative md:p-4 md:rounded-xl md:max-w-3xl md:w-full md:mx-auto md:flex md:items-stretch md:shadow-xl md:gap-6 md:bg-white md:bg-none md:h-auto md:static">
        <ul
          className="flex md:flex-col md:items-start md:justify-start items-center justify-center gap-6
        md:w-72 md:bg-[url('/multi-step-form/bg-sidebar-desktop.svg')] md:bg-center md:bg-cover md:bg-no-repeat md:p-4 md:rounded-lg"
        >
          {STEPS.map((step) => (
            <li key={step.id} className="md:flex md:items-center md:gap-4">
              <button
                onClick={() => {
                  if (step.step <= (lastCompletedStep ?? 0) + 1) {
                    setStep(step.step)
                  }
                }}
                className={`w-10 h-10 ${
                  step.step <= (lastCompletedStep ?? 0) + 1 ? 'cursor-pointer' : '!cursor-not-allowed'
                } rounded-full flex items-center justify-center border-2 font-bold text-lg ${
                  step.step === currentStep
                    ? 'bg-[#bfe2fd] border-[#bfe2fd] text-[#02295a]'
                    : 'bg-transparent border-white text-white'
                }`}
              >
                {step.step}
              </button>
              <div className="uppercas hidden md:block">
                <p className="text-[#bfe2fd] text-sm">Step {step.id}</p>
                <p className="font-semibold text-[#fafbff]">{step.desktopTitle}</p>
              </div>
            </li>
          ))}
        </ul>
        <section
          className="w-[calc(100%-48px)] max-w-xl bg-white rounded-lg shadow-lg absolute top-[56%] left-1/2 transform -translate-x-1/2 p-6
        md:w-full md:py-7 md:px-9 md:bg-transparent md:shadow-none md:rounded-none md:static md:translate-x-0"
        >
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
            {currentStep === 4 ? !finished ? <FinishedScreen /> : <ThankYou /> : null}
          </div>

          {!finished && (
            <div
              className={`w-full hidden bg-white py-6 px-0  md:flex items-center ${
                currentStep > 1 ? 'justify-between' : 'justify-end'
              } h-auto`}
            >
              {currentStep > 1 && (
                <button
                  onClick={goToPreviousStep}
                  className="text-[#9699ab] hover:text-[#9699ab]/70 transition-all duration-200 md:ml-3"
                >
                  Go Back
                </button>
              )}
              <button
                onClick={handleNext}
                className={`text-white transition-all duration-200 px-4 py-2 rounded-md ${
                  currentStep === 4 ? 'bg-[#473dff] hover:bg-[#437dff]/80' : 'bg-[#02295a] hover:bg-[#02295a]/80'
                }`}
              >
                {currentStep === 4 ? 'Confirm' : 'Next Step'}
              </button>
            </div>
          )}
        </section>
      </div>
      {!finished && (
        <div
          className={`w-full fixed bottom-0 max-w-screen bg-white p-6 flex items-center md:hidden ${
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
            className={`text-white transition-all duration-200 px-4 py-2 rounded-md ${
              currentStep === 4 ? 'bg-[#473dff] hover:bg-[#437dff]/80' : 'bg-[#02295a] hover:bg-[#02295a]/80'
            }`}
          >
            {currentStep === 4 ? 'Confirm' : 'Next Step'}
          </button>
        </div>
      )}
      {/* DESKTOP */}
      {/* <section className="bg-white p-4 rounded-xl max-w-3xl w-full mx-auto md:flex items-stretch hidden shadow-xl gap-6">
        <aside className="w-72 bg-[url('/multi-step-form/bg-sidebar-desktop.svg')] bg-center bg-cover bg-no-repeat p-4 rounded-lg">
          <ul className="flex flex-col items-start gap-6">
            {STEPS.map((step) => (
              <li key={step.id} className="flex items-center gap-4">
                <button
                  onClick={() => {
                    if (step.step <= (lastCompletedStep ?? 0) + 1) {
                      setStep(step.step)
                    }
                  }}
                  className={`w-10 h-10 ${
                    step.step <= (lastCompletedStep ?? 0) + 1 ? 'cursor-pointer' : '!cursor-not-allowed'
                  } rounded-full flex items-center justify-center border-2 font-bold text-lg ${
                    step.step === currentStep
                      ? 'bg-[#bfe2fd] border-[#bfe2fd] text-[#02295a]'
                      : 'bg-transparent border-white text-white'
                  }`}
                >
                  {step.step}
                </button>
                <div className="uppercase">
                  <p className="text-[#bfe2fd] text-sm">Step {step.id}</p>
                  <p className="font-semibold text-[#fafbff]">{step.desktopTitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <article className="w-full py-7 px-9">
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
            {currentStep === 4 ? !finished ? <FinishedScreen /> : <ThankYou /> : null}
          </div>

          {!finished && (
            <div
              className={`w-full bg-white py-6 px-0 flex items-center ${
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
                className={`text-white transition-all duration-200 px-4 py-2 rounded-md ${
                  currentStep === 4 ? 'bg-[#473dff] hover:bg-[#437dff]/80' : 'bg-[#02295a] hover:bg-[#02295a]/80'
                }`}
              >
                {currentStep === 4 ? 'Confirm' : 'Next Step'}
              </button>
            </div>
          )}
        </article>
      </section> */}
    </main>
  )
}
export default MultiStepForm
