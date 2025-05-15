import React from 'react'
import { Link, useLocation } from 'react-router'

import type { QUIZDATA } from '../../../data/frontend-quiz-app/data'

const QUIZZES: Array<(typeof QUIZDATA)[number]['title']> = ['Accessibility', 'CSS', 'HTML', 'JavaScript']

const QuizHome: React.FC = () => {
  const { pathname } = useLocation()
  return (
    <div>
      Have a good coding (quiz home)
      <ul>
        {QUIZZES.map((quiz) => (
          <li key={quiz}>
            <Link to={pathname + quiz}>{quiz}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default QuizHome
