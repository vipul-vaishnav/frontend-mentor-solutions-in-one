import React from 'react'
import type { QUIZDATA } from '../../data/frontend-quiz-app/data'
import Toggle from './Toggle'

type HeaderProps = {
  quizTitle?: (typeof QUIZDATA)[number]['title']
}

const BG_COLORS = {
  HTML: '#FFF1E9',
  CSS: '#E0FDEF',
  JavaScript: '#EBF0FF',
  Accessibility: '#F6E7FF'
} as const

const Header: React.FC<HeaderProps> = (props) => {
  const { quizTitle } = props
  return (
    <header className="flex items-center max-w-6xl mx-auto justify-between py-10">
      <h1 className="flex items-center gap-3">
        {quizTitle ? (
          <React.Fragment>
            <span
              style={{ backgroundColor: BG_COLORS[quizTitle] }}
              className="sm:h-12 h-9 w-9 sm:w-12 p-2 flex items-center justify-center rounded-md"
            >
              <img
                src={
                  '/frontend-quiz-app/icon-' + (quizTitle === 'JavaScript' ? 'js' : quizTitle).toLowerCase() + '.svg'
                }
                alt={quizTitle + ' logo'}
                className="w-10"
              />
            </span>
            <span className="dark:text-white text-[#313e51] text-2xl sm:text-4xl font-bold leading-[100%] transition-all duration-300">
              {quizTitle}
            </span>
          </React.Fragment>
        ) : (
          <>&nbsp;</>
        )}
      </h1>
      <Toggle />
    </header>
  )
}
export default Header
