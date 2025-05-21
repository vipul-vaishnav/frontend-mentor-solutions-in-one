import React from 'react'

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement> & {
    title: string
    error?: string
  },
  'className'
>

const Input: React.FC<InputProps> = (props) => {
  const { title, id, error = '', ...restProps } = props

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[#02295a] text-sm font-medium">
          {title}
        </label>
        {error && <span className="text-[#ed3548] hidden sm:block text-sm font-medium">{error}</span>}
      </div>
      <input
        id={id}
        {...restProps}
        className={`w-full mt-2 border placeholder:text-[#9699ab] p-3 rounded-md placeholder:font-medium font-medium text-[#02295a] text-base ${
          error
            ? 'border-[#ed3548] focus:outline-[#ed3548] focus:outline'
            : 'border-[#d6d9e6] focus:outline focus:outline-[#473dff]'
        }`}
      />
      {error && <p className="text-[#ed3548] mt-2 sm:hidden text-xs font-medium">{error}</p>}
    </div>
  )
}
export default Input
