import React from 'react'
import { useNavigate, useParams } from 'react-router'
import type { QUIZDATA } from '../../../data/frontend-quiz-app/data'
import Header from '../../../components/QuizApp/Header'

const QuizQuestions: React.FC = () => {
  const { type } = useParams<{ type: (typeof QUIZDATA)[number]['title'] }>()
  const navigate = useNavigate()
  return (
    <main className="min-h-screen max-w-screen w-full bg-[#F4F6FA] dark:bg-[#313E51] p-6">
      <Header quizTitle={type} />
      Have a good coding (quiz type: {type ?? 'NOT SPECIFIED'})<button onClick={() => navigate(-1)}>go back</button>
    </main>
  )
}
export default QuizQuestions
