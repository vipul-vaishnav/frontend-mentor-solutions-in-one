import { z } from 'zod'

const phoneRegex = /^(?:\+[\d]{1,4}\s?\d{10}|0\d{10}|\d{10})$/

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
