import React from 'react'

type SwitchProps = {
  state: 'on' | 'off'
  toggle: () => void
}

const Switch: React.FC<SwitchProps> = ({ state, toggle }) => {
  return (
    <button
      onClick={toggle}
      className={` w-11 h-[22px] rounded-full relative transition-colors duration-200 ${
        state === 'on' ? 'bg-[#c7221a] dark:bg-[#f25c54]' : 'bg-[#c7c7c7] dark:bg-[#545969]'
      }`}
    >
      <div
        className={`
          absolute left-[3px]
          w-4 h-4 rounded-full bg-[#fbfdfe]
          transition-transform duration-200 top-1/2 -translate-y-1/2
          ${state === 'on' ? 'translate-x-[22px]' : 'translate-x-0'}
        `}
      />
    </button>
  )
}

export default Switch
