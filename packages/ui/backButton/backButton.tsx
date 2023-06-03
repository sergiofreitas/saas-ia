import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { IconArrowLeft } from '@tabler/icons-react'

type BackButtonProps = Omit<IconButtonProps, 'aria-label'>

export const BackButton: React.FC<BackButtonProps> = (props) => {
  return <IconButton size="xs" icon={<IconArrowLeft size={14} />} variant="ghost" {...props} aria-label="Go Back" />
}
