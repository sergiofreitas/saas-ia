import { Children, cloneElement, ReactElement, isValidElement, useState } from 'react'
import { MenuList, Box, MenuItemProps, MenuListProps } from '@chakra-ui/react'
import { SearchInput } from '@saas-ui/react'

type FilterableMenuListProps = MenuListProps & {
  placeholder?: string
  children: ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[]
}

const extractString = (obj: any): string => {
  if (typeof obj === 'string') return obj
  else if (isValidElement(obj)) {
    return extractString((obj as any).props.children)
  } else if (Array.isArray(obj)) {
    return obj.map((e) => extractString(e)).join(' ')
  } else if (obj) {
    return obj.toString()
  }
  return ''
}

export const FilterableMenuList: React.FC<FilterableMenuListProps> = ({ placeholder, children }) => {
  const [query, setQuery] = useState<string>('')
  const filtered = Children.map(children, (child) => {
    // if is a valid query and is a MenuItem and match with props.children string,
    // clone the element and add a display="none" attr
    if (query) {
      const re = new RegExp(query, 'i')
      if (isValidElement(child) && (child.type as any).displayName === 'MenuItem') {
        const content = extractString(child.props.children)

        if (!re.test(content)) {
          return cloneElement(child, { display: 'none' })
        }
      }
    }

    return child
  })

  return (
    <MenuList>
      <Box mb={2} mt={-2} borderBottomWidth={1}>
        <SearchInput
          placeholder={placeholder}
          border={0}
          value={query}
          onReset={() => setQuery('')}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>
      {filtered}
    </MenuList>
  )
}
