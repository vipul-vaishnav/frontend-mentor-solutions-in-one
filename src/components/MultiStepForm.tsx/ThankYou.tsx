import React from 'react'

const ThankYou: React.FC = () => {
  return (
    <div className="text-center py-10">
      <img src={'/multi-step-form/icon-thank-you.svg'} alt="thank you" className="block mx-auto w-18" />

      <div className="space-y-4 mt-6">
        <h1 className="text-[#02295a] font-bold text-3xl">Thank you!</h1>
        <p className="text-[#9996ab] font-medium text-base">
          Thanks for confirming your subscription!
          <br /> We hope you have fun using our platform. If you ever need support, please feel free to email us at
          support@loremgaming.com.
        </p>
      </div>
    </div>
  )
}
export default ThankYou
