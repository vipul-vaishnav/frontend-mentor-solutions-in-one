import { createBrowserRouter } from 'react-router'
import App from '../App'

import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'

import JobListingApp from '../pages/Apps/JobListingApp'
import MultiStepForm from '../pages/Apps/MultiStepForm'
import ProductListWithCart from '../pages/Apps/ProductListWithCart'
import Pomodoro from '../pages/Apps/Pomodoro'
import BrowserExtensionManager from '../pages/Apps/BrowserExtensionManager'

import QuizHome from '../pages/Apps/frontend-quiz-app/QuizHome'
import QuizQuestions from '../pages/Apps/frontend-quiz-app/QuizQuestions'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      },
      { path: 'about', Component: About },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound }
    ]
  },
  {
    path: '/apps/job-listing-app',
    Component: JobListingApp
  },
  {
    path: '/apps/browser-extension-manager',
    Component: BrowserExtensionManager
  },
  {
    path: '/apps/frontend-quiz-app',
    Component: QuizHome
  },
  {
    path: '/apps/frontend-quiz-app/:type',
    Component: QuizQuestions
  },
  {
    path: '/apps/multi-step-form',
    Component: MultiStepForm
  },
  {
    path: '/apps/product-list-with-cart',
    Component: ProductListWithCart
  },
  {
    path: '/apps/pomodoro-app',
    Component: Pomodoro
  }
])

export default router
