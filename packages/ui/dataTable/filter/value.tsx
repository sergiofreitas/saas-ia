import * as Yup from 'yup'
import { Button, Menu, MenuButton, MenuList, MenuItem, useDisclosure } from '@chakra-ui/react'
import { DatePickerModal } from '@saas-ui/date-picker'
import { FormDialog } from '@saas-ui/react'
import { yupForm } from '@saas-ui/forms/yup'
import { parseDate, today, getLocalTimeZone } from '@internationalized/date'
import { ActiveFilterItem, EnumUI } from '../hooks/useFilters'
import { FilterableMenuList } from '../../filterableMenu'

type FilterValueProps = {
  isOpen?: boolean
  filter: ActiveFilterItem
  onChange: (value: string) => void
}

const FilterValueBoolean: React.FC<FilterValueProps> = ({ filter, onChange, isOpen = false }) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rounded={0}>
        {filter.value === 'true' ? 'verdadeiro' : 'falso'}
      </MenuButton>
      <FilterableMenuList placeholder="filtrar">
        <MenuItem onClick={() => onChange('true')}>verdadeiro</MenuItem>
        <MenuItem onClick={() => onChange('false')}>falso</MenuItem>
      </FilterableMenuList>
    </Menu>
  )
}

const FilterValueText: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  const disclosure = useDisclosure()

  const schema = Yup.object().shape({
    content: Yup.string().required('Conteudo é um campo obrigatório').label('Conteudo'),
  })

  return (
    <>
      <Button variant="ghost" rounded={0} onClick={() => disclosure.onOpen()}>
        {filter.value}
      </Button>

      <FormDialog
        title="Filtrar por conteudo"
        defaultValues={{ content: filter.value }}
        cancelLabel="Cancelar"
        submitLabel="Buscar"
        {...disclosure}
        {...yupForm(schema)}
        onSubmit={(data) => {
          onChange(data.content)
          disclosure.onClose()
        }}
      />
    </>
  )
}

const FilterValueNumber: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  const disclosure = useDisclosure()

  const schema = Yup.object().shape({
    content: Yup.number().required('Valor é um campo obrigatório').label('Valor').meta({ type: 'number' }),
  })

  return (
    <>
      <Button variant="ghost" rounded={0} onClick={() => disclosure.onOpen()}>
        {filter.value}
      </Button>

      <FormDialog
        title="Filtrar por valor"
        defaultValues={{ content: filter.value }}
        cancelLabel="Cancelar"
        submitLabel="Buscar"
        {...disclosure}
        {...yupForm(schema)}
        onSubmit={(data) => {
          onChange(data.content)
          disclosure.onClose()
        }}
      />
    </>
  )
}

const FilterValueDate: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  const disclosure = useDisclosure()
  const dateNow = today(getLocalTimeZone())

  return (
    <>
      <Menu>
        <MenuButton as={Button} variant="ghost" rounded={0}>
          {filter.value}
        </MenuButton>
        <FilterableMenuList placeholder="filtrar">
          <MenuItem onClick={() => onChange(dateNow.subtract({ days: 2 }).toString())}>2 dias</MenuItem>
          <MenuItem onClick={() => onChange(dateNow.subtract({ days: 4 }).toString())}>4 dias</MenuItem>
          <MenuItem onClick={() => onChange(dateNow.subtract({ days: 7 }).toString())}>7 dias</MenuItem>
          <MenuItem onClick={() => onChange(dateNow.subtract({ days: 15 }).toString())}>15 dias</MenuItem>
          <MenuItem onClick={() => onChange(dateNow.subtract({ days: 30 }).toString())}>30 dias</MenuItem>
          <MenuItem onClick={() => onChange(dateNow.subtract({ days: 60 }).toString())}>60 dias</MenuItem>
          <MenuItem onClick={() => disclosure.onOpen()}>
            <span>Icon</span> Outro
          </MenuItem>
        </FilterableMenuList>
      </Menu>

      <DatePickerModal
        {...disclosure}
        title="Selecione uma data"
        defaultValue={parseDate(filter.value)}
        onSubmit={(date) => onChange(date?.toString() || '')}
      />
    </>
  )
}

const FilterValueEnum: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rounded={0}>
        {filter.value}
      </MenuButton>
      <FilterableMenuList placeholder="filtrar">
        {(filter.ui as EnumUI).options.map((option, idx) => (
          <MenuItem key={`option-enum-${idx}`} onClick={() => onChange(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </FilterableMenuList>
    </Menu>
  )
}

export const FilterValue: React.FC<FilterValueProps> = (props) => {
  switch (props.filter.ui.type) {
    case 'boolean':
      return <FilterValueBoolean {...props} />
    case 'number':
      return <FilterValueNumber {...props} />
    case 'date':
      return <FilterValueDate {...props} />
    case 'enum':
      return <FilterValueEnum {...props} />
    case 'text':
    default:
      return <FilterValueText {...props} />
  }
}
