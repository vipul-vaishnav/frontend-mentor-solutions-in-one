import { createBrowserRouter } from 'react-router'
import App from '../App'

import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'

import JobListingApp from '../pages/Apps/JobListingApp'
import BrowserExtensionManager from '../pages/Apps/BrowserExtensionManager'

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
  { path: '/apps/job-listing-app', Component: JobListingApp },
  { path: '/apps/browser-extension-manager', Component: BrowserExtensionManager }
])

export default router
