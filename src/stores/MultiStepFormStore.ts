import { create } from 'zustand'

interface State {
  currentStep: number
  finished: boolean
}

interface Actions {
  goToNextStep: () => void
  setFinished: () => void
}

type Store = State & Actions

export const useMultiStepFormStore = create<Store>((set, get) => ({
  currentStep: 1,
  finished: false,
  goToNextStep: () => {
    const currStep = get().currentStep
    const nextStep = currStep + 1
    set({ currentStep: nextStep })
  },
  setFinished: () => {
    set({ finished: get().currentStep === 4 })
  }
}))
