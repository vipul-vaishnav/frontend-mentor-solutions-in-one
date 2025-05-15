import React from 'react'
import MainPageLayout from '../components/shared/MainPageLayout'
import { Link } from 'react-router'

type NotFoundProps = {}

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <MainPageLayout>
      <h1 className="text-4xl font-extrabold">404 - Not Found 🚫</h1>
      <p className="dark:text-neutral-200 text-zinc-600 text-lg py-8">
        <strong>Oops! 😕</strong> The page you’re looking for doesn’t exist. It might have been moved, deleted, or never
        created. 🔍 Please check the URL or head back to the homepage 🏠 to explore the live challenges 🚀.
      </p>
      <div className="max-w-sm mx-auto">
        <img src={'/404-light.svg'} alt="not-found" />
      </div>
      <Link
        to="/"
        className="text-white transition-all duration-200
        dark:text-neutral-800 bg-neutral-800 dark:bg-white p-2 font-medium text-lg text-center block uppercase rounded-md max-w-80 mx-auto"
      >
        Go to HomePage
      </Link>
    </MainPageLayout>
  )
}
export default NotFound
