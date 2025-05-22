import { z } from 'zod'

const phoneRegex = /^(?:\+[\d]{1,4}\s?\d{10}|0\d{10}|\d{10})$/

// PERSONAL INFO SCHEMA
export const PersonalInfoSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters long'
  }),
  email: z.string().email({
    message: 'Email must be a valid email address'
  }),
  phone: z
    .string()
    .refine((val) => !!val, { message: 'This field is required' })
    .refine(
      (val) => {
        const regex = /\s/g

        const normalizedVal = val.replace(regex, '')

        return phoneRegex.test(normalizedVal)
      },
      { message: 'Phone Number must be valid' }
    )
})

export type PersonalInfoType = z.infer<typeof PersonalInfoSchema>

// PLAN SCHEMA
const planIds = ['arcadeXQakh7', 'advancedhxzdy3', 'prowDXoNs'] as const

export const PlanSchema = z.object({
  planId: z.enum(planIds, { message: 'Please select a plan' })
})

export type PlanType = z.infer<typeof PlanSchema>

// ADD-ONS SCHEMA
const ADDON_IDS = ['onlineServiceXQakh7', 'largerStoragehxzdy3', 'customizableProfilewDXoNs'] as const

export const AddOnsSchema = z.object({
  addonIds: z.array(z.enum(ADDON_IDS)).min(0)
})

export type AddOnsType = z.infer<typeof AddOnsSchema>
