import { Checkbox, forwardRef } from '@chakra-ui/react'

export const DataTableCheckbox = forwardRef((props, ref) => {
  const { checked, indeterminate, ...rest } = props

  return (
    <div>
      <Checkbox ref={ref} isChecked={checked} isIndeterminate={indeterminate} {...rest} />
    </div>
  )
})

DataTableCheckbox.displayName = 'DataTableCheckbox'
