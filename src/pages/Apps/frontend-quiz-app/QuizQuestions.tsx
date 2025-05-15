import React from 'react'
import { useNavigate, useParams } from 'react-router'
import type { QUIZDATA } from '../../../data/frontend-quiz-app/data'

const QuizQuestions: React.FC = () => {
  const { type } = useParams<{ type: (typeof QUIZDATA)[number]['title'] }>()
  const navigate = useNavigate()
  return (
    <div>
      Have a good coding (quiz type: {type ?? 'NOT SPECIFIED'})<button onClick={() => navigate(-1)}>go back</button>
    </div>
  )
}
export default QuizQuestions
