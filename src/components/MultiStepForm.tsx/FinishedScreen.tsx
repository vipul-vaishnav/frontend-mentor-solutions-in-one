import React, { useEffect } from 'react'

import { useMultiStepFormStore } from '../../stores/MultiStepFormStore'
import { PLANS } from './SelectPlan'
import { ADDONS } from './PickAddOns'

const FinishedScreen: React.FC = () => {
  const { setCurrentStepSubmitFn, billingCycle, plan, addOns, setLastCompletedStep, setStep } = useMultiStepFormStore(
    (s) => s
  )

  const isBillingCycleMonthly = billingCycle === 'monthly'
  const selectedAddons = ADDONS.filter((addon) => addOns.includes(addon.id))
  const selectedPlan = PLANS.find((p) => p.id === plan)

  const total =
    (selectedPlan?.price[billingCycle] ?? 0) + selectedAddons.reduce((acc, addon) => acc + addon.price[billingCycle], 0)

  const onSubmit = () => {
    console.log('Form submitted!')
    setLastCompletedStep()
  }

  useEffect(() => {
    setCurrentStepSubmitFn(onSubmit)
    return () => setCurrentStepSubmitFn(null)
  }, [])

  return (
    <div>
      <div className="bg-[#f0f5ff] p-3 py-4 rounded-lg my-4">
        <h6 className="text-[#02295a] font-bold">
          {selectedPlan?.name} ({billingCycle[0].toUpperCase() + billingCycle.slice(1)})
        </h6>
        <p className="flex items-center justify-between">
          <button
            onClick={() => setStep(2)}
            className="text-[#9699ab] transition-all duration-200 underline hover:text-[#473dff]"
          >
            Change
          </button>
          <span className="font-bold text-[#02295a]">
            ${selectedPlan?.price[billingCycle]}/{isBillingCycleMonthly ? 'mo' : 'yr'}
          </span>
        </p>
        <div className="my-3 w-full h-[1px] bg-[#d6d9e6]"></div>
        {selectedAddons.map((addon) => (
          <p key={addon.id} className="flex mt-2 items-center justify-between">
            <span className="text-[#9699ab]">{addon.name}</span>
            <span className="font-medium text-[#02295a]">
              +${addon.price[billingCycle]}/{isBillingCycleMonthly ? 'mo' : 'yr'}
            </span>
          </p>
        ))}
      </div>

      <p className="flex items-center justify-between px-3">
        <span className="text-[#9699ab]">Total (per {isBillingCycleMonthly ? 'month' : 'year'})</span>
        <span className="font-bold text-[#473dff]">
          ${total}/{isBillingCycleMonthly ? 'mo' : 'yr'}
        </span>
      </p>
    </div>
  )
}
export default FinishedScreen
