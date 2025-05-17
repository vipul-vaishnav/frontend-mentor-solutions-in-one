import { create } from 'zustand'

interface State {
  currentQuestionIndex: number
  totalNumberOfQuestions: number
  score: number
  isCurrentQuestionAnswered: boolean
  isCurrentQuestionAnswerSubmitted: boolean
  isCurrentQuestionAnswerSubmittedCorrect: boolean | null
  finished: boolean
}

interface Actions {
  setTotalNumberOfQuestions: (numberOfQuestions: number) => void
  setQuestionAnsweredStatus: (status: boolean) => void
  setQuestionSubmittedStatus: (status: boolean) => void
  setQuestionAnswerCorrectStatus: (status: boolean) => void
  updateFinishedStatus: (status: boolean) => void
  goToNextQuestion: () => void
}

export const useQuizStore = create<State & Actions>((set, get) => ({
  currentQuestionIndex: 0,
  score: 0,
  totalNumberOfQuestions: 0,
  isCurrentQuestionAnswered: false,
  isCurrentQuestionAnswerSubmitted: false,
  isCurrentQuestionAnswerSubmittedCorrect: null,
  finished: false,
  setTotalNumberOfQuestions: (numberOfQuestions: number) => {
    set({
      totalNumberOfQuestions: numberOfQuestions
    })
  },
  setQuestionAnsweredStatus: (answered: boolean) => {
    set({
      isCurrentQuestionAnswered: answered
    })
  },
  setQuestionSubmittedStatus: (submitted: boolean) => {
    set({ isCurrentQuestionAnswerSubmitted: submitted })
  },
  setQuestionAnswerCorrectStatus: (isCorrect: boolean) => {
    set({ isCurrentQuestionAnswerSubmittedCorrect: isCorrect })
  },
  updateFinishedStatus: (finished: boolean) => {
    set({ finished })
  },
  goToNextQuestion: () => {}
}))
