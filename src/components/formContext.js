import { createContext, useContext } from 'react'

export const FormContext = createContext({ errors: {}, isShown: () => false, touch: () => {} })

export const useFormContext = () => useContext(FormContext)

export function fieldId(path) {
  return `f-${path.replace(/[^\w-]/g, '-')}`
}
