import { create } from 'zustand'
import type { PersonalInfoType } from '../lib/MultiStepForm.schema'

interface State {
  currentStep: number
  personalInfo: PersonalInfoType
  finished: boolean
  currentStepSubmitFn: (() => void) | null
}

interface Actions {
  goToNextStep: () => void
  setFinished: () => void
  updatePersonalInfo: (personalInfo: PersonalInfoType) => void
  setCurrentStepSubmitFn: (fn: (() => void) | null) => void
  goToPreviousStep: () => void
}

type Store = State & Actions

export const useMultiStepFormStore = create<Store>((set, get) => ({
  currentStep: 1,
  finished: false,
  personalInfo: {
    email: '',
    name: '',
    phone: ''
  },
  currentStepSubmitFn: null,
  goToNextStep: () => {
    const currStep = get().currentStep
    const nextStep = currStep + 1
    set({ currentStep: Math.min(nextStep, 4) })
  },
  goToPreviousStep: () => {
    const currStep = get().currentStep
    const prevStep = currStep - 1
    set({ currentStep: Math.max(prevStep, 1) })
  },
  setFinished: () => {
    set({ finished: get().currentStep === 4 })
  },
  updatePersonalInfo: (personalInfo: PersonalInfoType) => {
    set({ personalInfo })
  },
  setCurrentStepSubmitFn: (fn: (() => void) | null) => {
    set({ currentStepSubmitFn: fn })
  }
}))
