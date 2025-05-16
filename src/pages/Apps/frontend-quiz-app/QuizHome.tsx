import React from 'react'
import { Link, useLocation } from 'react-router'

import type { QUIZDATA } from '../../../data/frontend-quiz-app/data'
import Header from '../../../components/QuizApp/Header'

const QUIZZES: Array<(typeof QUIZDATA)[number]['title']> = ['Accessibility', 'CSS', 'HTML', 'JavaScript']

const BG_COLORS = {
  HTML: '#FFF1E9',
  CSS: '#E0FDEF',
  JavaScript: '#EBF0FF',
  Accessibility: '#F6E7FF'
}

const QuizHome: React.FC = () => {
  const { pathname } = useLocation()
  return (
    <main className="min-h-screen max-w-screen w-full bg-[#f4f6faed] dark:bg-[#313E51] p-6 bg-[url('/frontend-quiz-app/pattern-background-mobile-light.svg')] dark:bg-[url('/frontend-quiz-app/pattern-background-mobile-dark.svg')] sm:bg-[url('/frontend-quiz-app/pattern-background-tablet-light.svg')] sm:dark:bg-[url('/frontend-quiz-app/pattern-background-tablet-dark.svg')] lg:bg-[url('/frontend-quiz-app/pattern-background-desktop-light.svg')] lg:dark:bg-[url('/frontend-quiz-app/pattern-background-desktop-dark.svg')] lg:bg-cover sm:bg-top-left lg:bg-center bg-no-repeat transition-all duration-300">
      <Header />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-7xl mx-auto py-6 lg:py-12">
        <div>
          <h6 className="dark:text-[#f4f6faed] text-[#313E51] text-4xl xs:text-5xl leading-[110%] sm:text-7xl transition-all duration-300">
            Welcome to the
            <br />
            <span className="font-bold">Frontend Quiz!</span>
          </h6>

          <p className="dark:text-[#f4f6faed] mt-12 text-[#313E51] text-xl leading-[120%] sm:text-2xl transition-all duration-300 italic">
            Pick a subject to get started.
          </p>
        </div>
        <ul className="space-y-6 lg:pl-8 lg:pt-8">
          {QUIZZES.map((quiz) => (
            <li key={quiz}>
              <Link
                style={{
                  boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px'
                }}
                to={pathname + '/' + quiz}
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
    </main>
  )
}
export default QuizHome
