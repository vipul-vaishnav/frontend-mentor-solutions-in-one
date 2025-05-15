import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  )
}

export default App
