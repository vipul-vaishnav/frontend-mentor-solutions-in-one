import { create } from 'zustand'
import type { PersonalInfoType } from '../lib/MultiStepForm.schema'

interface State {
  currentStep: number
  personalInfo: PersonalInfoType
  finished: boolean
  currentStepSubmitFn: (() => void) | null
  billingCycle: 'monthly' | 'yearly'
  plan: 'arcadeXQakh7' | 'advancedhxzdy3' | 'prowDXoNs' | null
  addOns: ('onlineServiceXQakh7' | 'largerStoragehxzdy3' | 'customizableProfilewDXoNs')[]
}

interface Actions {
  goToNextStep: () => void
  setFinished: () => void
  updatePersonalInfo: (personalInfo: PersonalInfoType) => void
  setCurrentStepSubmitFn: (fn: (() => void) | null) => void
  goToPreviousStep: () => void
  toggleBillingCycle: () => void
  setPlan: (plan: State['plan']) => void
  setAddOns: (addOns: State['addOns']) => void
  setStep: (step: number) => void
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
  billingCycle: 'monthly',
  plan: null,
  addOns: [],
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
  },
  toggleBillingCycle: () => set({ billingCycle: get().billingCycle === 'monthly' ? 'yearly' : 'monthly' }),
  setPlan: (plan: State['plan']) => set({ plan }),
  setAddOns: (addOns: State['addOns']) => set({ addOns }),
  setStep: (step: number) => set({ currentStep: step })
}))
