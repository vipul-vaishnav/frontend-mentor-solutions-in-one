import React, { useEffect, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { JOBS } from '../../data/job-listing-app/data'

const JobListingApp: React.FC = () => {
  const { theme, toggle } = useTheme()
  const [isDeskTop, setIsDeskTop] = useState(true)
  const [selectedTags, setSelectedTags] = useState<Array<string>>(['React'])

  const addTag = (tag: string) => setSelectedTags((prev) => [...prev, tag])
  const removeTag = (tag: string) => setSelectedTags((prev) => prev.filter((x) => x !== tag))
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) removeTag(tag)
    else addTag(tag)
  }

  const jobHasThatTag = (job: (typeof JOBS)[number], tags: string[]) => {
    if (selectedTags.length === 0) return true

    return (
      tags.includes(job.role) ||
      tags.includes(job.level) ||
      job.languages.some((lan) => tags.includes(lan)) ||
      job.tools.some((tool) => tags.includes(tool))
    )
  }

  useEffect(() => {
    const handleResize = () => setIsDeskTop(window.innerWidth > 848)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <main className="max-w-screen w-full min-h-screen h-full">
      <header className="flex items-center justify-between bg-[#effafa] dark:bg-[#5ba4a4] px-6 py-4 border-b dark:border-b-[#effafa] border-transparent">
        <h1 className="font-bold text-lg uppercase tracking-wider dark:text-[#effafa] text-[#5ba4a4]">Jobs</h1>
        <button
          className="dark:text-[#5ba4a4] transition-all duration-200
           text-[#effafa] bg-[#5ba4a4] dark:bg-white p-2 rounded-full"
          onClick={toggle}
        >
          {theme !== 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </header>
      <div className="bg-[#5ba4a4] relative h-40">
        {selectedTags.length > 0 && (
          <div
            style={{
              boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
            }}
            className="max-w-5xl absolute h-auto top-full -translate-y-1/2 w-full bg-white rounded-md p-4 dark:bg-[#afd0d0] left-1/2 -translate-x-1/2 flex items-center gap-6"
          >
            <ul className="flex gap-4 flex-wrap flex-1">
              {selectedTags.map((tag, idx) => (
                <li key={idx} role="button" className="flex items-stretch">
                  <span className="px-2 py-1 rounded-l-sm bg-[#eef6f6] text-[#5ba4a4] font-medium text-sm transition-all duration-200 dark:bg-[#5ba4a4] dark:text-[#eef6f6]">
                    {tag}
                  </span>
                  <button
                    onClick={() => handleTagClick(tag)}
                    className="bg-[#2c3a3a] cursor-pointer p-1 px-2 rounded-r-sm"
                  >
                    <img src={'/job-listing-app/images/icon-remove.svg'} alt="remove" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedTags([])}
              className="text-[#5ba4a4] text-sm pb-1 border-b border-[#5ba4a4] font-bold"
            >
              Clear All
            </button>
          </div>
        )}
        <img
          src={
            isDeskTop ? '/job-listing-app/images/bg-header-desktop.svg' : '/job-listing-app/images/bg-header-mobile.svg'
          }
          alt="hero"
          className="w-full h-full"
        />
      </div>
      <section className="p-6 py-20 lg:py-14 transition-all duration-200 bg-[#effafa] dark:bg-[#2c3a3a]">
        <div className={`max-w-5xl mx-auto ${!isDeskTop ? 'space-y-12' : 'space-y-6'}`}>
          {JOBS.filter((job) => jobHasThatTag(job, selectedTags)).map((job) => {
            const tags: string[] = []

            tags.push(job.role)
            tags.push(job.level)
            job.languages.forEach((lan) => tags.push(lan))
            job.tools.forEach((tool) => tags.push(tool))

            return !isDeskTop ? (
              <div
                key={job.id}
                style={{
                  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
                }}
                className="bg-[#fff] dark:bg-[#afd0d0] border-l-6 border-l-transparent hover:border-l-[#5ba4a4] transition-all duration-200 rounded-md p-4 pt-10 relative max-w-md mx-auto"
              >
                <div className="absolute w-16 -top-8">
                  <img src={'/job-listing-app' + job.logo.slice(1)} alt={job.company + ' logo'} />
                </div>
                <div className="border-b border-[#2c3a3a] pb-6">
                  <div className="flex items-center gap-4">
                    <p className="font-semibold transition-all duration-200 text-[#5ba4a4] dark:text-[#2c3a3a]">
                      {job.company}
                    </p>
                    <div className="space-x-1">
                      {job.new && (
                        <span className="text-sm px-2 font-medium bg-[#5ba4a4] py-1 rounded-full text-[#eef6f6]">
                          New
                        </span>
                      )}{' '}
                      {job.featured && (
                        <span className="bg-[#2c3a3a] py-1 px-2 rounded-full text-[#eef6f6] text-sm font-medium">
                          Featured!
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="my-3 font-semibold text-black">{job.position}</p>
                  <ul className="flex items-center gap-4 text-sm font-medium">
                    <li className="text-[#7b8e8e] dark:text-[#606b6b]">{job.postedAt}</li>
                    <li className="w-1 h-1 rounded-full bg-[#7b8e8e]"></li>
                    <li className="text-[#7b8e8e] dark:text-[#606b6b]">{job.contract}</li>
                    <li className="w-1 h-1 rounded-full bg-[#7b8e8e]"></li>
                    <li className="text-[#7b8e8e] dark:text-[#606b6b]">{job.location}</li>
                  </ul>
                </div>
                <ul className="pt-6 flex gap-4 flex-wrap">
                  {tags.map((tag, idx) => (
                    <li
                      onClick={() => handleTagClick(tag)}
                      key={idx}
                      role="button"
                      className="px-2 py-1 rounded-sm cursor-pointer bg-[#eef6f6] text-[#5ba4a4] font-medium text-sm transition-all duration-200 dark:bg-[#5ba4a4] dark:text-[#eef6f6]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div
                key={job.id}
                style={{
                  boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
                }}
                className="bg-[#fff] dark:bg-[#afd0d0] border-l-6 border-l-transparent hover:border-l-[#5ba4a4] transition-all duration-200 rounded-md p-6 flex items-center justify-between"
              >
                <div className="flex gap-6 items-center">
                  <div>
                    <img src={'/job-listing-app' + job.logo.slice(1)} alt={job.company + ' logo'} />
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold transition-all duration-200 text-[#5ba4a4] dark:text-[#2c3a3a]">
                        {job.company}
                      </p>
                      <div className="space-x-1">
                        {job.new && (
                          <span className="text-sm px-2 font-medium bg-[#5ba4a4] py-1 rounded-full text-[#eef6f6]">
                            New
                          </span>
                        )}{' '}
                        {job.featured && (
                          <span className="bg-[#2c3a3a] py-1 px-2 rounded-full text-[#eef6f6] text-sm font-medium">
                            Featured!
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="my-3 font-semibold text-black">{job.position}</p>
                    <ul className="flex items-center gap-4 text-sm font-medium">
                      <li className="text-[#7b8e8e] dark:text-[#606b6b]">{job.postedAt}</li>
                      <li className="w-1 h-1 rounded-full bg-[#7b8e8e]"></li>
                      <li className="text-[#7b8e8e] dark:text-[#606b6b]">{job.contract}</li>
                      <li className="w-1 h-1 rounded-full bg-[#7b8e8e]"></li>
                      <li className="text-[#7b8e8e] dark:text-[#606b6b]">{job.location}</li>
                    </ul>
                  </div>
                </div>
                <ul className="flex gap-4">
                  {tags.map((tag, idx) => (
                    <li
                      onClick={() => handleTagClick(tag)}
                      key={idx}
                      role="button"
                      className="px-2 py-1 rounded-sm cursor-pointer bg-[#eef6f6] text-[#5ba4a4] font-medium text-sm transition-all duration-200 dark:bg-[#5ba4a4] dark:text-[#eef6f6]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
export default JobListingApp
