import { createContext, useState } from 'react'
import xor from 'lodash/xor'
import { type ButtonGroupProps, ButtonGroup } from '@chakra-ui/react'

type ToggleButtonContextProps = {
  isActive: (value: string) => boolean
  handleClick: (value: string) => void
}

type ToggleButtonGroupProps = {
  type: 'checkbox' | 'radio'
  defaultValue?: string | string[]
  onChange: (value: string | string[]) => void
  children: React.ReactNode
} & ButtonGroupProps

const getStateValue = (type: string, defaultValue?: string | string[]) => {
  if (type === 'checkbox') {
    if (!defaultValue) {
      return []
    } else {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    }
  }

  return defaultValue || null
}

export const ToggleButtonContext = createContext<ToggleButtonContextProps>({
  isActive: (value) => false,
  handleClick: (value) => {},
})

export const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
  type,
  defaultValue,
  onChange,
  children,
  ...rest
}) => {
  const [buttonValues, setButtonValues] = useState<string | string[] | null>(getStateValue(type, defaultValue))
  const contextValue = {
    isActive: (value: string) => (Array.isArray(buttonValues) ? buttonValues.includes(value) : buttonValues === value),
    handleClick: (value: string) => {
      if (type === 'checkbox') {
        setButtonValues((state) => {
          if (state === null) {
            onChange([value])
            return [value]
          }

          const response = xor(state, [value])
          onChange(response)
          return response
        })
      } else {
        setButtonValues(value)
        onChange(value)
      }
    },
  }

  return (
    <ToggleButtonContext.Provider value={contextValue}>
      <ButtonGroup {...rest}>{children}</ButtonGroup>
    </ToggleButtonContext.Provider>
  )
}
