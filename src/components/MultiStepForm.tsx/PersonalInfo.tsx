import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Input from './Input'

import { PersonalInfoSchema, type PersonalInfoType } from '../../lib/MultiStepForm.schema'
import { useMultiStepFormStore } from '../../stores/MultiStepFormStore'

const PersonalInfo: React.FC = () => {
  const { personalInfo, updatePersonalInfo, setCurrentStepSubmitFn, goToNextStep } = useMultiStepFormStore((s) => s)

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(PersonalInfoSchema),
    mode: 'onBlur',
    defaultValues: {
      email: personalInfo.email,
      name: personalInfo.name,
      phone: personalInfo.phone
    }
  })

  const onSubmit = (data: PersonalInfoType) => {
    updatePersonalInfo(data)
    goToNextStep()
  }

  useEffect(() => {
    setCurrentStepSubmitFn(handleSubmit(onSubmit))
    return () => setCurrentStepSubmitFn(null)
  }, [])

  return (
    <form>
      <div className="space-y-3">
        <Input
          id="name"
          type="text"
          title="Name"
          autoComplete="off"
          placeholder="e.g. Stephan King"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          id="email"
          type="email"
          title="Email Address"
          autoComplete="off"
          placeholder="e.g. stephanking@lorem.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          id="phone"
          type="tel"
          title="Phone Number"
          autoComplete="off"
          placeholder="e.g. +91 123 456 7890"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <button type="submit" hidden />
      </div>
    </form>
  )
}
export default PersonalInfo
