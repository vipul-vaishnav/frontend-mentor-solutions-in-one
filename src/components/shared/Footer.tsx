import React from 'react'

type FooterProps = {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="max-w-full dark:text-white text-neutral-950 w-full dark:bg-neutral-950 transition-all duration-200 bg-white">
      <p className="text-center border-t border-neutral-800 dark:border-neutral-500 py-3 max-w-full px-6">
        <a className="font-medium" href="https://github.com/vipul-vaishnav/" target="_blank">
          Vipul Vaishnav
        </a>{' '}
        | &copy; {new Date().getFullYear()}
      </p>
    </footer>
  )
}
export default Footer
