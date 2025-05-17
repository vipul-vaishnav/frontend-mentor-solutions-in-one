import { create } from 'zustand'

interface State {
  currentQuestionIndex: number
  totalNumberOfQuestions: number
  score: number
  currentQuestionAnswer: string | null
  isCurrentQuestionAnswered: boolean
  isCurrentQuestionAnswerSubmitted: boolean
  isCurrentQuestionAnswerSubmittedCorrect: boolean | null
  finished: boolean
}

interface Actions {
  setTotalNumberOfQuestions: (numberOfQuestions: number) => void
  setCurrentQuestionAnswer: (ans: string) => void
  setQuestionAnsweredStatus: (status: boolean) => void
  setQuestionSubmittedStatus: (status: boolean) => void
  setQuestionAnswerCorrectStatus: (status: boolean) => void
  updateFinishedStatus: (status: boolean) => void
  goToNextQuestion: () => void
  updateScore: (newScore: number) => void
  resetQuiz: () => void
}

type QuizStore = State & Actions

export const useQuizStore = create<QuizStore>((set, get) => ({
  currentQuestionIndex: 0,
  score: 0,
  totalNumberOfQuestions: 0,
  currentQuestionAnswer: null,
  isCurrentQuestionAnswered: false,
  isCurrentQuestionAnswerSubmitted: false,
  isCurrentQuestionAnswerSubmittedCorrect: null,
  finished: false,
  setTotalNumberOfQuestions: (numberOfQuestions: number) => {
    set({
      totalNumberOfQuestions: numberOfQuestions
    })
  },
  setCurrentQuestionAnswer: (ans: string) => {
    set({ currentQuestionAnswer: ans })
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
  updateScore: (newScore: number) => {
    set({ score: newScore })
  },
  goToNextQuestion: () => {
    set({
      currentQuestionIndex: get().currentQuestionIndex + 1,
      currentQuestionAnswer: null,
      isCurrentQuestionAnswered: false,
      isCurrentQuestionAnswerSubmitted: false,
      isCurrentQuestionAnswerSubmittedCorrect: null
    })
  },
  resetQuiz: () => {
    set({
      currentQuestionIndex: 0,
      score: 0,
      totalNumberOfQuestions: 0,
      currentQuestionAnswer: null,
      isCurrentQuestionAnswered: false,
      isCurrentQuestionAnswerSubmitted: false,
      isCurrentQuestionAnswerSubmittedCorrect: null,
      finished: false
    })
  }
}))
