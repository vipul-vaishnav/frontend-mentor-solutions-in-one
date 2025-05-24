import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useMultiStepFormStore } from '../../stores/MultiStepFormStore'
import { AddOnsSchema, type AddOnsType } from '../../lib/MultiStepForm.schema'
import { ADDONS } from '../../data/multi-step-form/addons'

const PickAddOns: React.FC = () => {
  const {
    billingCycle,
    addOns: selectedAddOns,
    setAddOns,
    goToNextStep,
    setCurrentStepSubmitFn,
    setLastCompletedStep
  } = useMultiStepFormStore((s) => s)

  const { register, handleSubmit, watch } = useForm<AddOnsType>({
    resolver: zodResolver(AddOnsSchema),
    defaultValues: {
      addonIds: selectedAddOns
    }
  })

  const isBillingCycleMonthly = billingCycle === 'monthly'
  const watchedAddons = watch('addonIds')

  const onSubmit = (data: AddOnsType) => {
    const selectedAddOns = ADDONS.filter((addon) => data.addonIds?.includes(addon.id)).map((addon) => addon.id)
    setAddOns(selectedAddOns)
    goToNextStep()
    setLastCompletedStep()
  }

  useEffect(() => {
    setCurrentStepSubmitFn(handleSubmit(onSubmit))
    return () => setCurrentStepSubmitFn(null)
  }, [])

  return (
    <form className="space-y-4">
      {ADDONS.map((addon) => (
        <label
          htmlFor={addon.id}
          key={addon.id}
          className={`flex border p-3 rounded-lg gap-4 cursor-pointer items-start transition-all duration-200 ${
            watchedAddons.includes(addon.id)
              ? 'bg-[#f0f5ff] border-[#473dff]'
              : 'border-[#d6d9e6] hover:border-[#473dff]'
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div
                className={`w-5 h-5 border rounded flex items-center justify-center ${
                  watchedAddons.includes(addon.id) ? 'bg-[#473dff] border-[#473dff]' : 'border-[#d6d9e6] bg-white'
                }`}
              >
                {watchedAddons.includes(addon.id) && (
                  <img src={'/multi-step-form/icon-checkmark.svg'} alt="check-mark" />
                )}
              </div>
              <div>
                <h6 className="font-bold text-[#02295a]">{addon.name}</h6>
                <p className="text-xs mt-1 text-[#9699ab] font-medium">{addon.description}</p>
              </div>
            </div>
            <p className="text-xs mt-1 text-[#473dff] font-medium">
              ${addon.price[billingCycle]}/{isBillingCycleMonthly ? 'mo' : 'yr'}
            </p>
          </div>
          <input type="checkbox" id={addon.id} value={addon.id} {...register('addonIds')} className="sr-only" />
        </label>
      ))}
    </form>
  )
}
export default PickAddOns
