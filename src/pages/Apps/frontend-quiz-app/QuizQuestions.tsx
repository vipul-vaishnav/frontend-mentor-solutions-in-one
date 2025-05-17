import React, { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useParams } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'

import { QUIZDATA } from '../../../data/frontend-quiz-app/data'
import Header from '../../../components/QuizApp/Header'
import { useQuizStore } from '../../../stores/QuizAppStore'

const QUIZZES: Array<(typeof QUIZDATA)[number]['title']> = ['HTML', 'CSS', 'JavaScript', 'Accessibility']

const BG_COLORS = {
  HTML: '#FFF1E9',
  CSS: '#E0FDEF',
  JavaScript: '#EBF0FF',
  Accessibility: '#F6E7FF'
}

const QuizQuestions: React.FC = () => {
  const { type } = useParams<{ type: (typeof QUIZDATA)[number]['title'] }>()
  const {
    setTotalNumberOfQuestions,
    totalNumberOfQuestions,
    currentQuestionIndex,
    currentQuestionAnswer,
    isCurrentQuestionAnswerSubmitted,
    isCurrentQuestionAnswerSubmittedCorrect,
    isCurrentQuestionAnswered,
    setCurrentQuestionAnswer,
    setQuestionAnswerCorrectStatus,
    setQuestionAnsweredStatus,
    setQuestionSubmittedStatus,
    updateScore,
    updateFinishedStatus,
    finished,
    goToNextQuestion,
    score,
    resetQuiz
  } = useQuizStore((s) => {
    // console.log(s)
    return s
  })
  const [results, setResults] = useState(false)
  const [error, setError] = useState(false)

  const selectedQuiz = type ? QUIZDATA.find((quiz) => quiz.title === type) : undefined

  const handleQuestionSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isCurrentQuestionAnswerSubmitted) {
      if (finished) return setResults(true)
      goToNextQuestion()
    } else if (isCurrentQuestionAnswered) {
      setQuestionSubmittedStatus(true)

      const isAnsCorrect = currentQuestionAnswer === selectedQuiz?.questions[currentQuestionIndex].answer
      setQuestionAnswerCorrectStatus(isAnsCorrect)

      updateScore(score + (isAnsCorrect ? 1 : 0))
      updateFinishedStatus(currentQuestionIndex + 1 === totalNumberOfQuestions)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    resetQuiz()
  }, [resetQuiz])

  useEffect(() => {
    if (selectedQuiz) {
      setTotalNumberOfQuestions(selectedQuiz.questions.length)
    }
  }, [selectedQuiz, setTotalNumberOfQuestions])

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(false), 2500)
    }
  }, [error])

  return (
    <main className="min-h-screen max-w-screen w-full bg-[#f4f6faed] dark:bg-[#313E51] p-6 bg-[url('/frontend-quiz-app/pattern-background-mobile-light.svg')] dark:bg-[url('/frontend-quiz-app/pattern-background-mobile-dark.svg')] sm:bg-[url('/frontend-quiz-app/pattern-background-tablet-light.svg')] sm:dark:bg-[url('/frontend-quiz-app/pattern-background-tablet-dark.svg')] lg:bg-[url('/frontend-quiz-app/pattern-background-desktop-light.svg')] lg:dark:bg-[url('/frontend-quiz-app/pattern-background-desktop-dark.svg')] lg:bg-cover sm:bg-top-left lg:bg-center bg-no-repeat transition-all duration-300">
      <Header quizTitle={type} />

      {results ? (
        <>
          Results score: {score}/{totalNumberOfQuestions}{' '}
        </>
      ) : selectedQuiz ? (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 max-w-7xl mx-auto py-6 lg:py-12">
          <div>
            <p className="dark:text-[#626C7F] mb-6 text-[#313e51] text-base leading-[120%] sm:text-xl transition-all duration-300 italic">
              Question {currentQuestionIndex + 1} out of {totalNumberOfQuestions}
            </p>
            <h6 className="dark:text-[#f4f6fa] text-[#313E51] text-2xl transition-all sm:text-3xl md:text-4xl font-semibold duration-300">
              {selectedQuiz.questions[currentQuestionIndex].question}
            </h6>
            <div>Progress</div>
          </div>
          <form onSubmit={handleQuestionSubmit}>
            <ul className="space-y-6 lg:pl-8 lg:pt-5">
              {selectedQuiz.questions[currentQuestionIndex].options.map((option, idx) => {
                const isThisOptionSelected = currentQuestionAnswer === option
                return (
                  <li key={idx}>
                    <input
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setCurrentQuestionAnswer(e.target.value)
                        setQuestionAnsweredStatus(true)
                      }}
                      type="radio"
                      name="option"
                      id={'option-' + idx}
                      value={option}
                      checked={currentQuestionAnswer === option}
                      hidden
                    />
                    <label
                      style={{
                        boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px'
                      }}
                      htmlFor={'option-' + idx}
                      className={`bg-[#fff] dark:bg-[#3B4D66] p-4 rounded-3xl w-full flex items-center justify-between transition-all duration-300 cursor-pointer border-3 hover:border-[#a729f5] ${
                        isCurrentQuestionAnswerSubmitted && 'cursor-not-allowed pointer-events-none'
                      } group ${
                        isThisOptionSelected
                          ? isCurrentQuestionAnswerSubmitted
                            ? isCurrentQuestionAnswerSubmittedCorrect
                              ? 'border-[#26d782]'
                              : 'border-[#EE5454]'
                            : 'border-[#a729f5]'
                          : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <span
                          className={`sm:h-12 h-9 w-9 sm:w-12 p-2 flex items-center justify-center rounded-md transition-all duration-300 md:text-2xl text-xl font-bold ${
                            isThisOptionSelected
                              ? isCurrentQuestionAnswerSubmitted
                                ? isCurrentQuestionAnswerSubmittedCorrect
                                  ? 'text-white bg-[#26d782]'
                                  : 'text-white bg-[#ee5454]'
                                : 'bg-[#a729f5] text-[#fff] group-hover:bg-[#a729f5] group-hover:text-[#fff]'
                              : 'dark:text-white text-[#626C7F] bg-[#f4f6fa] dark:bg-[#626C7F] group-hover:bg-[#F6E7FF] group-hover:text-[#a729fe]'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="dark:text-white text-[#313e51] text-base sm:text-xl md:text-2xl font-bold leading-[100%] transition-all duration-300">
                          {option}
                        </span>
                      </div>
                      <AnimatePresence mode="wait">
                        {isThisOptionSelected &&
                          isCurrentQuestionAnswerSubmitted &&
                          isCurrentQuestionAnswerSubmittedCorrect && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <img src={'/frontend-quiz-app/icon-correct.svg'} alt="correct-mark" />
                            </motion.div>
                          )}
                        {isThisOptionSelected &&
                          isCurrentQuestionAnswerSubmitted &&
                          !isCurrentQuestionAnswerSubmittedCorrect && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <img src={'/frontend-quiz-app/icon-incorrect.svg'} alt="incorrect-mark" />
                            </motion.div>
                          )}
                        {isCurrentQuestionAnswerSubmitted &&
                          !isCurrentQuestionAnswerSubmittedCorrect &&
                          option === selectedQuiz.questions[currentQuestionIndex].answer && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <img src={'/frontend-quiz-app/icon-correct.svg'} alt="correct-mark" />
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </label>
                  </li>
                )
              })}
              <li>
                <button
                  type="submit"
                  className="text-white bg-[#a729fe] border-3 border-[#a729fe] transition-all duration-300 hover:opacity-75 rounded-3xl p-6 font-bold text-xl sm:text-2xl md:text-3xl w-full hover:scale-[0.95] active:scale-100"
                >
                  {finished ? 'Show Results' : isCurrentQuestionAnswerSubmitted ? 'Next Question' : 'Submit Answer'}
                </button>
              </li>
              <AnimatePresence mode="wait">
                {error && (
                  <motion.li
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex items-center justify-center gap-4"
                  >
                    <span>
                      <img src={'/frontend-quiz-app/icon-error.svg'} alt="error" />
                    </span>
                    <span className="text-[#EE5454] font-semibold text-xl">
                      Please select an option before submitting!
                    </span>
                  </motion.li>
                )}
              </AnimatePresence>
            </ul>
          </form>
        </section>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-7xl mx-auto py-6 lg:py-12">
          <div>
            <h6 className="dark:text-[#f4f6fa] text-[#313E51] text-4xl xs:text-5xl leading-[110%] sm:text-7xl transition-all break-words duration-300">
              Invalid Quiz
              <br />
              <span className="font-bold">{type}</span> doesn't exist.
            </h6>

            <p className="dark:text-[#f4f6fa] mt-12 text-[#313E51] text-xl leading-[120%] sm:text-2xl transition-all duration-300 italic">
              Please select one of the available quizzes
            </p>
          </div>
          <ul className="space-y-6 lg:pl-8 lg:pt-5">
            {QUIZZES.map((quiz) => (
              <li key={quiz}>
                <Link
                  style={{
                    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px'
                  }}
                  to={`/apps/frontend-quiz-app/${quiz}`}
                  className="bg-[#fff] dark:bg-[#3B4D66] p-4 rounded-3xl w-full flex items-center gap-5 transition-all duration-300"
                >
                  <span
                    style={{ backgroundColor: BG_COLORS[quiz] }}
                    className="sm:h-12 h-9 w-9 sm:w-12 p-2 flex items-center justify-center rounded-md transition-all duration-300"
                  >
                    <img
                      src={'/frontend-quiz-app/icon-' + (quiz === 'JavaScript' ? 'js' : quiz).toLowerCase() + '.svg'}
                      alt={quiz + ' logo'}
                      className="w-10"
                    />
                  </span>
                  <span className="dark:text-white text-[#313e51] text-xl sm:text-2xl font-bold leading-[100%] transition-all duration-300">
                    {quiz}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
export default QuizQuestions
