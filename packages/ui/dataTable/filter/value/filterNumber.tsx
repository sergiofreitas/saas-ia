import * as Yup from 'yup'
import { Button, useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { FormDialog } from '@saas-ui/react'
import { yupForm } from '@saas-ui/forms/yup'
import { FilterValueProps } from './types'

type FilterContentProps = FilterValueProps & {
  disclosure: UseDisclosureReturn
}

const FilterContent: React.FC<FilterContentProps> = ({ filter, onChange, disclosure }) => {
  const schema = Yup.object().shape({
    content: Yup.number().required('Valor é um campo obrigatório').label('Valor').meta({ type: 'number' }),
  })

  return (
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
  )
}

const FilterMenu: React.FC<FilterValueProps> = ({ filter, onChange }) => {
  const disclosure = useDisclosure()

  return (
    <>
      <Button variant="ghost" rounded={0} onClick={() => disclosure.onOpen()}>
        {filter.value}
      </Button>
      <FilterContent filter={filter} onChange={onChange} disclosure={disclosure} />
    </>
  )
}

export const FilterNumber = {
  Menu: FilterMenu,
  Content: FilterContent,
}
