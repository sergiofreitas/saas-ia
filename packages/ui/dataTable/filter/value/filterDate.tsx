import { Button, Menu, MenuButton, Text, MenuItem, useDisclosure } from '@chakra-ui/react'
import { DatePickerModal } from '@saas-ui/date-picker'
import { parseDate, today, getLocalTimeZone } from '@internationalized/date'
import { FilterableMenuList } from '../../../filterableMenu'
import { FilterValueProps } from './types'

const FilterContent: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  const disclosure = useDisclosure()
  const dateNow = today(getLocalTimeZone())

  return (
    <>
      <FilterableMenuList placeholder="filtrar">
        <MenuItem onClick={() => onChange(dateNow.subtract({ days: 2 }).toString())}>
          <Text as="div" fontSize="sm">
            2 dias
          </Text>
        </MenuItem>
        <MenuItem onClick={() => onChange(dateNow.subtract({ days: 4 }).toString())}>
          <Text as="div" fontSize="sm">
            4 dias
          </Text>
        </MenuItem>
        <MenuItem onClick={() => onChange(dateNow.subtract({ days: 7 }).toString())}>
          <Text as="div" fontSize="sm">
            7 dias
          </Text>
        </MenuItem>
        <MenuItem onClick={() => onChange(dateNow.subtract({ days: 15 }).toString())}>
          <Text as="div" fontSize="sm">
            15 dias
          </Text>
        </MenuItem>
        <MenuItem onClick={() => onChange(dateNow.subtract({ days: 30 }).toString())}>
          <Text as="div" fontSize="sm">
            30 dias
          </Text>
        </MenuItem>
        <MenuItem onClick={() => onChange(dateNow.subtract({ days: 60 }).toString())}>
          <Text as="div" fontSize="sm">
            60 dias
          </Text>
        </MenuItem>
        <MenuItem onClick={() => disclosure.onOpen()}>
          <Text as="div" fontSize="sm">
            Outro
          </Text>
        </MenuItem>
      </FilterableMenuList>
      <DatePickerModal
        {...disclosure}
        title="Selecione uma data"
        defaultValue={filter.value ? parseDate(filter.value) : undefined}
        onSubmit={(date) => onChange(date?.toString() || '')}
      />
    </>
  )
}

const FilterMenu: React.FC<FilterValueProps> = ({ filter, onChange }) => (
  <>
    <Menu>
      <MenuButton as={Button} variant="ghost" rounded={0}>
        {filter.value}
      </MenuButton>
      <FilterContent filter={filter} onChange={onChange} />
    </Menu>
  </>
)

export const FilterDate = {
  Menu: FilterMenu,
  Content: FilterContent,
}
