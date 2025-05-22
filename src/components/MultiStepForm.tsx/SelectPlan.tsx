import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import GenericSwitch from '../shared/GenericSwitch'

import { useMultiStepFormStore } from '../../stores/MultiStepFormStore'
import { PlanSchema, type PlanType } from '../../lib/MultiStepForm.schema'

export const PLANS = [
  {
    id: 'arcadeXQakh7',
    name: 'Arcade',
    price: {
      monthly: 9,
      yearly: 90
    }
  },
  {
    id: 'advancedhxzdy3',
    name: 'Advanced',
    price: {
      monthly: 12,
      yearly: 120
    }
  },
  {
    id: 'prowDXoNs',
    name: 'Pro',
    price: {
      monthly: 15,
      yearly: 150
    }
  }
] as const

const FREE_MONTHS = 2

const SelectPlan: React.FC = () => {
  const {
    billingCycle,
    toggleBillingCycle,
    setPlan,
    plan: selectedPlan,
    setCurrentStepSubmitFn,
    goToNextStep,
    setLastCompletedStep
  } = useMultiStepFormStore((s) => s)

  const isBillingCycleMonthly = billingCycle === 'monthly'

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<PlanType>({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      planId: selectedPlan ? selectedPlan : undefined
    }
  })

  const watchPlanId = watch('planId')

  const onSubmit = (data: PlanType) => {
    const id = data.planId
    const plan = PLANS.find((plan) => plan.id === id)

    if (plan) {
      setPlan(plan.id)
      goToNextStep()
      setLastCompletedStep()
    } else {
      setError('planId', {
        message: 'Please select a plan'
      })
    }
  }

  useEffect(() => {
    setCurrentStepSubmitFn(handleSubmit(onSubmit))
    return () => setCurrentStepSubmitFn(null)
  }, [])

  return (
    <section>
      <form className="space-y-3">
        {PLANS.map((plan) => (
          <label
            htmlFor={plan.id}
            key={plan.id}
            className={`flex border p-2.5 py-3 rounded-lg gap-4 cursor-pointer items-start transition-all duration-200 ${
              watchPlanId === plan.id ? 'bg-[#f0f5ff] border-[#473dff]' : 'border-[#d6d9e6] hover:border-[#473dff]'
            }`}
          >
            <div>
              <img src={`/multi-step-form/icon-${plan.id.slice(0, -6)}.svg`} alt={plan.name + ' logo'} />
            </div>
            <div>
              <h6 className="font-bold text-[#02295a]">{plan.name}</h6>
              <p className="text-sm text-[#9699ab] font-medium">
                ${plan.price[billingCycle]}/{isBillingCycleMonthly ? 'mo' : 'yr'}
              </p>
              <AnimatePresence mode="sync">
                {!isBillingCycleMonthly && (
                  <motion.div
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                  >
                    <p className="text-xs mt-1 text-[#02295a]">{FREE_MONTHS} months free</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <input type="radio" id={plan.id} value={plan.id} {...register('planId')} className="sr-only" />
          </label>
        ))}
        {errors.planId && <p className="text-[#ed3548] mt-2 text-xs font-medium">{errors.planId.message}</p>}
      </form>
      <div className="bg-[#f0f5ff] p-3 py-4 rounded-lg flex items-center justify-center mt-4">
        <GenericSwitch
          value={!isBillingCycleMonthly}
          onChange={toggleBillingCycle}
          leftAdornment={
            <span
              className={`${
                isBillingCycleMonthly ? 'text-[#02295a]' : 'text-[#9699ab]'
              } font-medium transition-all text-sm duration-200`}
            >
              Monthly
            </span>
          }
          rightAdornment={
            <span
              className={`${
                !isBillingCycleMonthly ? 'text-[#02295a]' : 'text-[#9699ab]'
              } font-medium transition-all text-sm duration-200`}
            >
              Yearly
            </span>
          }
          switchClasses="bg-[#02295a] border-[#02295a]"
        />
      </div>
    </section>
  )
}
export default SelectPlan
