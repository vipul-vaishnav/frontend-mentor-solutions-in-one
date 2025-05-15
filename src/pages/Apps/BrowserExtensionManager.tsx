import React, { useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { EXTENSIONS } from '../../data/browser-extenstion-manager/data'
import Switch from '../../components/shared/Switch'

type Filter = 'all' | 'active' | 'inactive'

type Ext = {
  [K in keyof (typeof EXTENSIONS)[number]]: (typeof EXTENSIONS)[number][K]
} & { id: string }

const FILTERS: Array<{ label: string; value: Filter }> = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
]

const BrowserExtensionManager: React.FC = () => {
  const { theme, toggle } = useTheme()
  const [filter, setFilter] = useState<Filter>('all')
  const [extensions, setExtensions] = useState<Ext[]>([])

  const handleFilterClick = (newFilter: Filter) => setFilter(newFilter)
  const toggleExt = (id: string) => {
    setExtensions((prev) => prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item)))
  }
  const removeExt = (id: string) => {
    setExtensions((prev) => prev.filter((item) => item.id !== id))
  }
  const filterFunc = (ext: Ext, filter: Filter) => {
    switch (filter) {
      case 'all':
        return true
      case 'active':
        return ext.isActive
      case 'inactive':
        return !ext.isActive
      default:
        throw new Error(`Unexpected filter value: ${filter}`)
    }
  }

  useEffect(() => {
    setExtensions(EXTENSIONS.map((ext, idx) => ({ ...ext, id: Math.random().toString(36).slice(2) + idx })))
  }, [])

  return (
    <main className="min-h-screen h-full max-w-screen w-full bg-[linear-gradient(180deg,_#EBF2FC_0%,_#EEF8F9_100%)] dark:bg-[linear-gradient(180deg,_#040918_0%,_#091540_100%)] py-12 transition-all duration-200">
      <header className="px-6 w-full">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3 rounded-2xl bg-[#fbfdfe] dark:bg-[#212636]">
          <h1>
            <img
              src={
                theme === 'light'
                  ? '/browser-extension-manager/images/logo.svg'
                  : '/browser-extension-manager/images/logo-light.svg'
              }
              alt="logo"
            />
          </h1>
          <button
            className="transition-all duration-200 bg-[#ededed] dark:bg-[#2f364b] p-3 rounded-xl"
            onClick={toggle}
          >
            {theme !== 'dark' ? (
              <img src={'/browser-extension-manager/images/icon-moon.svg'} alt="moon" />
            ) : (
              <img src={'/browser-extension-manager/images/icon-sun.svg'} alt="sun" />
            )}
          </button>
        </div>
      </header>
      {/* FILTERS */}
      <section className="w-full px-6">
        <div className="flex flex-col items-center gap-4 my-12 md:flex-row md:justify-between max-w-6xl mx-auto">
          <p className="text-[#09153e] dark:text-[#fbfdfe] text-4xl font-bold">Extensions List</p>
          <ul className="flex items-center gap-3">
            {FILTERS.map(({ label, value }, idx) => {
              return (
                <li key={idx}>
                  <button
                    className={`transition-all duration-200 cursor-pointer px-4 py-1.5 rounded-3xl text-sm font-medium border ${
                      value === filter
                        ? 'border-[#c7221a] bg-[#c7221a] dark:bg-[#f25c54] dark:border-[#f25c54] hover:bg-[#de473f] text-[#fbfdfe] dark:text-[#09153e]'
                        : 'border-[#c7c7c7] text-[#09153e] dark:text-[#fbfdfe] dark:border-[#545969] bg-[#fbfdfe] dark:bg-[#212636] dark:hover:bg-[#545969] hover:bg-[#ededed]'
                    }`}
                    onClick={() => handleFilterClick(value)}
                  >
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <section className="w-full px-6">
        <div className="grid max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {extensions
            .filter((ext) => filterFunc(ext, filter))
            .map((ext) => {
              return (
                <div
                  key={ext.id}
                  className="bg-[#fbfdfe] border border-[#ededed] shadow-md rounded-2xl dark:border-[#2f364b] p-4 dark:bg-[#212636]"
                >
                  <div className="flex items-start gap-3 min-h-32">
                    <div className="w-24">
                      <img src={'/public/browser-extension-manager' + ext.logo.slice(1)} alt={ext.name} />
                    </div>
                    <div>
                      <h6 className="font-bold dark:text-[#fbfdfe] text-[#09153e]">{ext.name}</h6>
                      <p className="mt-2 dark:text-[#ededed] text-[#545969]">{ext.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => removeExt(ext.id)}
                      className="border font-medium border-[#c7c7c7] dark:shadow-md rounded-2xl dark:border-[#2f364b] bg-transparent dark:text-[#fbfdfe] hover:bg-[#c7221a] hover:border-[#c7221a] hover:text-[#fbfdfe] transition-all duration-200 text-[#09153e] px-4 py-1.5 text-sm dark:hover:bg-[#f25c54] dark:hover:text-[#09153e] dark:hover:border-[#f25c54]"
                    >
                      Remove
                    </button>
                    <Switch state={ext.isActive ? 'on' : 'off'} toggle={() => toggleExt(ext.id)} />
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </main>
  )
}
export default BrowserExtensionManager
