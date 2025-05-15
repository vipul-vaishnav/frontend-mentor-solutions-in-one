import React from 'react'

type MainPageLayoutProps = {
  children: React.ReactNode
}

const MainPageLayout: React.FC<MainPageLayoutProps> = ({ children }) => {
  return (
    <main className="max-w-full dark:text-white text-neutral-950 w-full dark:bg-neutral-950 transition-all duration-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
    </main>
  )
}

export default MainPageLayout
