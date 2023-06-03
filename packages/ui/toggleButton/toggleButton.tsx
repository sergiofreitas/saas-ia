import { type ButtonProps, Button } from '@chakra-ui/react'
import { ToggleButtonContext } from './toggleButtonGroup'
import { useContext } from 'react'

type ToggleButtonProps = {
  value: string
  children: React.ReactNode
} & ButtonProps

export const ToggleButton: React.FC<ToggleButtonProps> = ({ value, children }) => {
  const { handleClick, isActive } = useContext(ToggleButtonContext)
  return (
    <Button isActive={isActive(value)} onClick={() => handleClick(value)}>
      {children}
    </Button>
  )
}
