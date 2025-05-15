import React from 'react'
import MainPageLayout from '../components/shared/MainPageLayout'
import APPS from '../data/Apps'
import { Link } from 'react-router'

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  return (
    <MainPageLayout>
      <h1 className="text-4xl font-extrabold">🏠 Home</h1>
      <p className="dark:text-neutral-200 text-zinc-600 text-lg py-8">
        Welcome to my personal <strong>Frontend Mentor Challenge Hub 🧠💻</strong>, a curated collection of real-world
        UI projects built using modern web technologies 🚀. <strong>Home</strong> serves as the central dashboard 📊 to
        explore all the frontend challenges I've tackled, ranging from responsive landing pages 📱 to full-stack CRUD
        applications 🛠️🔧.
      </p>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
        {APPS.map((app, idx) => (
          <div
            style={{ boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px' }}
            key={idx}
            className="bg-neutral-50 shadow dark:bg-neutral-800 rounded-md w-full min-h-40"
          >
            <img src={app.image_url} alt={app.title} className="rounded-t-md" />
            <div className="p-6">
              <h6 className="text-2xl font-bold">{app.title}</h6>
              <p className="pt-4 pb-8">{app.description}</p>
              <Link
                to={app.url}
                className="text-white transition-all duration-200
           dark:text-neutral-800 bg-neutral-800 dark:bg-white p-2 font-medium text-lg text-center block uppercase rounded-md"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </section>
    </MainPageLayout>
  )
}
export default Home
